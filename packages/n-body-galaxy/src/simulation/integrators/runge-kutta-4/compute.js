import ComputePosition from './compute-position';
import ComputeVelocity from './compute-velocity';
import ComputeCoefficients0 from './compute-coefficients0';
import ComputeCoefficients1 from './compute-coefficients1';
import ComputeCoefficients2 from './compute-coefficients2';
import { kineticEnergy, potentialEnergy } from '../../energy';
import ComputeVariable from '../../common/compute-variable';

class RungeKutta4Compute {
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
    const coefficients0Variable = new ComputeVariable(gl, width, height, [
      null,
    ]);
    const coefficients1Variable = new ComputeVariable(gl, width, height, [
      null,
    ]);
    const coefficients2Variable = new ComputeVariable(gl, width, height, [
      null,
    ]);
    this.variables = {
      position: positionVariable,
      velocity: velocityVariable,
      coefficients0: coefficients0Variable,
      coefficients1: coefficients1Variable,
      coefficients2: coefficients2Variable,
    };
    const computeArgs = [gl, width, height, dt, this.variables];
    this.coefficientsCompute0 = new ComputeCoefficients0(...computeArgs);
    this.coefficientsCompute1 = new ComputeCoefficients1(...computeArgs);
    this.coefficientsCompute2 = new ComputeCoefficients2(...computeArgs);
    this.positionCompute = new ComputePosition(...computeArgs);
    this.velocityCompute = new ComputeVelocity(...computeArgs);
  }

  step() {
    const gl = this.gl;
    gl.blendFunc(gl.ONE, gl.ZERO);
    this.coefficientsCompute0.run();
    this.coefficientsCompute1.run();
    this.coefficientsCompute2.run();
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

export default RungeKutta4Compute;
