class ComputeVariable {
  constructor(textures, framebuffers) {
    this._length = textures.length;
    this._textures = textures;
    this._framebuffers = framebuffers;
    this._head = 0;
  }

  advance() {
    this._head = this._head + 1;
    if (this._head >= this._length) {
      this._head = 0;
    }
  }

  getFramebuffer() {
    return this._framebuffers[this._head];
  }

  getTexture() {
    return this._textures[this._head];
  }
}

export default ComputeVariable;
