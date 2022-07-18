function mod(a, n) {
  return ((a % n) + n) % n;
}

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

  getFramebuffer(offset = 0) {
    const index = mod(this._head - offset, this._length);
    return this._framebuffers[index];
  }

  getTexture(offset = 0) {
    const index = mod(this._head - offset, this._length);
    return this._textures[index];
  }
}

export default ComputeVariable;
