import ComputePosition from './compute-position';
import ComputeVelocity from './compute-velocity';
import ComputeAcceleration from './compute-acceleration';
import { kineticEnergy, potentialEnergy } from '../../energy';
import ComputeVariable from '../../common/compute-variable';

class LeapFrogCompute {
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
    const accelerationVariable = new ComputeVariable(gl, width, height, [
      null,
      null,
    ]);
    this.variables = {
      position: positionVariable,
      velocity: velocityVariable,
      acceleration: accelerationVariable,
    };
    this.accelerationCompute = new ComputeAcceleration(
      gl,
      width,
      height,
      dt,
      this.variables
    );
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
    this.accelerationCompute.run();
  }

  step() {
    const gl = this.gl;
    gl.blendFunc(gl.ONE, gl.ZERO);
    this.positionCompute.run();
    // this.variables.position.dumpTexture(0);
    this.accelerationCompute.run();
    // this.variables.acceleration.dumpTexture(0);
    this.velocityCompute.run();
    // this.variables.velocity.dumpTexture(0);
  }

  energy() {
    const positionData = this.variables.position.dumpTexture(0);
    const velocityData = this.variables.velocity.dumpTexture(0);
    const ep = potentialEnergy(positionData);
    const ek = kineticEnergy(positionData, velocityData);
    return { potential: ep, kinetic: ek, total: ep + ek };
  }
}

export default LeapFrogCompute;
