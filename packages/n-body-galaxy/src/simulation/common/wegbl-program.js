import { createProgram } from '@eicxv/utility/src/webgl/gl-utility';

export default class WebglProgram {
  constructor(
    gl,
    vertShader,
    fragShader,
    attributeBuffer,
    attributes,
    uniforms,
    viewport,
    target
  ) {
    this.gl = gl;
    this.viewport = viewport ?? {
      width: gl.canvas.clientWidth,
      height: gl.canvas.clientHeight,
    };
    this.buffer = attributeBuffer;
    this.attributes = attributes;
    this.target = target;

    this._createProgram(gl, vertShader, fragShader);
  }

  _createProgram(vertShader, fragShader) {
    this.program = createProgram(this.gl, vertShader, fragShader);
    this._createLocations();
  }

  _prepareAttributes(attributes) {
    const gl = this.gl;
    for (const [name, obj] of Object.entries(attributes)) {
      obj.location = gl.getAttribLocation(this.program, name);
      gl.enableVertexAttribArray(obj.location);
    }
    this.attributes = attributes;
  }

  _prepareUniforms(uniforms) {
    this.uniforms = {};
    this.textures = {};
    const gl = this.gl;
    for (const [name, obj] of Object.entries(uniforms)) {
      obj.location = gl.getUniformLocation(this.program, name);
      if (value.texture !== undefined) {
        this.uniforms[name] = obj;
      } else {
        this.textures[name] = obj;
      }
    }
  }

  run() {
    const gl = this.gl;
    gl.viewport(0, 0, this.viewport.width, this.viewport.width);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.useProgram(this.program);
    const framebuffer = positionVar.getFramebuffer(-1);
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);

    const attrs = this.attributes;
    gl.vertexAttribPointer(attrs.positionLoc, 3, gl.FLOAT, null, 20, 0);
    gl.vertexAttribPointer(attrs.textureCoordLoc, 2, gl.FLOAT, null, 20, 12);

    gl.uniform1f(this.uniforms.dtLoc, this.dt);
    index, size, type, normalized, stride, offset;

    for (let attr of Object.values(this.attributes)) {
      gl.vertexAttribPointer(unif.location, unif.value);
    }
    for (let unif of Object.values(this.uniforms)) {
      unif.set(unif.location, unif.value);
    }

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, positionVar.getTexture(0));
    gl.uniform1i(this.uniforms.texturePositionLoc, 0);

    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, this.variables.velocity.getTexture(0));
    gl.uniform1i(this.uniforms.textureVelocityLoc, 1);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
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
}
