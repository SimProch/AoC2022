import fetch from "./fetch.js";

const testData = [
  "mjqjpqmgbljsphdztnvjfqwrcgsmlb",
  "bvwbjplbgvbhsrlpgdmjqwftvncz",
  "nppdvjthqldpwncqszvftbrmjlhg",
  "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg",
  "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw",
];

const getMarker = (datum, markerSize) => {
  let marker = 0;
  for (let i = 0; i < datum.length - markerSize; i++) {
    const sequence = datum.slice(i, i + markerSize);
    const sequenceLength = sequence.length;
    const set = new Set(sequence.split(""));
    const setLength = set.size;
    if (sequenceLength !== setLength) continue;
    marker = i + markerSize;
    break;
  }
  return marker;
};

const result = testData.map((i) => getMarker(i, 4));
const works = [7, 5, 6, 10, 11].every((item, index) => result[index] == item);

const partOne = async () => {
  const data = (await fetch(6))
  const marker = getMarker(data,4);
  console.log(marker);
};

const partTwo = async () => {
  const data = await fetch(6);
  const marker = getMarker(data,14);
  console.log(marker);
};

// partOne();
partTwo();
