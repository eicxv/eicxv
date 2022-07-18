import { vec3, mat4 } from 'gl-matrix';

//shaders
import frag from './shaders/waves.frag';
import vert from './shaders/waves.vert';

export default class Waves {
  constructor(canvas, params) {
    this.gl = canvas.getContext('webgl', { alpha: false });
    this.program = createProgram(this.gl, vert, frag);
    this.attributes = {};
    this.uniforms = {};
    this.WIDTH = 76;
    this.HEIGHT = 112;
    this.FILL_SPEED = 6000;
    this.triRemainder = 0;
    this.prevTimestamp = 0;
    this.TRIS = this.WIDTH * this.HEIGHT;
    this.SIDE_LENGTH = 1;
    this.ALTITUDE = (this.SIDE_LENGTH * Math.sqrt(3)) / 2;
    this.APOTHEM = this.SIDE_LENGTH / (Math.sqrt(3) * 2);
    this.n = this.WIDTH * this.HEIGHT * 3;
    params = !params ? {} : params;
    this.lightColor = params.lightColor || [0.9, 0.9, 0.9];
    this.shadowColor = params.shadowColor || [0.2, 0.2, 0.2];
    this.lightDirection = params.lightDirection || [0, 1, 3];
    vec3.normalize(this.lightDirection, this.lightDirection);
    this.gl.clearColor(...this.shadowColor, 1);

    this.currIndex = 0;
    this.gen = this.makeIndexGenerator(3461, 8513);

    this.initCamera();
    this.initAttributes();
    this.initLocations();
    this.render = this.render.bind(this);
    this.renderAddTriangle = this.renderAddTriangle.bind(this);
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
    gl.vertexAttribPointer(attrs.a_rotationLoc, 1, gl.FLOAT, null, 12, 8);

    const unifs = this.uniforms;
    gl.uniformMatrix4fv(
      unifs.u_viewProjectionMatrixLoc,
      false,
      this.viewProjectionMatrix
    );
    gl.uniform3fv(unifs.u_cameraPositionLoc, this.camera.position);
    gl.uniform3fv(unifs.u_lightDirectionLoc, this.lightDirection);
    gl.uniform3fv(unifs.u_lightColorLoc, this.lightColor);
    gl.uniform3fv(unifs.u_shadowColorLoc, this.shadowColor);
    this.prevTimestamp = performance.now();
    requestAnimationFrame(this.renderAddTriangle);
  }

  renderAddTriangle(time) {
    let dt = time - this.prevTimestamp;
    dt = dt < 0 ? 0 : dt;
    this.prevTimestamp = time;
    let trisToAdd = this.FILL_SPEED * (dt * 0.001) + this.triRemainder;
    this.triRemainder = trisToAdd % 1;
    trisToAdd = Math.floor(trisToAdd);

    let gl = this.gl;
    this.resizeCanvas();
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.uniform1f(this.uniforms.u_timeLoc, time);
    for (let i = 1; i <= trisToAdd; i++) {
      if (this.currIndex < this.WIDTH * this.HEIGHT) {
        let data = this.triangleAttributes(this.gen.next().value);
        gl.bufferSubData(gl.ARRAY_BUFFER, this.currIndex * 9 * 4, data);
        this.currIndex += 1;
      } else {
        break;
      }
    }
    if (this.currIndex < this.WIDTH * this.HEIGHT) {
      requestAnimationFrame(this.renderAddTriangle);
    } else {
      requestAnimationFrame(this.render);
    }
    gl.drawArrays(gl.TRIANGLES, 0, this.n);
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
    this.viewMatrix = mat4.create();
    this.projectionMatrix = mat4.create();
    this.viewProjectionMatrix = mat4.create();
    this.updateViewMatrix();
    this.updateProjectionMatrix();
    this.updateViewProjectionMatrix();
  }

  initAttributes() {
    let gl = this.gl;
    let attributeByteLength = this.WIDTH * this.HEIGHT * 9 * 4;
    this.attributeBuffer = createAttributeBufferSize(gl, attributeByteLength);
  }

  initLocations() {
    let gl = this.gl;
    let loc;
    // attributes
    loc = getAttribLocation(gl, this.program, 'a_position');
    gl.enableVertexAttribArray(loc);
    this.attributes.a_positionLoc = loc;
    loc = getAttribLocation(gl, this.program, 'a_rotation');
    gl.enableVertexAttribArray(loc);
    this.attributes.a_rotationLoc = loc;
    // uniforms
    loc = getUniformLocation(gl, this.program, 'u_viewProjectionMatrix');
    this.uniforms.u_viewProjectionMatrixLoc = loc;
    loc = getUniformLocation(gl, this.program, 'u_cameraPosition');
    this.uniforms.u_cameraPositionLoc = loc;
    loc = getUniformLocation(gl, this.program, 'u_time');
    this.uniforms.u_timeLoc = loc;
    loc = getUniformLocation(gl, this.program, 'u_lightDirection');
    this.uniforms.u_lightDirectionLoc = loc;
    loc = getUniformLocation(gl, this.program, 'u_lightColor');
    this.uniforms.u_lightColorLoc = loc;
    loc = getUniformLocation(gl, this.program, 'u_shadowColor');
    this.uniforms.u_shadowColorLoc = loc;
  }

  updateViewMatrix() {
    const camera = this.camera;
    mat4.lookAt(this.viewMatrix, camera.position, camera.target, camera.up);
  }

  updateProjectionMatrix() {
    const canvas = this.gl.canvas;
    const camera = this.camera;
    const aspect = canvas.clientWidth / canvas.clientHeight;
    mat4.perspective(
      this.projectionMatrix,
      camera.fov,
      aspect,
      camera.near,
      camera.far
    );
  }

  updateViewProjectionMatrix() {
    mat4.multiply(
      this.viewProjectionMatrix,
      this.projectionMatrix,
      this.viewMatrix
    );
  }

  *makeIndexGenerator(a, m) {
    let seed = 1;
    for (let _ = 0; _ < m - 1; _++) {
      seed = (a * seed) % m;
      yield seed;
    }
  }

  triangleAttributes(index) {
    let data = new Float32Array(9);
    let iHeight = Math.floor(index / this.WIDTH);
    let iWidth = index % this.WIDTH;
    let flipped = (iWidth % 2 === 0) !== (iHeight % 2 === 0);
    let rotation = flipped ? 3 : 0;
    let posWidth = iWidth / 2;
    let posHeight = flipped
      ? iHeight * this.ALTITUDE + this.APOTHEM
      : iHeight * this.ALTITUDE;
    let vertexIndex = 0;
    for (let i = 0; i < 3; i++) {
      data[vertexIndex] = posWidth;
      data[vertexIndex + 1] = posHeight;
      data[vertexIndex + 2] = i + rotation;
      vertexIndex += 3;
    }
    return data;
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

function createAttributeBufferSize(gl, byteLength) {
  let buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, byteLength, gl.STATIC_DRAW);
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
