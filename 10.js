import fetch from "./fetch.js";

const testData = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`;

const prepData = (data) => {
  const arr = data.split("\n");
  const instructions = arr.filter(Boolean).map((i) => i.trim().split(" "));
  return instructions;
};

const runCycles = (instructions) => {
  const result = [];
  let cycle = 0;
  let value = 1;
  instructions.forEach(([instruction, toAdd]) => {
    const valToAdd = toAdd ? +toAdd : 0;
    const cycles = toAdd ? 2 : 1;
    for (let i = 1; i <= cycles; i++) {
      result.push({
        cycle: cycle + i,
        value,
        instruction: toAdd ? instruction + " " + toAdd : instruction,
      });
    }
    value += valToAdd;
    cycle += cycles;
  });
  return result.sort((x, y) => x.cycle - y.cycle);
};

const partOne = async () => {
  const data = await fetch(10);
  const preppedData = prepData(data);
  const cycles = runCycles(preppedData);
  const upTo220 = cycles.slice(0, 220);
  const everySelectedCycle = upTo220
    .filter((i) => i.cycle % 20 === 0)
    .filter((x, i) => i % 2 === 0);
  const signalStrengths = everySelectedCycle.map((i) => ({
    ...i,
    signalStrength: i.cycle * i.value,
  }));
  const sumOfStrength = signalStrengths.reduce(
    (x, y) => x + y.signalStrength,
    0
  );
  return sumOfStrength
};

const fillGrid = (grid, cycles) => {
  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    const row = grid[rowIndex]
    const length = row.length;
    for (let pixelDrawn = 0; pixelDrawn < length; pixelDrawn++) {
      const cycleIndex = pixelDrawn + rowIndex * length;
      const item = cycles[cycleIndex];
      const spritePosition = item.value;
      if (pixelDrawn === spritePosition || pixelDrawn === spritePosition - 1 || pixelDrawn === spritePosition + 1) {
        grid[rowIndex][pixelDrawn] = "#"
      }
    }
  }
}

const partTwo = async () => {
  const data = await fetch(10);
  // const data = testData;
  const preppedData = prepData(data);
  const cycles = runCycles(preppedData);
  const grid = new Array(6).fill(0).map(i => new Array(40).fill("."));
  fillGrid(grid, cycles);
  const text = grid.map(i => i.join("")).join("\n");
  console.log(text);
};

// partOne();
partTwo();
