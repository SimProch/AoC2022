import fetch from "./fetch.js";

const testData = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1
`;

const prepData = (data) => {
  const monkeys = getMonkeyDescriptions();
  const monkeyOps = getMonkeyOps();
  return monkeyOps;

  function getMonkeyDescriptions() {
    const result = [];
    const arr = data.split("\n");
    let i = 0;
    while (i < arr.length) {
      const monkey = arr[i];
      const startingItems = arr[i + 1];
      const operation = arr[i + 2];
      const test = arr[i + 3];
      const truthy = arr[i + 4];
      const falsy = arr[i + 5];
      const monkeyDescription = {
        monkey,
        startingItems,
        operation,
        test,
        truthy,
        falsy,
      };
      result.push(monkeyDescription);
      i += 7;
    }
    return result;
  }

  function getMonkeyOps() {
    return monkeys.map(
      ({ monkey, startingItems, operation, test, truthy, falsy }) => {
        monkey = monkey.slice(0, -1);
        const items = startingItems
          .split(":")[1]
          .trim()
          .split(", ")
          .map((i) => +i);
        const [operationToPerform, operationAmount] = operation
          .split(" ")
          .slice(-2);
        const divisibleBy = +test.split(" ").at(-1);
        const throwToIfTrue = +truthy.at(-1);
        const throwToIfFalse = +falsy.at(-1);
        return {
          monkey,
          items,
          operationToPerform,
          operationAmount,
          divisibleBy,
          throwToIfFalse,
          throwToIfTrue,
        };
      }
    );
  }
};

const partOne = async (rounds) => {
  // const data = await fetch(11);
  const data = testData;
  const monkeys = prepData(data);

  const isTestTruthy = (item, divisibleBy) => item % divisibleBy === 0;
  const getWorryLevel = (worryLevel, operationAmount, toPerform) => {
    if (operationAmount === "old") {
      return getWorryLevel(worryLevel, worryLevel, toPerform);
    }
    if (toPerform === "+") {
      return worryLevel + +operationAmount;
    }
    if (toPerform === "*") {
      return worryLevel * +operationAmount;
    }
  };

  const inspectedTimes = {};
  const constant = monkeys.reduce((x,y) => x * y.divisibleBy, 1);
  monkeys.forEach((_, index) => (inspectedTimes[index] = 0));
  for (let i = 0; i < rounds; i++) {
    for (let j = 0; j < monkeys.length; j++) {
      const monkey = monkeys[j];
      inspectedTimes[j] += monkey.items.length;
      while (monkey.items.length > 0) {
        const currentWorryLevel = monkey.items.shift();
        const nextWorryLevel = getWorryLevel(
          currentWorryLevel,
          monkey.operationAmount,
          monkey.operationToPerform
        );
        const reliefWorryLevel = nextWorryLevel;
        const test = isTestTruthy(reliefWorryLevel, monkey.divisibleBy);
monkeys[test ? monkey.throwToIfTrue : monkey.throwToIfFalse].items.push(reliefWorryLevel % constant);
      }
    }
  }
  const sortedTimes = Object.values(inspectedTimes).sort((x, y) => y - x);
  const result = sortedTimes[0] * sortedTimes[1];
  console.log(result);
};

const partTwo = async () => {
  partOne(10000);
};

// partOne(20);
partTwo();
