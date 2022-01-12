import reactionDiffusionFrag from './shaders/reaction-diffusion.frag';
import visualizeFrag from './shaders/visualize.frag';
import initializeFrag from './shaders/initialize.frag';
import defaultComputeVert from './shaders/default-compute.vert';
import brushFrag from './shaders/brush.frag';

import { clamp } from '@eicxv/utility/src/generic';
import {
  getExtension,
  createTexture,
  createFramebuffer,
  createProgram,
} from './gl-utility';
import ComputeVariable from './compute-variable';

const attributeData = new Float32Array([
  -1.0, 1.0, 0.0, 1.0,

  -1.0, -1.0, 0.0, 0.0,

  1.0, 1.0, 1.0, 1.0,

  1.0, -1.0, 1.0, 0.0,
]);

const defaultUniforms = {
  u_feed: 0.055,
  u_kill: 0.062,
  u_deltaTime: 1,
  u_diffusion: [0.2097, 0.105],
  u_brushPosition: [0.0, 0.0],
  u_brushConcentration: [0.0, 1.0],
  u_brushRadius: 10.0,
  u_visualizeV: true,
  u_fillConcentration: [1.0, 0.0],
  u_noise: true,
};

function getLocations(gl, program, uniformNames) {
  return Object.fromEntries(
    uniformNames.map((unifName) => [
      unifName,
      gl.getUniformLocation(program, unifName),
    ])
  );
}

class Driver {
  constructor(canvas, uniforms = null) {
    const webglAttributes = { premultipliedAlpha: false };
    const gl = canvas.getContext('webgl2', webglAttributes);
    this.gl = gl;
    getExtension(gl, 'EXT_color_buffer_float');
    this.width = canvas.clientWidth;
    this.height = canvas.clientHeight;
    canvas.width = this.width;
    canvas.height = this.height;
    this.stepsPerFrame = 8;

    this._computeVao = this._createComputeVao();
    this._concentrationVariable = this._createConcentrationVariable();
    this._programs = this._createPrograms();
    this._locations = this._createLocations();
    this.uniforms = {
      ...defaultUniforms,
      ...uniforms,
      u_concentrationTexture: this._concentrationVariable.getTexture(),
    };
    gl.viewport(0, 0, this.width, this.height);

    this.animate = this.animate.bind(this);
    this._animateId = null;
    this.running = false;
  }

