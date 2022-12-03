import fetch from "node-fetch";
const getUrl = (day) => `https://adventofcode.com/2022/day/${day}/input`;

const fetchAoc = async (day) => {
  const url = getUrl(day);
  const res = await fetch(url, {
    headers: {
      cookie:
        "session=53616c7465645f5fed145f0453fbef7154882013c9e97813b589ec5913413282cde3555548f818f90775f104781a318162b55ea85f8ba63af7ee4cfa1c992cd9",
    },
  });

  const data = await res.text();
  return data;
};

export default fetchAoc;
