import ComputePosition from './compute-position';
import ComputeVelocity from './compute-velocity';
import { kineticEnergy, potentialEnergy } from '../../energy';
import ComputeVariable from '../../common/compute-variable';

class ForwardEulerCompute {
  constructor(gl, width, height, dt, initialState) {
    this.gl = gl;
    const positionVariable = new ComputeVariable(gl, width, height, [
      initialState.position,
      null,
    ]);
    const velocityVariable = new ComputeVariable(gl, width, height, [
      initialState.velocity,
      null,
    ]);
    this.variables = {
      position: positionVariable,
      velocity: velocityVariable,
    };
    this.positionCompute = new ComputePosition(
      gl,
      width,
      height,
      dt,
      this.variables
    );
    this.velocityCompute = new ComputeVelocity(
      gl,
      width,
      height,
      dt,
      this.variables
    );
  }

  step() {
    const gl = this.gl;
    gl.blendFunc(gl.ONE, gl.ZERO);
    this.positionCompute.run();
    this.velocityCompute.run();
  }

  energy() {
    const positionData = this.variables.position.dumpTexture(0);
    const velocityData = this.variables.velocity.dumpTexture(0);
    const ep = potentialEnergy(positionData);
    const ek = kineticEnergy(positionData, velocityData);
    return { potential: ep, kinetic: ek, total: ep + ek };
  }
}

export default ForwardEulerCompute;
