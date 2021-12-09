import Visualize from '../../visualization/visualize';
import createSolver from './create-solver';
import createGui from './create-gui';

export default function main(canvas) {
  const gl = canvas.getContext('webgl2');
  const solver = createSolver();
  const visualize = new Visualize(gl, solver);
  solver.onVerticesChange(visualize.updateVertices.bind(visualize));
  solver.startSimulation();
  if (typeof window !== 'undefined') {
    createGui(solver, visualize.updateVertices.bind(visualize));
  }
}
