import {
  createProgram,
  createAttributeBuffer,
} from '@eicxv/utility/src/webgl/gl-utility';
import { getColor } from './black-body-color/sample-color';

import visualizationVertexShaderSource from './shaders/visualization.vert';
import visualizationFragmentShaderSource from './shaders/visualization.frag';

export default class Visualize {
  constructor(gl, camera, textureWidth, textureHeight, positionVariable) {
    this.gl = gl;
    this.camera = camera;
    this.width = gl.canvas.clientWidth;
    this.height = gl.canvas.clientHeight;
    this.textureWidth = textureWidth;
    this.textureHeight = textureHeight;
    this.positionVariable = positionVariable;
    this.updateNearPlaneHeight();
    gl.clearColor(0.1, 0.1, 0.12, 1);
    this._createProgram();
  }

  setPostionAndVelocityProgram(positionProgram, velocityProgram) {
    this.positionProgram = positionProgram;
    this.velocityProgram = velocityProgram;
  }

  _createProgram() {
    let gl = this.gl;
    let attributeData = this.getVisualizationAttributeData();
    this.attributes = {};
    this.uniforms = {};
    this.buffer = createAttributeBuffer(gl, attributeData);
    this.program = createProgram(
      gl,
      visualizationVertexShaderSource,
      visualizationFragmentShaderSource
    );

    // attributes
    this.referenceLocation = gl.getAttribLocation(this.program, 'a_reference');
    gl.enableVertexAttribArray(this.referenceLocation);
    this.colorLocation = gl.getAttribLocation(this.program, 'a_color');
    gl.enableVertexAttribArray(this.colorLocation);
    // uniforms
    this.viewProjectionMatrixLocation = gl.getUniformLocation(
      this.program,
      'u_viewProjectionMatrix'
    );
    this.texturePositionLocation = gl.getUniformLocation(
      this.program,
      'u_texturePosition'
    );
    this.nearPlaneHeightLocation = gl.getUniformLocation(
      this.program,
      'u_nearPlaneHeight'
    );
  }

  run() {
    let gl = this.gl;
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    this.resizeCanvas();
    gl.viewport(0, 0, this.width, this.height);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.useProgram(this.program);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.vertexAttribPointer(this.referenceLocation, 2, gl.FLOAT, null, 20, 0);
    gl.vertexAttribPointer(this.colorLocation, 3, gl.FLOAT, null, 20, 8);

    gl.uniformMatrix4fv(
      this.viewProjectionMatrixLocation,
      false,
      this.camera.viewProjectionMatrix
    );
    gl.uniform1f(this.nearPlaneHeightLocation, this.nearPlaneHeight);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.positionVariable.getTexture(0));
    gl.uniform1i(this.texturePositionLocation, 0);

    gl.drawArrays(gl.POINTS, 0, this.textureWidth * this.textureHeight);
  }

  resizeCanvas() {
    let canvas = this.gl.canvas;
    this.width = canvas.clientWidth;
    this.height = canvas.clientHeight;

    if (canvas.width != this.width || canvas.height != this.height) {
      canvas.width = this.width;
      canvas.height = this.height;
      this.camera.createProjectionMatrix();
      this.camera.updateViewProjectionMatrix();
    }
  }

  updateNearPlaneHeight() {
    const fov = this.camera.fov;
    const viewportHeight = this.gl.canvas.clientHeight;
    this.nearPlaneHeight =
      viewportHeight / (2 * Math.tan((0.5 * fov * Math.PI) / 180));
  }

  getVisualizationAttributeData() {
    let refs = [];
    for (let i = 0; i < this.textureWidth; i++) {
      for (let j = 0; j < this.textureHeight; j++) {
        let s = i / this.textureHeight;
        let t = j / this.textureHeight;
        refs.push(s, t, ...getColor());
      }
    }
    return new Float32Array(refs);
  }
}
