import fetch from "./fetch.js";

const partOne = async () => {
  const data = (await fetch(4)).split("\n").filter(Boolean);

  const sections = data.map((datum) => datum.split(","));
  let numberOfContainedPairs = 0;
  for (let i = 0; i < sections.length; i++) {
    const [firstSection, secondSection] = sections[i];
    const [firstSectionStart, firstSectionEnd] = firstSection
      .split("-")
      .map((i) => +i);
    const [secondSectionStart, secondSectionEnd] = secondSection
      .split("-")
      .map((i) => +i);
    const isFirstContained =
      firstSectionStart >= secondSectionStart &&
      firstSectionEnd <= secondSectionEnd;
    const isSecondContained =
      secondSectionStart >= firstSectionStart &&
      secondSectionEnd <= firstSectionEnd;
    if (isFirstContained || isSecondContained) {
      numberOfContainedPairs++;
      continue;
    }
  }
  console.log(numberOfContainedPairs);
  return numberOfContainedPairs;
};

const partTwo = async () => {
  const data = (await fetch(4)).split("\n").filter(Boolean);

  const sections = data.map((datum) => datum.split(","));
  let numberOfContainedPairs = 0;
  for (let i = 0; i < sections.length; i++) {
    const [firstSection, secondSection] = sections[i];
    const [firstSectionStart, firstSectionEnd] = firstSection
      .split("-")
      .map((i) => +i);
    const [secondSectionStart, secondSectionEnd] = secondSection
      .split("-")
      .map((i) => +i);

    const firstOverlaps =
      (firstSectionStart >= secondSectionStart &&
        firstSectionStart <= secondSectionEnd) ||
      (firstSectionEnd >= secondSectionStart &&
        firstSectionEnd <= secondSectionEnd);

    const secondOverlaps =
      (secondSectionStart >= firstSectionStart &&
        secondSectionStart <= firstSectionEnd) ||
      (secondSectionEnd >= firstSectionStart &&
        secondSectionEnd <= firstSectionEnd);

    const doOverlap = firstOverlaps || secondOverlaps;
    if (doOverlap) {
      numberOfContainedPairs++;
    }
  }
  console.log(numberOfContainedPairs);
  return numberOfContainedPairs;
};

// partOne();
partTwo();
