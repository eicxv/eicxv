import reactionDiffusionFrag from './shaders/shallow-water.frag';
import visualizeFrag from './shaders/visualize.frag';
import initializeFrag from './shaders/initialize.frag';
import defaultComputeVert from './shaders/default-compute.vert';
import brushFrag from './shaders/brush.frag';
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
  u_deltaTime: 0.1,
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
    this.stepsPerFrame = 1;

    this._computeVao = this._createComputeVao();
    this._heightVariable = this._createHeightVariable();
    this._programs = this._createPrograms();
    this._locations = this._createLocations();
    this.uniforms = {
      ...defaultUniforms,
      ...uniforms,
      u_heightTexture: this._heightVariable.getTexture(),
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
      a_pos: 0,
      a_texCoord: 1,
    };
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    gl.enableVertexAttribArray(attributes.a_pos);
    gl.vertexAttribPointer(attributes.a_pos, 2, gl.FLOAT, null, 16, 0);
    gl.enableVertexAttribArray(attributes.a_texCoord);
    gl.vertexAttribPointer(attributes.a_texCoord, 2, gl.FLOAT, null, 16, 8);
    gl.bindVertexArray(null);
    return vao;
  }

  _createHeightVariable() {
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
      'u_deltaTime',
      'u_resolution',
      'u_heightTexture',
      // 'u_heightTexture2',
    ]);
    locations.visualize = getLocations(gl, programs.visualize, [
      'u_resolution',
      'u_heightTexture',
    ]);
    locations.brush = getLocations(gl, programs.brush, [
      'u_brushPosition',
      'u_resolution',
    ]);
    locations.initialize = getLocations(gl, programs.initialize, [
      'u_resolution',
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
    gl.uniform1f(locations.u_deltaTime, uniforms.u_deltaTime);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, uniforms.u_heightTexture);
    gl.uniform1i(locations.u_heightTexture1, 0);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  _runVisualize() {
    const gl = this.gl;

    gl.useProgram(this._programs.visualize);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.bindVertexArray(this._computeVao);
    const locations = this._locations.visualize;
    const uniforms = this.uniforms;

    gl.uniform2f(locations.u_resolution, this.width, this.height);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, uniforms.u_heightTexture);
    gl.uniform1i(locations.u_heightTexture, 0);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  _runInitialize() {
    const gl = this.gl;

    gl.useProgram(this._programs.initialize);
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
    gl.bindVertexArray(this._computeVao);
    const locations = this._locations.initialize;
    gl.uniform2f(locations.u_resolution, this.width, this.height);

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
    gl.uniform2fv(locations.u_brushPosition, uniforms.u_brushPosition);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, uniforms.u_heightTexture);
    gl.uniform1i(locations.u_heightTexture, 0);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  brush() {
    this.uniforms.u_heightTexture = this._heightVariable.getTexture();
    this._heightVariable.advance();
    this.framebuffer = this._heightVariable.getFramebuffer();
    this._runBrush();

    this.uniforms.u_heightTexture = this._heightVariable.getTexture();
    this._runVisualize();
  }

  animate() {
    for (let _ = 0; _ < this.stepsPerFrame; _++) {
      this.uniforms.u_heightTexture = this._heightVariable.getTexture();
      this._heightVariable.advance();
      this.framebuffer = this._heightVariable.getFramebuffer();
      this._runEvolve();
    }
    this.uniforms.u_heightTexture = this._heightVariable.getTexture();
    this._runVisualize();
    this._animateId = requestAnimationFrame(this.animate);
  }

  step() {
    this.uniforms.u_heightTexture = this._heightVariable.getTexture();
    this._heightVariable.advance();
    this.framebuffer = this._heightVariable.getFramebuffer();
    this._runEvolve();
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
    this.framebuffer = this._heightVariable.getFramebuffer();
    this._runInitialize();
    this.texture = this._heightVariable.getTexture();
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
