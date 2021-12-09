import Publisher from '@eicxv/utility/src/publisher';

const defaultOptions = {
  energy: {
    record: false,
    recordInterval: 10,
  },
};

class Driver {
  constructor(integrator, visualizer, dt, options) {
    this.time = 0;
    this.step = 0;
    this.dt = dt;
    this.integrator = integrator;
    this.visualizer = visualizer;
    this.options = { ...defaultOptions, ...options };
    this.energy = new Publisher();
    this.integrateId = null;
    this.visualizeId = null;
    this.integrate = this.integrate.bind(this);
    this.visualize = this.visualize.bind(this);
  }

  integrate() {
    if (
      this.options.energy.record &&
      this.step % this.options.energy.recordInterval === 0
    ) {
      const e = this.integrator.energy();
      this.energy.dispatch(e);
    }
    this.time += this.dt;
    this.step += 1;
    this.integrator.step();
    this.integrateId = setTimeout(this.integrate);
  }

  visualize() {
    this.visualizer.run();
    this.visualizeId = requestAnimationFrame(this.visualize);
  }

  start() {
    this.integrate();
    this.visualize();
  }

  stopIntegration() {
    clearTimeout(this.integrateId);
  }

  stopVisualization() {
    cancelAnimationFrame(this.visualizeId);
  }

  stop() {
    this.stopIntegration();
    this.stopVisualization();
  }
}

export default Driver;
