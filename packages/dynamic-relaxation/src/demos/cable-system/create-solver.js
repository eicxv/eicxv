import Solver from '../../core/solver';
import { AnchorGoal, ForceGoal, BarGoal } from '../../core/goals';

export default function createSolver() {
  let vertices = [];
  let goals = [];
  const size = 11;
  const height = 0.2;
  const offset = -0.5;

  function toIndex(i, j) {
    return i * size + j;
  }

  for (let y = 0; y < size; y++) {
    let row = [];
    for (let x = 0; x < size; x++) {
      row.push([x / (size - 1) + offset, y / (size - 1) + offset, 0]);
    }
    vertices.push(row);
  }

  for (let i = 1; i < size - 1; i++) {
    for (let j of [0, size - 1]) {
      let v = vertices[j][i];
      v[2] = height;
      let g = new AnchorGoal(toIndex(j, i), v, 10);
      goals.push(g);
      v = vertices[i][j];
      g = new AnchorGoal(toIndex(i, j), v, 10);
      goals.push(g);
    }
  }

  function connectVertices(i1, i2) {
    let corners = [0, size - 1, size ** 2 - size, size ** 2 - 1];
    for (let i of [i1, i2]) {
      if (corners.includes(i)) {
        return;
      }
    }
    let g = new BarGoal(i1, i2, 0, 1);
    goals.push(g);
  }

  for (let i = 0; i < vertices.length; i++) {
    for (let j = 0; j < vertices[i].length; j++) {
      if (i !== vertices.length - 1) {
        connectVertices(toIndex(i, j), toIndex(i + 1, j));
      }
      if (j !== vertices.length - 1) {
        connectVertices(toIndex(i, j), toIndex(i, j + 1));
      }
    }
  }

  let fg = new ForceGoal(50, [0, 0, -1], 0.5);
  goals.push(fg);

  vertices = vertices.flat();
  const solver = new Solver(vertices, 1e-1);
  solver.addGoals(goals);

  return solver;
}
