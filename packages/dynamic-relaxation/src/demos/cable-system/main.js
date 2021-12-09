// import Viewport from '../../../viewport/viewport';
// import createGeometry from './createGeometry';
// import createSolver from './createSolver';
// import createGui from './createGui';

// export default function main(canvas) {
//   const container = canvas;
//   const viewport = new Viewport(container);
//   const scene = viewport.getScene();
//   const solver = createSolver();
//   let vertices = solver.vertices;
//   let updateGeometry = createGeometry(scene, vertices);
//   solver.onVerticesChange(updateGeometry);
//   solver.startSimulation();

//   function update() {
//     viewport.render();
//     requestAnimationFrame(update);
//   }
//   update();
//   createGui(solver, updateGeometry);
// }

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
