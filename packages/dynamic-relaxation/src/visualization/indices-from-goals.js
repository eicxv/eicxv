import { BarGoal, HingeGoal, SoapFilmGoal } from '../core/goals';

export default function getIndices(goals) {
  const indices = [];
  for (let goal of goals) {
    if (goal instanceof BarGoal) {
      indices.push(goal.vertexIndexA, goal.vertexIndexB);
    } else if (goal instanceof HingeGoal) {
      indices.push(
        goal.vertexIndexEndA,
        goal.vertexIndexMid,
        goal.vertexIndexMid,
        goal.vertexIndexEndB
      );
    } else if (goal instanceof SoapFilmGoal) {
      indices.push(
        goal.vertexIndexA,
        goal.vertexIndexB,
        goal.vertexIndexA,
        goal.vertexIndexC,
        goal.vertexIndexB,
        goal.vertexIndexC
      );
    }
  }
  return indices;
}
