import * as m4 from "./matrix/m4";
import * as v3 from "./matrix/v3";

//shaders
import frag from "./shaders/waves.frag";
import vert from "./shaders/waves.vert";

export default class Waves {
  constructor(canvas, params) {
    this.gl = canvas.getContext("webgl", { alpha: false });
    this.program = createProgram(this.gl, vert, frag);
    this.attributes = {};
    this.uniforms = {};
    this.WIDTH = 72;
    this.HEIGHT = 124;
    this.TRIS = this.WIDTH * this.HEIGHT;
    this.SIDE_LENGTH = 1;
    // this.ALTITUDE = (this.SIDE_LENGTH * Math.sqrt(3)) / 2;
    this.n = this.WIDTH * this.HEIGHT * 3;
    params = !params ? {} : params;
    this.lightColor = hexToRGB(params.lightColor) || [0.9, 0.9, 0.9];
    this.shadowColor = hexToRGB(params.shadowColor) || [0.2, 0.2, 0.2];
    this.lightDirection = params.lightDirection || [0, 1, 3];
    v3.normalize(this.lightDirection, this.lightDirection);
    this.gl.clearColor(...this.shadowColor, 1);

    // this.startWidth = 20;
    // this.endWidth = 50;
    // this.height = 50;
    // this.widths = generateWidths(this.startWidth, this.endWidth, this.height);
    this.initCamera();
    this.initAttributes();
    this.initLocations();
    this.render = this.render.bind(this);
    this.startRender();
  }

  setMultiplier(value) {
    this.n = Math.round(this.TRIS * value) * 3;
  }

  startRender() {
    let gl = this.gl;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.attributeBuffer);
    gl.useProgram(this.program);
    const attrs = this.attributes;
    gl.vertexAttribPointer(attrs.a_positionLoc, 2, gl.FLOAT, null, 12, 0);
    gl.vertexAttribPointer(attrs.a_indexLoc, 1, gl.FLOAT, null, 12, 8);

    const unifs = this.uniforms;
    gl.uniformMatrix4fv(
      unifs.u_viewProjectionMatrixLoc,
      false,
      this.viewProjectionMatrix
    );
    gl.uniform3fv(unifs.u_cameraPositionLoc, this.camera.position);
    // gl.uniform1f(unifs.u_timeLoc, time);
    gl.uniform3fv(unifs.u_lightDirectionLoc, this.lightDirection);
    gl.uniform3fv(unifs.u_lightColorLoc, this.lightColor);
    gl.uniform3fv(unifs.u_shadowColorLoc, this.shadowColor);
    requestAnimationFrame(this.render);
  }

  render(time) {
    let gl = this.gl;
    this.resizeCanvas();
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(this.uniforms.u_timeLoc, time);

    gl.drawArrays(gl.TRIANGLES, 0, this.n);
    requestAnimationFrame(this.render);
  }

  resizeCanvas() {
    const canvas = this.gl.canvas;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      this.gl.viewport(0, 0, width, height);
      this.updateProjectionMatrix();
      this.updateViewProjectionMatrix();
      this.gl.uniformMatrix4fv(
        this.uniforms.u_viewProjectionMatrixLoc,
        false,
        this.viewProjectionMatrix
      );
    }
  }

  initCamera() {
    this.camera = {
      position: [18, 10, -20],
      target: [18, 0, 12],
      up: [0, 1, 0],
      near: 1,
      far: 2000,
      fov: (32 * 2 * Math.PI) / 360,
    };
    this.viewMatrix = m4.identity();
    this.projectionMatrix = m4.identity();
    this.viewProjectionMatrix = m4.identity();
    this.updateViewMatrix();
    this.updateProjectionMatrix();
    this.updateViewProjectionMatrix();
  }

  initAttributes() {
    let gl = this.gl;
    let attributes = this.genAttributes();
    // shuffleAttributes(attributes);
    this.attributeBuffer = createAttributeBuffer(gl, attributes);
  }

  initLocations() {
    let gl = this.gl;
    let loc;
    // attributes
    loc = getAttribLocation(gl, this.program, "a_position");
    gl.enableVertexAttribArray(loc);
    this.attributes.a_positionLoc = loc;
    loc = getAttribLocation(gl, this.program, "a_index");
    gl.enableVertexAttribArray(loc);
    this.attributes.a_indexLoc = loc;
    // uniforms
    loc = getUniformLocation(gl, this.program, "u_viewProjectionMatrix");
    this.uniforms.u_viewProjectionMatrixLoc = loc;
    loc = getUniformLocation(gl, this.program, "u_cameraPosition");
    this.uniforms.u_cameraPositionLoc = loc;
    loc = getUniformLocation(gl, this.program, "u_time");
    this.uniforms.u_timeLoc = loc;
    loc = getUniformLocation(gl, this.program, "u_lightDirection");
    this.uniforms.u_lightDirectionLoc = loc;
    loc = getUniformLocation(gl, this.program, "u_lightColor");
    this.uniforms.u_lightColorLoc = loc;
    loc = getUniformLocation(gl, this.program, "u_shadowColor");
    this.uniforms.u_shadowColorLoc = loc;
  }

  updateViewMatrix() {
    const camera = this.camera;
    m4.lookAt(camera.position, camera.target, camera.up, this.viewMatrix);
    m4.inverse(this.viewMatrix, this.viewMatrix);
  }

  updateProjectionMatrix() {
    const canvas = this.gl.canvas;
    const camera = this.camera;
    const aspect = canvas.clientWidth / canvas.clientHeight;
    m4.perspective(
      camera.fov,
      aspect,
      camera.near,
      camera.far,
      this.projectionMatrix
    );
  }

  updateViewProjectionMatrix() {
    m4.multiply(
      this.projectionMatrix,
      this.viewMatrix,
      this.viewProjectionMatrix
    );
  }

  genAttributes() {
    const apothem = this.SIDE_LENGTH / (Math.sqrt(3) * 2);
    const dxCol = Math.cos(Math.PI / 6) * 2 * apothem;
    const dzCol = Math.sin(Math.PI / 6) * 2 * apothem;
    const dzRow = 4 * apothem;
    const attributes = new Float32Array(this.TRIS * 3 * 3);
    let rowOrigin = [0, 0];
    let position = new Array(2);
    let flippedRow = false;
    let flippedCol = false;
    let index = 0;

    function addTriangle(position, flipped) {
      const offset = flipped ? 3 : 0;
      for (let i = 0; i < 3; i++) {
        attributes[index] = position[0];
        attributes[index + 1] = position[1];
        attributes[index + 2] = i + offset;
        index += 3;
      }
    }

    for (let i = 0; i < this.HEIGHT; i++) {
      position[0] = rowOrigin[0];
      position[1] = rowOrigin[1];
      addTriangle(position, flippedCol);
      for (let j = 0; j < this.WIDTH - 1; j++) {
        position[0] += dxCol;
        position[1] += dzCol * (flippedCol ? -1 : 1);
        flippedCol = !flippedCol;
        addTriangle(position, flippedCol);
      }
      rowOrigin[1] += flippedRow ? dzRow / 2 : dzRow;
      flippedRow = !flippedRow;
      flippedCol = flippedRow;
    }
    return attributes;
  }
}

