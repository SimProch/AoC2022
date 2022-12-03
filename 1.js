import fetch from "./fetch.js";

const getElves = (data) => {
  const elves = {};
  let elfCount = 0;
  elves[elfCount] = [];
  data.forEach((val) => {
    if (val == "") {
      elfCount++;
      elves[elfCount] = [];
      return;
    }
    elves[elfCount].push(+val);
  });
  return elves;
};

const getElvesTotal = (elves) => {
  const elvesTotal = {};
  Object.keys(elves).forEach((key) => {
    const elf = elves[key];
    elvesTotal[key] = elf.reduce((x, y) => x + y, 0);
  });
  return elvesTotal;
};

const partOne = async () => {
  const data = (await fetch(1)).split("\n");
  const elves = getElves(data);
  const elvesTotal = getElvesTotal(elves);
  const highest = Math.max(...Object.values(elvesTotal));
  return highest;
};

const partTwo = async () => {
  const data = (await fetch(1)).split("\n");
  const elves = getElves(data);
  const elvesTotal = getElvesTotal(elves);
  const sortedValues = Object.values(elvesTotal).sort((x, y) => y - x);
  const result = sortedValues[0] + sortedValues[1] + sortedValues[2];
  return result;
};

// partOne();
// partTwo();
