import fetch from "./fetch.js";

const testData = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

const startingElevation = "a".charCodeAt(0);
const highestElevation = "z".charCodeAt(0);
const elevations = {};
elevations["E"] = highestElevation - startingElevation;
for (let i = startingElevation; i <= highestElevation; i++) {
  elevations[String.fromCharCode(i)] = i - startingElevation;
}

const doBfs = (startY, startX, data) => {
  const visited = {};
  const queue = [getNode(startY, startX, 0, "")];
  let paths = [];
  while (queue.length) {
    const current = queue.shift();
    const key = `${current.y}__${current.x}`;
    if (current.node === "E" && current.canMoveHere) paths.push(current.path);
    if (visited[key] || current.node === "E") continue;
    visited[key] = current;
    const toAdd = getAdjacentNodes(current.y, current.x, current.path).filter(
      (i) => i.canMoveHere || i.isEnd
    );
    queue.push(...toAdd);
  }

  const result = paths.filter(Boolean).map((i) => i.length - 1);
  return result;


  function getAdjacentNodes(y, x, path) {
    const result = [];
    const elevation = elevations[data[y][x]];
    const left = getNode(y - 1, x, elevation, path);
    const right = getNode(y + 1, x, elevation, path);
    const top = getNode(y, x - 1, elevation, path);
    const bottom = getNode(y, x + 1, elevation, path);
    if (left != null) result.push(left);
    if (right != null) result.push(right);
    if (top != null) result.push(top);
    if (bottom != null) result.push(bottom);
    return result;
  }

  function getNode(y, x, previousElevation = 0, path = "") {
    const node = data[y]?.[x];
    if (!node) return undefined;
    const elevation = elevations[node];
    const isEnd = node === "E";
    const canMoveHere = elevation <= previousElevation + 1;
    return {
      node,
      y,
      x,
      canMoveHere,
      path: canMoveHere || isEnd ? path + node : undefined,
      isEnd,
    };
  }
};

const prepData = (input, isP1) => {
  const data = input
    .split("\n")
    .filter(Boolean)
    .map((i) => i.trim());

  if (isP1) {
    const [startY, startX] = findStartingPoint();
    return doBfs(startY, startX, data);
  }

  const startingPoints = [];
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j] === "a") startingPoints.push([i, j]);
    }
  }

  return startingPoints.map(([y,x]) => doBfs(y,x, data))

  function findStartingPoint() {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        if (data[i][j] === "S") return [i, j];
      }
    }
  }
};

const partOne = async () => {
  const data = await fetch(12);
  const preppedData = prepData(data, true);
  const min = Math.min(...preppedData);
  return min;
};

const partTwo = async () => {
  const data = await fetch(12);
  const preppedData = prepData(data, false);
  const possiblePaths = preppedData.flat();
  const min = Math.min(...possiblePaths);
  console.log(min);
};

// partOne();
partTwo();
