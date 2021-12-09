import Visualize from '../visualization/visualize';
import OrbitControls from '@eicxv/utility/src/webgl/camera/orbit-controls';
import Driver from './driver';
import centerOfMassFrame from './initial-conditions/zero-momentum-frame';

function main(
  canvas,
  Compute,
  createInitialConditions,
  simulationSettings,
  driverOptions
) {
  // const width = 2;
  // const height = 1;
  // const dt = 0.001;
  const { width, height, dt } = simulationSettings;
  const attributes = { premultipliedAlpha: false };
  const gl = canvas.getContext('webgl', attributes);
  gl.getExtension('OES_texture_float');
  gl.getExtension('WEBGL_color_buffer_float');
  gl.getExtension('EXT_color_buffer_float');
  gl.getExtension('EXT_float_blend');
  gl.enable(gl.BLEND);
  gl.blendEquation(gl.FUNC_ADD);

  // camera
  const cameraSettings = {
    position: [0, 0, 50],
    target: [0, 0, 0],
    near: 1,
    far: 2000,
    fov: (45 * 2 * Math.PI) / 360,
    up: [0, 1, 0],
  };
  const orbitSettings = {
    orbitSpeed: Math.PI,
    dollySpeed: 0.15,
    panSpeed: 1,
  };
  const controls = new OrbitControls(gl, cameraSettings, orbitSettings);

  // create initial texture data
  let initialState = createInitialConditions(width, height);
  initialState = centerOfMassFrame(initialState);
  const compute = new Compute(gl, width, height, dt, initialState);
  const visualize = new Visualize(
    gl,
    controls.camera,
    width,
    height,
    compute.variables.position
  );

  const driver = new Driver(compute, visualize, dt, driverOptions);

  return driver;
}

export default main;
