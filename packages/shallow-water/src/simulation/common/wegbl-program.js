import * as utility from '../gl-utility';

export default class WebglProgram {
  constructor(
    gl,
    vertShader,
    fragShader,
    attributeData,
    attributes,
    uniforms,
    viewport,
    target = null
  ) {
    this.gl = gl;
    this.viewport = viewport ?? {
      width: gl.canvas.clientWidth,
      height: gl.canvas.clientHeight,
    };
    this.buffer = utility.createAttributeBuffer(gl, attributeData);
    this.target = target;
    this._createProgram(vertShader, fragShader);
    this._prepareAttributes(attributes);
    this._prepareUniforms(uniforms);
  }

  _createProgram(vertShader, fragShader) {
    this.program = utility.createProgram(this.gl, vertShader, fragShader);
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
    console.log(uniforms);

    const gl = this.gl;
    for (const [name, obj] of Object.entries(uniforms)) {
      obj.location = gl.getUniformLocation(this.program, name);
      if (obj.texture === undefined) {
        this.uniforms[name] = obj;
      } else {
        this.textures[name] = obj;
      }
    }
  }

  run() {
    this.setup();
    const gl = this.gl;
    gl.viewport(0, 0, this.viewport.width, this.viewport.width);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.useProgram(this.program);
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.target);

    for (let attr of Object.values(this.attributes)) {
      gl.vertexAttribPointer(
        attr.location,
        attr.size,
        attr.type,
        attr.normalized,
        attr.stride,
        attr.offset
      );
    }

    for (let unif of Object.values(this.uniforms)) {
      unif.set(unif.location, unif.value);
    }

    Object.values(this.textures).forEach((tex, i) => {
      gl.activeTexture(gl.TEXTURE0 + i);
      gl.bindTexture(gl.TEXTURE_2D, tex.texture);
      gl.uniform1i(tex.location, i);
    });

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  setup() {}

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

  static getDefaultAttributeData() {
    // square to be drawn with TRIANGLE_STRIP
    // 3 position coordinates, 2 texture coordinates
    return new Float32Array([
      -1.0, 1.0, 0.0, 0.0, 1.0,

      -1.0, -1.0, 0.0, 0.0, 0.0,

      1.0, 1.0, 0.0, 1.0, 1.0,

      1.0, -1.0, 0.0, 1.0, 0.0,
    ]);
  }

  static getDefaultAttributes(gl) {
    return {
      a_position: {
        location: null,
        size: 3,
        type: gl.FLOAT,
        normalized: null,
        stride: 20,
        offset: 0,
      },
      a_textureCoord: {
        location: null,
        size: 2,
        type: gl.FLOAT,
        normalized: null,
        stride: 20,
        offset: 12,
      },
    };
  }
}
