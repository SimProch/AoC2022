import fetch from "./fetch.js";

const SCORING = {
  WIN: 6,
  LOSS: 0,
  DRAW: 3,
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3,
};

const MAPPER = {
  A: "ROCK",
  B: "PAPER",
  C: "SCISSORS",
  Y: "PAPER",
  X: "ROCK",
  Z: "SCISSORS",
};

const WINS = {};
WINS[MAPPER["A"]] = MAPPER["Z"];
WINS[MAPPER["B"]] = MAPPER["X"];
WINS[MAPPER["C"]] = MAPPER["Y"];

const partOne = async () => {
  const data = (await fetch(2)).split("\n").filter(Boolean);
  let points = 0;
  data.forEach((play) => {
    const plays = play.split(" ");
    const firstPlayerPlay = MAPPER[plays[0]];
    const secondPlayerPlay = MAPPER[plays[1]];
    const secondPlayerScore = SCORING[secondPlayerPlay];
    const isDraw = firstPlayerPlay == secondPlayerPlay;
    if (isDraw) {
      points += SCORING.DRAW + secondPlayerScore;
      return;
    }
    const isWin = WINS[secondPlayerPlay] === firstPlayerPlay;
    if (isWin) {
      points += SCORING.WIN + secondPlayerScore;
      return;
    }

    points += SCORING.LOSS + secondPlayerScore;
  });
  return points;
};

const NEED_TO = {
  X: "LOSE",
  Y: "DRAW",
  Z: "WIN",
};

const LOSSES = {};
LOSSES[MAPPER["Z"]] = MAPPER["A"];
LOSSES[MAPPER["X"]] = MAPPER["B"];
LOSSES[MAPPER["Y"]] = MAPPER["C"];

const partTwo = async () => {
  const data = (await fetch(2)).split("\n").filter(Boolean);
  let points = 0;
  data.forEach((play) => {
    const plays = play.split(" ");
    const firstPlayerPlay = MAPPER[plays[0]];
    const secondPlayerNeedsTo = NEED_TO[plays[1]];

    if (secondPlayerNeedsTo === "DRAW") {
      points += SCORING.DRAW + SCORING[firstPlayerPlay];
      return;
    }
    if (secondPlayerNeedsTo === "WIN") {
      const winning = Object.entries(WINS).find(
        ([key, value]) => value === firstPlayerPlay
      );
      points += SCORING.WIN + SCORING[winning[0]];
      return;
    }

    const losingPlay = Object.entries(LOSSES).find(
      ([key, value]) => value === firstPlayerPlay
    );

    points += SCORING.LOSS + SCORING[losingPlay[0]];
  });
  console.log(points);
};

// partOne();
partTwo();
