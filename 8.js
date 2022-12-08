import fetch from "./fetch.js";

const testData = `30373
25512
65332
33549
35390`;

const getGrid = (data) => {
  const grid = data
    .split("\n")
    .filter(Boolean)
    .map((row) => {
      return row.split("").map((i) => +i);
    });
  return grid;
};

const getVisibleTrees = (grid) => {
  let visibleTrees = 4 * grid.length - 4;
  let highestScenicScore = 0;
  for (let y = 1; y < grid.length - 1; y++) {
    for (let x = 1; x < grid.length - 1; x++) {
      const { isVisible, scenicScore } = isTreeVisible(y, x);
      if (isVisible) {
        visibleTrees++;
        if (highestScenicScore < scenicScore) highestScenicScore = scenicScore;
      }
    }
  }

  console.log(highestScenicScore)
  return visibleTrees;

  function isTreeVisible(y, x) {
    const tree = grid[y][x];

    const isVisibleFromLeft = () => {
      let i;
      for (i = x - 1; i >= 0; i--) {
        const currentTree = grid[y][i];
        if (currentTree >= tree) {
          return { visible: false, view: x - i };
        }
      }
      return { visible: true, view: x - i - 1 };
    };

    const isVisibleFromRight = () => {
      let i;
      for (i = x + 1; i < grid.length; i++) {
        const currentTree = grid[y][i];
        if (currentTree >= tree) {
          return { visible: false, view: i - x };
        }
      }
      return { visible: true, view: i - x - 1 };
    };

    const isVisibleFromTop = () => {
      let i;
      for (i = y - 1; i >= 0; i--) {
        const currentTree = grid[i][x];
        if (currentTree >= tree) {
          return { visible: false, view: y - i };
        }
      }
      return { visible: true, view: y - i - 1 };
    };

    const isVisibleFromBottom = () => {
      let i;
      for (i = y + 1; i < grid.length; i++) {
        const currentTree = grid[i][x];
        if (currentTree >= tree) {
          return { visible: false, view: i - y };
        }
      }
      return { visible: true, view: i - y - 1 };
    };

    const left = isVisibleFromLeft();
    const right = isVisibleFromRight();
    const top = isVisibleFromTop();
    const bottom = isVisibleFromBottom();
    const isVisible =
      left.visible || right.visible || top.visible || bottom.visible;
    
    const scenicScore = left.view * right.view * top.view * bottom.view;

    if (isVisible) {
      debugger;
    }
    return { isVisible, scenicScore };
  }
};

const partOne = async () => {
  const data = await fetch(8);
  const grid = getGrid(data);
  const visibleTrees = getVisibleTrees(grid);
  console.log(visibleTrees);
};

const partTwo = async () => {
  const data = await fetch(8);
  const grid = getGrid(data);
  const visibleTrees = getVisibleTrees(grid);
};

partOne();
// partTwo();
