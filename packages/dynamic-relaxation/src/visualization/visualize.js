import vertShader from './shaders/default.vert';
import fragShader from './shaders/default.frag';

import {
  createProgram,
  resizeCanvas,
} from '@eicxv/utility/src/webgl/gl-utility';
import OrbitControls from '@eicxv/utility/src/webgl/camera/orbit-controls';
import getIndices from './indices-from-goals';

export default class Visualize {
  constructor(gl, solver) {
    this.gl = gl;
    gl.clearColor(0.1, 0.1, 0.12, 1);
    this._createProgram();
    this.vaos = {};
    this.uniforms = {
      gridColor: [0.2, 0.2, 0.2],
      contentColor: [0.6, 0.2, 0.2],
    };
    this._createGridVao();
    this._createContentVao(solver.vertices.flat(), getIndices(solver.goals));
    this._createCamera();
    this._draw();
  }

  _createProgram() {
    const gl = this.gl;
    const attributes = {
      a_position: 0,
    };
    const program = createProgram(gl, vertShader, fragShader, attributes);
    const locations = {
      u_matrix: gl.getUniformLocation(program, 'u_matrix'),
      u_color: gl.getUniformLocation(program, 'u_color'),
    };
    this._program = program;
    this._locations = locations;
    this._attributes = attributes;
    gl.useProgram(program);
  }

  _createGridVao() {
    const gl = this.gl;
    const size = 2;
    const intervals = 6;

    const positions = createGridAttributes(size, intervals);
    this.gridCount = (intervals + 1) * 2 * 2;
    const attributeLocations = this._attributes;

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    // position buffer
    const positionBuffer = gl.createBuffer();
    gl.enableVertexAttribArray(attributeLocations.a_position);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    gl.vertexAttribPointer(
      attributeLocations.a_position,
      3,
      gl.FLOAT,
      false,
      0,
      0
    );
    this.vaos.grid = vao;
  }

  _createContentVao(positions, indices) {
    const gl = this.gl;
    const attributeLocations = this._attributes;

    this.contentCount = indices.length;
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    // position buffer
    const positionBuffer = gl.createBuffer();
    gl.enableVertexAttribArray(attributeLocations.a_position);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    gl.vertexAttribPointer(
      attributeLocations.a_position,
      3,
      gl.FLOAT,
      false,
      0,
      0
    );

    // index buffer
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indices),
      gl.STATIC_DRAW
    );
    this.vaos.content = vao;
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  }

  updateVertices(vertices) {
    const gl = this.gl;
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(vertices.flat()),
      gl.STATIC_DRAW
    );
    this._draw();
  }

  _draw() {
    const gl = this.gl;
    resizeCanvas(gl);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.uniformMatrix4fv(
      this._locations.u_matrix,
      false,
      this.camera.viewProjectionMatrix
    );
    gl.uniform3fv(this._locations.u_color, this.uniforms.gridColor);
    // grid
    gl.bindVertexArray(this.vaos.grid);
    gl.drawArrays(gl.LINES, 0, this.gridCount);

    // content
    gl.uniform3fv(this._locations.u_color, this.uniforms.contentColor);
    gl.bindVertexArray(this.vaos.content);
    gl.drawElements(gl.LINES, this.contentCount, gl.UNSIGNED_SHORT, 0);
  }

  _createCamera() {
    const cameraSettings = {
      position: [0, 10, 5],
      target: [0, 0, 0],
      near: 0.1,
      far: 200,
      fov: (2 * Math.PI) / 6,
      up: [0, 0, 1],
    };
    const orbitSettings = {
      orbitSpeed: Math.PI,
      dollySpeed: 0.15,
      panSpeed: 1,
    };
    this.orbitControls = new OrbitControls(
      this.gl,
      cameraSettings,
      orbitSettings
    );
    this.camera = this.orbitControls.camera;
    this.orbitControls.update();
    this.orbitControls.onChange = this._draw.bind(this);
  }
}

function createGridAttributes(size, intervals) {
  const grid = [];
  const offset = -size / 2;
  const step = size / intervals;
  for (let i = 0; i <= intervals; i++) {
    const component = offset + i * step;
    grid.push(component, -offset, 0);
    grid.push(component, offset, 0);
    grid.push(offset, component, 0);
    grid.push(-offset, component, 0);
  }
  return grid;
}
