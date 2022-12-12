import fetch from "./fetch.js";

const DIRECTIONS = {
  RIGHT: "R",
  UP: "U",
  DOWN: "D",
  LEFT: "L",
};

const KEY_SEPARATOR = "__";

const prepData = (data) => {
  const result = data
    .split("\n")
    .filter(Boolean)
    .map((datum) => datum.trim().split(" "));
  return result;
};

const getTailVisits = (data, ropeLength) => {
  const visited = {};
  const headIndices = [10000, 10000];
  const tailIndices = [10000, 10000];
  const ropes = new Array({length: ropeLength}).fill(0).map(i => [Array.from(headIndices), Array.from(tailIndices)]);
  data.forEach(([direction, steps], index) => {
    const toAdd =
      direction === DIRECTIONS.LEFT || direction === DIRECTIONS.UP ? -1 : 1;
    const isColumn =
      direction === DIRECTIONS.DOWN || direction === DIRECTIONS.UP;
    for (let i = 0; i < +steps; i++) {
      let [lastHeadX, lastHeadY] = headIndices;

      headIndices[isColumn ? 0 : 1] += toAdd;

      const areAdjacent = areCellsAdjacent(headIndices, tailIndices);
      if (!areAdjacent) {
        tailIndices[0] = lastHeadX;
        tailIndices[1] = lastHeadY;
      }

      const [y, x] = tailIndices;
      const key = `${y}${KEY_SEPARATOR}${x}`;
      if (!visited[key]) visited[key] = 0;
      visited[key]++;

      for (let i = 0; i < ropeLength; i++) {
        const current = ropes[i];
        const [lastX, lastY] = current;
        headIndices
      }
    }
  });
  return visited;
};

const areCellsAdjacent = (headIndices, tailIndices) => {
  const [y1, x1] = headIndices;
  const [y2, x2] = tailIndices;
  const areSame = y1 == y2 && x1 == x2;
  if (areSame) return true;

  const adjacentOnRowOrCol = Math.abs(x1 - x2) + Math.abs(y1 - y2) === 1;
  if (adjacentOnRowOrCol) return true;
  const adjacentDiagonally = Math.abs(x1 - x2) === 1 && Math.abs(y1 - y2) === 1;
  return adjacentDiagonally;
};

const partOne = async () => {
  const data = await fetch(9);
  const preppedData = prepData(data);
  const visited = getTailVisits(preppedData, 2);
  console.log(visited);
  console.log(Object.keys(visited).length);
};

const partTwo = async () => {
  const data = await fetch(9);
  const preppedData = prepData(data);
  const visited = getTailVisits(preppedData, 10);
  console.log(visited);
  console.log(Object.keys(visited).length);
};

// partOne();
partTwo();
