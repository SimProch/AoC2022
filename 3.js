import fetch from "./fetch.js";

const getPriorities = () => {
  const capitalStart = "A".charCodeAt(0);
  const capitalEnd = "Z".charCodeAt(0);
  const lowerCaseStart = "a".charCodeAt(0);
  const lowerCaseEnd = "z".charCodeAt(0);
  const priorities = {};

  for (let i = capitalStart; i <= capitalEnd; i++) {
    const item = String.fromCharCode(i);
    priorities[item] = i - (capitalStart - 1) + 26;
  }

  for (let i = lowerCaseStart; i <= lowerCaseEnd; i++) {
    const item = String.fromCharCode(i);
    priorities[item] = i - (lowerCaseStart - 1);
  }

  return priorities;
};

const partOne = async () => {
  const data = (await fetch(3)).split("\n").filter(Boolean);
  const compartments = data.map((datum) => {
    const firstCompartment = datum.slice(datum.length / 2);
    const secondCompartment = datum.slice(0, datum.length / 2);
    return [firstCompartment, secondCompartment];
  });

  const sharedItems = compartments
    .map((compartment) => {
      const [first, second] = compartment;
      for (let i = 0; i < first.length; i++) {
        if (second.includes(first[i])) {
          return first[i];
        }
      }
      return undefined;
    })
    .filter(Boolean);

  const sumOfPriorities = sharedItems.reduce((x, y) => x + priorities[y], 0);
  return sumOfPriorities
};

const partTwo = async () => {
  const data = (await fetch(3)).split("\n").filter(Boolean);
  const groups = [];
  for (let i = 0; i < data.length; i += 3) {
    const items = [data[i], data[i + 1], data[i + 2]];
    groups.push(items);
  }

  const badges = groups.map((group) => {
    const [first, second, third] = group;
    for (let i = 0; i < first.length; i++) {
      if (second.includes(first[i]) && third.includes(first[i]))
        return first[i];
    }
  });

  const sumOfPriorities = badges.reduce((x, y) => x + priorities[y], 0);
  return sumOfPriorities
};

const priorities = getPriorities();
// partOne();
partTwo();
