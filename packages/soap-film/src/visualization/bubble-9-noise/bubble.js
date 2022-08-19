import OrbitControls from '@eicxv/utility/src/webgl/camera/orbit-controls';
import {
  createProgramInfo,
  createTexture,
  drawBufferInfo,
  primitives,
  resizeCanvasToDisplaySize,
  setBuffersAndAttributes,
  setUniforms,
} from 'twgl.js';
import frag from './soap.frag';
import vert from './soap.vert';

const cameraSettings = {
  position: [3, 0, 0],
  target: [0, 0, 0],
  near: 0.01,
  far: 100,
  fov: (45 * 2 * Math.PI) / 360,
  up: [0, 1, 0],
};
const orbitSettings = {
  orbitSpeed: Math.PI,
  dollySpeed: 0.15,
  panSpeed: 1,
};

export default function createBubble(canvas, cubemapSources) {
  const gl = canvas.getContext('webgl', { premultipliedAlpha: true });
  const programInfo = createProgramInfo(gl, [vert, frag]);

  const bufferInfo = primitives.createSphereBufferInfo(gl, 0.5, 32, 32);
  gl.clearColor(0.15, 0.15, 0.15, 1);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.enable(gl.CULL_FACE);

  const filmWidthBounds = new Float32Array([400, 700]);
  const controls = new OrbitControls(gl, cameraSettings, orbitSettings);
  controls.update();
  const camera = controls.camera;

  const environment = createTexture(gl, {
    target: gl.TEXTURE_CUBE_MAP,
    src: cubemapSources,
    min: gl.NEAREST,
    mag: gl.NEAREST,
  });

  setBuffersAndAttributes(gl, programInfo, bufferInfo);

  function render(time) {
    let resized = resizeCanvasToDisplaySize(gl.canvas);
    if (resized) {
      camera.createProjectionMatrix();
      camera.updateViewProjectionMatrix();
    }
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const cameraPosition = [
      controls.orbitMatrix[12],
      controls.orbitMatrix[13],
      controls.orbitMatrix[14],
    ];

    const uniforms = {
      u_time: time * 0.001,
      u_viewProjectionMatrix: camera.viewProjectionMatrix,
      u_cameraPosition: cameraPosition,
      u_filmWidthBounds: filmWidthBounds,
      u_environment: environment,
    };

    gl.useProgram(programInfo.program);
    setUniforms(programInfo, uniforms);

    gl.cullFace(gl.FRONT);
    drawBufferInfo(gl, bufferInfo);

    gl.cullFace(gl.BACK);
    drawBufferInfo(gl, bufferInfo);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}
