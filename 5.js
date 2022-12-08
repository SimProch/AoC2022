import fetch from "./fetch.js";

const testData = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

const prepData = (input) => {
  const data = input.split("\n").filter(Boolean);
  const procedureBeginsAt = data.findIndex((i) => i.includes("move"));
  const crates = data.slice(0, procedureBeginsAt - 1);
  const instructions = data.slice(procedureBeginsAt);
  const numberOfStacks = crates.length;
  const stacks = {};
  const crateIndices = getCrateIndices();
  const keys = Object.keys(crateIndices);
  keys.forEach((key) => (stacks[key] = []));
  for (let i = numberOfStacks - 1; i >= 0; i--) {
    keys.forEach((key) => {
      const items = crates[i];
      const item = items[crateIndices[key]].trim();
      if (item) {
        stacks[key].push(item);
      }
    });
  }

  return { stacks, instructions };

  function getCrateIndices() {
    const crateIndices = {};
    const crateIndicesText = data[procedureBeginsAt - 1];
    for (let i = 0; i < crateIndicesText.length; i++) {
      const index = +crateIndicesText[i];
      if (index == 0) continue;
      crateIndices[index] = i;
    }
    return crateIndices;
  }
};

const prepInstructions = (instructions) => {
  const result = instructions.map((instruction) => {
    const instructions = instruction
      .split(" ")
      .filter(Number)
      .map((i) => +i);
    const [howMany, from, to] = instructions;
    return { howMany, from, to };
  });
  return result;
};

const partOne = async () => {
  const data = await fetch(5);
  const { stacks, instructions } = prepData(data);
  const preparedInstructions = prepInstructions(instructions);
  preparedInstructions.forEach((instruction) => {
    console.log(stacks);
    const { howMany, from, to } = instruction;
    for (let i = 0; i < howMany; i++) {
      const toMove = stacks[from].pop();
      stacks[to].push(toMove);
    }
  });

  const result = Object.values(stacks)
    .map((i) => i[i.length - 1])
    .join("");
  console.log(result);
};

const partTwo = async () => {
  const data = await fetch(5);
  const { stacks, instructions } = prepData(data);
  const preparedInstructions = prepInstructions(instructions);
  preparedInstructions.forEach((instruction) => {
    const { howMany, from, to } = instruction;
    const toMove = stacks[from].slice(stacks[from].length - howMany);
    stacks[from].splice(stacks[from].length - howMany, howMany);
    stacks[to].push(...toMove);
  });

  const result = Object.values(stacks)
    .map((i) => i[i.length - 1])
    .join("");
  console.log(result);
};

// partOne();
partTwo();
