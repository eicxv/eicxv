import defaultComputeShaderSource from '../../common/shaders/default-compute.vert';
import {
  createProgram,
  createAttributeBuffer,
} from '@eicxv/utility/src/webgl/gl-utility';

import coefficientsFragShaderSource from './shaders/coefficients0.frag';

export default class Compute {
  constructor(gl, textureWidth, textureHeight, dt, variables) {
    this.gl = gl;
    this.textureWidth = textureWidth;
    this.textureHeight = textureHeight;
    this.dt = dt;
    this.variables = variables;
    this._createProgram();
  }

  _createProgram() {
    const gl = this.gl;
    this.program = createProgram(
      gl,
      defaultComputeShaderSource,
      coefficientsFragShaderSource
    );
    const attributeData = this.getDefaultAttributeData();
    this.buffer = createAttributeBuffer(gl, attributeData);
    this.uniforms = {};
    this.attributes = {};

    let location;
    // attributes
    location = gl.getAttribLocation(this.program, 'a_position');
    gl.enableVertexAttribArray(location);
    this.attributes.positionLoc = location;
    location = gl.getAttribLocation(this.program, 'a_textureCoord');
    gl.enableVertexAttribArray(location);
    this.attributes.textureCoordLoc = location;
    // uniforms
    location = gl.getUniformLocation(this.program, 'u_dt');
    this.uniforms.dtLoc = location;
    location = gl.getUniformLocation(this.program, 'u_texturePosition');
    this.uniforms.texturePositionLoc = location;
    location = gl.getUniformLocation(this.program, 'u_textureVelocity');
    this.uniforms.textureVelocityLoc = location;
  }

  run() {
    const gl = this.gl;
    gl.viewport(0, 0, this.textureWidth, this.textureHeight);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.useProgram(this.program);
    const framebuffer = this.variables.coefficients0.getFramebuffer(0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);

    const attrs = this.attributes;
    gl.vertexAttribPointer(attrs.positionLoc, 3, gl.FLOAT, null, 20, 0);
    gl.vertexAttribPointer(attrs.textureCoordLoc, 2, gl.FLOAT, null, 20, 12);

    gl.uniform1f(this.uniforms.dtLoc, this.dt);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.variables.position.getTexture(0));
    gl.uniform1i(this.uniforms.texturePositionLoc, 0);

    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, this.variables.velocity.getTexture(0));
    gl.uniform1i(this.uniforms.textureVelocityLoc, 1);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  getDefaultAttributeData() {
    // square to be drawn with TRIANGLE_STRIP
    // 3 position coordinates, 2 texture coordinates
    return new Float32Array([
      -1.0, 1.0, 0.0, 0.0, 1.0,

      -1.0, -1.0, 0.0, 0.0, 0.0,

      1.0, 1.0, 0.0, 1.0, 1.0,

      1.0, -1.0, 0.0, 1.0, 0.0,
    ]);
  }
}
