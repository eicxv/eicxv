import { mat4, vec3 } from 'gl-matrix';

export default class Camera {
  constructor(gl, position, target, near, far, fov, up) {
    this.canvas = gl.canvas;
    this.worldUp = vec3.fromValues(...up);
    this.near = near;
    this.far = far;
    this.fov = fov;
    this.viewMatrix = mat4.create();
    this.projectionMatrix = mat4.create();
    this.viewProjectionMatrix = mat4.create();

    this.createViewMatrix(position, target, this.worldUp);
    this.createProjectionMatrix();
    this.updateViewProjectionMatrix();
  }

  createProjectionMatrix() {
    let aspect = this.canvas.clientWidth / this.canvas.clientHeight;
    mat4.perspective(
      this.projectionMatrix,
      this.fov,
      aspect,
      this.near,
      this.far
    );
  }

  createViewMatrix(position, target, worldUp) {
    mat4.lookAt(this.viewMatrix, position, target, worldUp);
  }

  updateViewProjectionMatrix() {
    mat4.mul(this.viewProjectionMatrix, this.projectionMatrix, this.viewMatrix);
    return this.viewProjectionMatrix;
  }

  getForward(out) {
    out[0] = this.viewMatrix[8];
    out[1] = this.viewMatrix[9];
    out[2] = this.viewMatrix[10];
    return out;
  }
  getUp(out) {
    out[0] = this.viewMatrix[4];
    out[1] = this.viewMatrix[5];
    out[2] = this.viewMatrix[6];
    return out;
  }
  getLeft(out) {
    out[0] = this.viewMatrix[0];
    out[1] = this.viewMatrix[1];
    out[2] = this.viewMatrix[2];
    return out;
  }
}
