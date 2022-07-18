export default class ComputeVariable {
  constructor(gl, textureWidth, textureHeight, textureDataArray) {
    this.gl = gl;
    this.textures = [];
    this.framebuffers = [];
    this.textureWidth = textureWidth;
    this.textureHeight = textureHeight;
    this.index = 0;
    this.n = textureDataArray.length;
    textureDataArray.forEach((textureData) => {
      const texture = this._createTexture(gl.FLOAT, textureData);
      this.textures.push(texture);
      const framebuffer = this._createFramebuffer(texture);
      this.framebuffers.push(framebuffer);
    });
  }

  increment() {
    this.index = (this.index - 1 + this.n) % this.n;
  }

  getFramebuffer(t) {
    const i = (this.index + t + this.n) % this.n;
    return this.framebuffers[i];
  }

  getTexture(t) {
    const i = (this.index + t + this.n) % this.n;
    return this.textures[i];
  }

  dumpTexture(t) {
    let gl = this.gl;
    let height = this.textureHeight;
    let width = this.textureWidth;
    let framebuffer = this.getFramebuffer(t);
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    let buffer = new Float32Array(4 * width * height);
    gl.readPixels(0, 0, width, height, gl.RGBA, gl.FLOAT, buffer);
    return buffer;
  }

  _createTexture(type, data) {
    let gl = this.gl;
    let texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    let target = gl.TEXTURE_2D;
    let level = 0;
    let internalFormat = gl.RGBA;
    let border = 0;
    let format = gl.RGBA;
    gl.texImage2D(
      target,
      level,
      internalFormat,
      this.textureWidth,
      this.textureHeight,
      border,
      format,
      type,
      data
    );
    gl.bindTexture(gl.TEXTURE_2D, null);

    return texture;
  }

  _createFramebuffer(texture) {
    let gl = this.gl;
    let framebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    let target = gl.FRAMEBUFFER;
    let attachment = gl.COLOR_ATTACHMENT0;
    let texTarget = gl.TEXTURE_2D;
    let level = 0;
    gl.framebufferTexture2D(target, attachment, texTarget, texture, level);
    return framebuffer;
  }
}
