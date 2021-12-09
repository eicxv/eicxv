import { mat4, quat, vec3 } from 'gl-matrix';
import Camera from './camera';

export default class OrbitControls {
  constructor(gl, cameraSettings, orbitSettings) {
    this.canvas = gl.canvas;
    const { position, target, near, far, fov, up } = cameraSettings;
    this.camera = new Camera(gl, position, target, near, far, fov, up);
    const { orbitSpeed, dollySpeed, panSpeed } = orbitSettings;
    this.orbitSpeed = orbitSpeed;
    this.panSpeed = panSpeed;
    this.onChange = null;
    this.dollyFraction = { in: dollySpeed, out: 1 - 1 / (1 - dollySpeed) };
    this.eye = vec3.fromValues(...position);
    this.orbitTarget = vec3.fromValues(...target);
    this.orbitRotation = quat.create();
    this.orbitMatrix = mat4.create();
    // init orbitRotation from position and target
    mat4.lookAt(
      this.orbitMatrix,
      this.eye,
      this.orbitTarget,
      this.camera.worldUp
    );
    mat4.getRotation(this.orbitRotation, this.orbitMatrix);
    this.eye = [0, 0, vec3.len(this.eye)];
    this._vec = vec3.create();

    this.canvas.addEventListener('mousemove', this.handleMove.bind(this));
    this.canvas.addEventListener('wheel', this.handleWheel.bind(this));
  }

  update() {
    mat4.fromRotationTranslation(
      this.orbitMatrix,
      this.orbitRotation,
      this.orbitTarget
    );
    mat4.translate(this.orbitMatrix, this.orbitMatrix, this.eye);
    mat4.invert(this.camera.viewMatrix, this.orbitMatrix);
    this.camera.updateViewProjectionMatrix();
    this.onChange?.();
  }

  orbit(yaw, pitch) {
    quat.rotateY(this.orbitRotation, this.orbitRotation, yaw);
    quat.rotateX(this.orbitRotation, this.orbitRotation, pitch);
    quat.normalize(this.orbitRotation, this.orbitRotation);
  }

  dolly(direction) {
    const scale =
      direction > 0 ? this.dollyFraction.in : this.dollyFraction.out;
    const toTarget = vec3.sub(this._vec, this.orbitTarget, this.eye);
    vec3.scaleAndAdd(this.eye, this.eye, toTarget, scale);
  }

  pan(dx, dy) {
    const speed = (this.panSpeed * this.eye[2]) / this.canvas.clientHeight;
    this.eye[0] += dx * speed;
    this.eye[1] += dy * speed;
  }

  handleMove(ev) {
    if (ev.buttons & 2 || (ev.buttons & 1 && ev.shiftKey)) {
      this.pan(-ev.movementX, ev.movementY);
      this.update();
    } else if (ev.buttons & 1) {
      const speed = this.orbitSpeed / this.canvas.clientHeight;
      const yaw = -ev.movementX * speed;
      const pitch = -ev.movementY * speed;
      this.orbit(yaw, pitch);
      this.update();
    }
  }

  handleWheel(ev) {
    ev.preventDefault();
    this.dolly(-Math.sign(ev.deltaY));
    this.update();
  }
}
