import * as m4 from "./matrix/m4";

//shaders
import frag from "./shaders/waves.frag";
import vert from "./shaders/waves.vert";

export default class Waves {
  constructor(canvas) {
    this.gl = canvas.getContext("webgl");
    this.program = createProgram(this.gl, vert, frag);
    this.attributes = {};
    this.uniforms = {};
    this.WIDTH = 72;
    this.HEIGHT = 124;
    this.SIDE_LENGTH = 1;
    this.N = this.WIDTH * this.HEIGHT * 3;
    this.lightColor = [0.9, 0.9, 0.9];
    this.shadowColor = [0.2, 0.2, 0.2];
    this.gl.clearColor(...this.shadowColor, 1);
    this.initCamera();
    this.initAttributes();
    this.initLocations();
    this.render = this.render.bind(this);
    this.render(performance.now());
  }

  render(time) {
    let gl = this.gl;
    this.resizeCanvas();

    gl.bindBuffer(gl.ARRAY_BUFFER, this.attributeBuffer);
    gl.useProgram(this.program);
    gl.clear(gl.COLOR_BUFFER_BIT);

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
    gl.uniform1f(unifs.u_timeLoc, time);
    gl.uniform3fv(unifs.u_lightColorLoc, this.lightColor);
    gl.uniform3fv(unifs.u_shadowColorLoc, this.shadowColor);

    gl.drawArrays(gl.TRIANGLES, 0, this.N);
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
    }
  }

  initCamera() {
    this.camera = {
      position: [18, 10, -20],
      target: [18, 0, 12],
      up: [0, 1, 0],
      near: 1,
      far: 2000,
      fov: (45 * 2 * Math.PI) / 360,
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
    // attributes = shuffle(attributes);
    attributes = new Float32Array(attributes.flat());
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
    const attributes = [];
    let rowOrigin = [0, 0];
    let position;
    let flippedRow = false;
    let flippedCol = false;

    for (let i = 0; i < this.HEIGHT; i++) {
      position = rowOrigin.slice();
      this.addTriangle(position, flippedCol, attributes);
      for (let j = 0; j < this.WIDTH - 1; j++) {
        position[0] += dxCol;
        position[1] += dzCol * (flippedCol ? -1 : 1);
        flippedCol = !flippedCol;
        this.addTriangle(position, flippedCol, attributes);
      }
      rowOrigin[1] += flippedRow ? dzRow / 2 : dzRow;
      flippedRow = !flippedRow;
      flippedCol = flippedRow;
    }
    return attributes;
  }

  addTriangle(position, flipped, positions) {
    const offset = flipped ? 3 : 0;
    for (let i = 0; i < 3; i++) {
      positions.push([position[0], position[1], i + offset]);
    }
  }
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
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
    throw `shader creation failed: ${gl.getShaderInfoLog(shader)}`;
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
    throw `program creation failed: ${gl.getProgramInfoLog(program)}`;
  }
}

function getAttribLocation(gl, program, name) {
  let attributeLocation = gl.getAttribLocation(program, name);
  if (attributeLocation === -1) {
    throw `Failed to find attribute: ${name}`;
  }

  return attributeLocation;
}

function getUniformLocation(gl, program, name) {
  let uniformLocation = gl.getUniformLocation(program, name);
  if (uniformLocation === -1) {
    throw `Failed to find uniform: ${name}`;
  }
  return uniformLocation;
}
