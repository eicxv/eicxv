import ComputePosition from './compute-position';
import ComputeVelocity from './compute-velocity';
import { kineticEnergy, potentialEnergy } from '../../energy';
import ComputeVariable from '../../common/compute-variable';
import adjustInit from './verlet-init';

class VerletCompute {
  constructor(gl, width, height, dt, initialState) {
    this.gl = gl;
    const { prev, curr } = adjustInit(initialState, dt);
    const positionData = [curr, prev, null];
    const positionVariable = new ComputeVariable(
      gl,
      width,
      height,
      positionData
    );
    const velocityVariable = new ComputeVariable(gl, width, height, [null]);
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
  }

  energy() {
    const gl = this.gl;
    gl.blendFunc(gl.ONE, gl.ZERO);
    this.velocityCompute.run();
    // dump t1 of position as this is the time step for which velocityCompute calculates velocities
    const positionData = this.variables.position.dumpTexture(1);
    const velocityData = this.variables.velocity.dumpTexture(0);
    const ep = potentialEnergy(positionData);
    const ek = kineticEnergy(positionData, velocityData);
    return { potential: ep, kinetic: ek, total: ep + ek };
  }
}

export default VerletCompute;