function shuffleAttributes(array) {
  let currentIndex = array.length / 9;
  let temp = new Float32Array(9);
  let randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    copySlice9(array, currentIndex * 9, temp, 0);
    copySlice9(array, randomIndex * 9, array, currentIndex * 9);
    copySlice9(temp, 0, array, randomIndex * 9);
  }
}

function copySlice9(source, sourceIndex, target, targetIndex) {
  for (let offset = 0; offset < 9; offset++) {
    target[targetIndex + offset] = source[sourceIndex + offset];
  }
}

function slowShuffle(array) {
  let arr = [];
  for (let i = 0; i < array.length; i += 3) {
    arr.push([array[i], array[i + 1], array[i + 2]]);
  }
  arr = shuffle(arr);
  return new Float32Array(arr.flat());
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function createAttributeBuffer(gl, data) {
  let buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  return buffer;
}

function createShader(gl, type, source) {
  let shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  } else {
    throw new Error(`shader creation failed: ${gl.getShaderInfoLog(shader)}`);
  }
}

function createProgram(gl, vertexShaderSource, fragmentShaderSource) {
  let program = gl.createProgram();
  let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  let fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource
  );

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  let success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    return program;
  } else {
    throw new Error(
      `program creation failed: ${gl.getProgramInfoLog(program)}`
    );
  }
}

function getAttribLocation(gl, program, name) {
  let attributeLocation = gl.getAttribLocation(program, name);
  if (attributeLocation === -1) {
    throw new Error(`Failed to find attribute: ${name}`);
  }

  return attributeLocation;
}

function getUniformLocation(gl, program, name) {
  let uniformLocation = gl.getUniformLocation(program, name);
  if (uniformLocation === -1) {
    throw new Error(`Failed to find uniform: ${name}`);
  }
  return uniformLocation;
}

function hexToRGB(hex) {
  let r = 0,
    g = 0,
    b = 0;

  if (hex.length == 4) {
    r = "0x" + hex[1] + hex[1];
    g = "0x" + hex[2] + hex[2];
    b = "0x" + hex[3] + hex[3];
  } else if (hex.length == 7) {
    r = "0x" + hex[1] + hex[2];
    g = "0x" + hex[3] + hex[4];
    b = "0x" + hex[5] + hex[6];
  }

  r = r / 255;
  g = g / 255;
  b = b / 255;

  return [r, g, b];
}

// function generateWidths(startWidth, endWidth, height) {
//   const halfAltitude = this.ALTITUDE / 2;
//   let accWidths = new Array(Math.round(height / altitude));
//   let currHeight = 0;
//   let currWidth;
//   let toOdd = () => 2 * Math.floor(n / 2) + 1;
//   let toEven = () => 2 * Math.round(n / 2);
//   let isEven = -0.5;
//   let i = 0;
//   let n = 0;
//   while (currHeight < height) {
//     currWidth = lerp(startWidth, endWidth, currHeight / height);
//     n += isEven > 0 ? toEven(currWidth) : toOdd(currWidth);
//     accWidths[i] = n;
//     isEven = isEven > 1 ? -1.5 : isEven + 1;
//     currHeight += halfAltitude;
//     i++;
//   }
//   return accWidths;
// }

// function lerp(x, y, a) {
//   return x * (1 - a) + y * a;
// }

// function addTri(index, accWidths, attributes) {
//   yIndex = accWidths.find((w) => w > index) - 1;
//   xIndex = accWidths[yIndex];
//   let isFlipped = yIndex % 2 === 1;
//   let isEven = yIndex % 4;
//   isEven = isEven === 0 || isEven === 3 ? false : true;
//   let yCoord = Math.floor(yIndex / 2) + this.ALTITUDE / 3 * isFlipped ? 2 : 1;
//   let xCoord =
// }
