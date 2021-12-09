export function createAttributeBuffer(gl, data) {
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  return buffer;
}

export function getExtension(gl, extension) {
  const ext = gl.getExtension('EXT_color_buffer_float');
  if (!ext) {
    throw new Error(`Cannot enable ${extension} extension`);
  }
  return ext;
}

export function compileShader(gl, shaderSource, shaderType) {
  const shader = gl.createShader(shaderType);
  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);

  const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!compiled) {
    throw new Error(
      `Shader compilation failed: ${gl.getShaderInfoLog(shader)}`
    );
  }

  return shader;
}

export function createProgram(
  gl,
  vertShaderSource,
  fragShaderSource,
  attributes
) {
  const program = gl.createProgram();
  const vertShader = compileShader(gl, vertShaderSource, gl.VERTEX_SHADER);
  const fragShader = compileShader(gl, fragShaderSource, gl.FRAGMENT_SHADER);
  gl.attachShader(program, vertShader);
  gl.attachShader(program, fragShader);
  if (attributes) {
    for (let [attrName, location] of Object.entries(attributes)) {
      gl.bindAttribLocation(program, location, attrName);
    }
  }
  gl.linkProgram(program);

  const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!linked) {
    throw new Error(
      `Program creation failed: ${gl.getProgramInfoLog(program)}`
    );
  }
  return program;
}

export function createTexture(
  gl,
  type,
  data,
  width,
  height,
  format,
  internalFormat
) {
  let texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
  let target = gl.TEXTURE_2D;
  let level = 0;
  let border = 0;
  gl.texImage2D(
    target,
    level,
    internalFormat,
    width,
    height,
    border,
    format,
    type,
    data
  );
  gl.bindTexture(gl.TEXTURE_2D, null);

  return texture;
}

export function createFramebuffer(gl, texture) {
  let framebuffer = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
  let target = gl.FRAMEBUFFER;
  let attachment = gl.COLOR_ATTACHMENT0;
  let texTarget = gl.TEXTURE_2D;
  let level = 0;
  gl.framebufferTexture2D(target, attachment, texTarget, texture, level);
  return framebuffer;
}

export function resizeCanvas(gl, multiplier) {
  const canvas = gl.canvas;
  multiplier = multiplier || 1;
  const width = (canvas.clientWidth * multiplier) | 0;
  const height = (canvas.clientHeight * multiplier) | 0;
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    return true;
  }
  return false;
}
