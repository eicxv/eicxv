import dat from 'dat.gui';
import { Status } from '../core/solver';

export default class Gui {
  constructor(solver, updateGeometry) {
    this._gui = new dat.GUI();
    this._solver = solver;
    this._startVertices = solver.vertices.map((v) => v.slice());
    this._updateGeometry = updateGeometry;
    this.status = this._solver.status.description;

    this.solverFolder = this._gui.addFolder('Solver');
    this.solverFolder.open();
    this._addRunToggle(this.solverFolder);
    this._addResetButton(this.solverFolder);
    this._addIterationCount(this.solverFolder);
    this._addSolverStatus(this.solverFolder);
  }

  addFolder(name) {
    return this._gui.addFolder(name);
  }

  _addRunToggle(guiFolder) {
    this.run = true;
    let controller = guiFolder.add(this, 'run');
    controller.onFinishChange((value) => {
      if (value) {
        this._solver.resumeSimulation();
      } else {
        this._solver.stopSimulation();
      }
    });
  }

  _addResetButton(guiFolder) {
    guiFolder.add(this, 'reset');
  }

  _addIterationCount(guiFolder) {
    let controller = guiFolder
      .add(this._solver, 'iterationCount')
      .name('iteration');
    controller.listen();
    controller.domElement.style.pointerEvents = 'none';
  }

  _addSolverStatus(guiFolder) {
    let controller = guiFolder.add(this, 'status').name('solver status');
    controller.domElement.style.pointerEvents = 'none';
    this._solver.onStatusChange(() => {
      this.status = this._solver.status.description;
      controller.updateDisplay();
    });
  }

  reset() {
    this._solver.vertices = this._startVertices.map((v) => v.slice());
    this._solver.velocities = this._startVertices.map(() => [0, 0, 0]);
    this._solver.energy.pop();
    this._solver.energy.unshift(0);
    this._solver.iterationCount = 0;
    this._updateGeometry(this._startVertices);
    this.resume();
  }

  resume() {
    if (this.run && this._solver.status !== Status.RUNNING) {
      this._solver.resumeSimulation();
    }
  }
}