  _createComputeVao() {
    const gl = this.gl;
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, attributeData, gl.STATIC_DRAW);
    const attributes = {
      a_position: 0,
      a_textureCoord: 1,
    };
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    gl.enableVertexAttribArray(attributes.a_position);
    gl.vertexAttribPointer(attributes.a_position, 2, gl.FLOAT, null, 16, 0);
    gl.enableVertexAttribArray(attributes.a_textureCoord);
    gl.vertexAttribPointer(attributes.a_textureCoord, 2, gl.FLOAT, null, 16, 8);
    gl.bindVertexArray(null);
    return vao;
  }

  _getColor() {
    const feed = this.uniforms.u_feed;
    const kill = this.uniforms.u_kill;
    const feedSqrt = Math.sqrt(feed);
    let U = 1.0;
    let V = 0.0;
    if (kill < (feedSqrt - 2.0 * feed) / 2.0) {
      const A = feedSqrt / (feed + kill);
      U = (A - sqrt(A * A - 4.0)) / (2.0 * A);
      U = clamp(U);
      V = (feedSqrt * (A + sqrt(A * A - 4.0))) / 2.0;
      V = clamp(V);
    }
    return [U, V];
  }

  _createConcentrationVariable() {
    const gl = this.gl;
    const textureData = [null, null];
    let internalFormat = gl.RG32F;
    let format = gl.RG;
    const textures = textureData.map((texData) =>
      createTexture(
        gl,
        gl.FLOAT,
        texData,
        this.width,
        this.height,
        format,
        internalFormat
      )
    );

    const framebuffers = textures.map((texture) =>
      createFramebuffer(gl, texture)
    );
    const concentrationVariable = new ComputeVariable(textures, framebuffers);
    return concentrationVariable;
  }

  _createPrograms() {
    const gl = this.gl;
    const programs = {};
    const attributes = {
      a_position: 0,
      a_textureCoord: 1,
    };
    programs.evolve = createProgram(
      gl,
      defaultComputeVert,
      reactionDiffusionFrag,
      attributes
    );

    programs.visualize = createProgram(
      gl,
      defaultComputeVert,
      visualizeFrag,
      attributes
    );

    programs.initialize = createProgram(
      gl,
      defaultComputeVert,
      initializeFrag,
      attributes
    );

    programs.brush = createProgram(
      gl,
      defaultComputeVert,
      brushFrag,
      attributes
    );
    return programs;
  }

  _createLocations() {
    const gl = this.gl;
    const programs = this._programs;
    const locations = {};
    locations.evolve = getLocations(gl, programs.evolve, [
      'u_feed',
      'u_kill',
      'u_deltaTime',
      'u_diffusion',
      'u_resolution',
      'u_concentrationTexture',
    ]);
    locations.visualize = getLocations(gl, programs.visualize, [
      'u_resolution',
      'u_concentrationTexture',
      'u_visualizeV',
    ]);
    locations.brush = getLocations(gl, programs.brush, [
      'u_resolution',
      'u_brushRadius',
      'u_brushPosition',
      'u_brushConcentration',
      'u_concentrationTexture',
    ]);
    locations.initialize = getLocations(gl, programs.initialize, [
      'u_resolution',
      'u_seed',
      'u_noise',
      'u_fillConcentration',
    ]);
    return locations;
  }

  _runEvolve() {
    const gl = this.gl;

    gl.useProgram(this._programs.evolve);
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
    gl.bindVertexArray(this._computeVao);
    const locations = this._locations.evolve;
    const uniforms = this.uniforms;

    gl.uniform2f(locations.u_resolution, this.width, this.height);
    gl.uniform1f(locations.u_feed, uniforms.u_feed);
    gl.uniform1f(locations.u_kill, uniforms.u_kill);
    gl.uniform1f(locations.u_deltaTime, uniforms.u_deltaTime);
    gl.uniform2fv(locations.u_diffusion, uniforms.u_diffusion);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, uniforms.u_concentrationTexture);
    gl.uniform1i(locations.u_concentrationTexture, 0);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  _runVisualize() {
    const gl = this.gl;

    gl.useProgram(this._programs.visualize);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.bindVertexArray(this._computeVao);
    const locations = this._locations.visualize;
    const uniforms = this.uniforms;

    gl.uniform1i(locations.u_visualizeV, uniforms.u_visualizeV);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, uniforms.u_concentrationTexture);
    gl.uniform1i(locations.u_concentrationTexture, 0);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  _runInitialize() {
    const gl = this.gl;

    gl.useProgram(this._programs.initialize);
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
    gl.bindVertexArray(this._computeVao);
    const locations = this._locations.initialize;
    const uniforms = this.uniforms;

    const rand = () => (Math.random() - 0.5) * 2;
    gl.uniform2f(locations.u_resolution, this.width, this.height);
    gl.uniform1f(locations.u_seed, 1000 * rand());
    gl.uniform2f(locations.u_resolution, this.width, this.height);
    gl.uniform1i(locations.u_noise, uniforms.u_noise);
    gl.uniform2fv(locations.u_fillConcentration, uniforms.u_fillConcentration);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  _runBrush() {
    const gl = this.gl;

    gl.useProgram(this._programs.brush);
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
    gl.bindVertexArray(this._computeVao);
    const locations = this._locations.brush;
    const uniforms = this.uniforms;

    gl.uniform2f(locations.u_resolution, this.width, this.height);
    gl.uniform1f(locations.u_brushRadius, uniforms.u_brushRadius);
    gl.uniform2fv(locations.u_brushPosition, uniforms.u_brushPosition);
    gl.uniform2fv(
      locations.u_brushConcentration,
      uniforms.u_brushConcentration
    );

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, uniforms.u_concentrationTexture);
    gl.uniform1i(locations.u_concentrationTexture, 0);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  brush() {
    this.uniforms.u_concentrationTexture =
      this._concentrationVariable.getTexture();
    this._concentrationVariable.advance();
    this.framebuffer = this._concentrationVariable.getFramebuffer();
    this._runBrush();
    this.uniforms.u_concentrationTexture =
      this._concentrationVariable.getTexture();
    this._runVisualize();
  }

  animate() {
    for (let _ = 0; _ < this.stepsPerFrame; _++) {
      this.uniforms.u_concentrationTexture =
        this._concentrationVariable.getTexture();
      this._concentrationVariable.advance();
      this.framebuffer = this._concentrationVariable.getFramebuffer();
      this._runEvolve();
    }
    this.uniforms.u_concentrationTexture =
      this._concentrationVariable.getTexture();
    this._runVisualize();
    this._animateId = requestAnimationFrame(this.animate);
  }

  start() {
    if (this.running) {
      return;
    }
    this.running = true;
    this.animate();
  }

  stop() {
    if (!this.running) {
      return;
    }
    this.running = false;
    cancelAnimationFrame(this._animateId);
  }

  initialize() {
    this.framebuffer = this._concentrationVariable.getFramebuffer();
    this._runInitialize();
    this.texture = this._concentrationVariable.getTexture();
    this._runVisualize();
  }

  setUniform(uniformName, value) {
    this.uniforms[uniformName] = value;
  }

  dumpTexture(framebuffer) {
    let gl = this.gl;
    let height = this.height;
    let width = this.width;
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    let buffer = new Float32Array(4 * width * height);
    gl.readPixels(0, 0, width, height, gl.RGBA, gl.FLOAT, buffer);
    return buffer;
  }
}

export default Driver;
