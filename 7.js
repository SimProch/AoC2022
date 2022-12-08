import fetch from "./fetch.js";

const testData = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

const getTree = (input) => {
  const data = input.split("\n");
  const tree = {};
  const treeData = [];
  let directory = "";
  data.forEach((datum) => {
    if (datum[0] === "$") {
      datum = datum.slice(1);
      const command = datum.slice(1, 3);
      if (command === "cd") {
        datum = datum.slice(4);
        if (datum === "/") {
          directory = "/";
          return;
        }
        if (datum === "..") {
          directory = directory.slice(0, directory.length - 1);
          const lastDirectory = directory.lastIndexOf("/");
          directory = directory.slice(0, lastDirectory) + "/";
          return;
        }
        directory += `${datum}/`;
      }
      return;
    }
    const listed = datum.slice(0, 3);
    if (listed === "dir") {
      return;
    }
    const [fileSize, fileName] = datum.split(" ");
    treeData.push({
      directory,
      fileSize: +fileSize,
      file: fileName,
    });
  });
  treeData.forEach((datum) => {
    const { directory, size, file } = datum;
    if (directory === "/") {
      tree[file] = datum;
      return;
    }
    let path = directory.split("/").filter((i) => i);
    let current = tree;
    while (true) {
      const [directory, ...rest] = path;
      if (!current[directory]) {
        current[directory] = {};
        current = current[directory];
    } else {
        current = current[directory];
      }
      path = rest;
      if (path.length !== 0) continue;
      if (file == null) break;
      current[file] = datum;
      break;
    }
  });
  return tree;
};

const partOne = async () => {
  const data = await fetch(7);
  const tree = getTree(data);
  setFileSize(tree);
  const resultDirectories = [];
  setThresholdedItems(tree, resultDirectories, 100000);
  const result = resultDirectories.reduce((x,y) => x + y.fileSize, 0);
  return result;
};

const setFileSize = (current, directories) => {
  if (current.fileSize) {
    return current.fileSize;
  }

  let fileSize = 0;
  Object.keys(current).forEach((key) => {
    fileSize += setFileSize(current[key], directories);
  });
  current.fileSize = fileSize;
  directories.push(current)
  return fileSize;
};

const setThresholdedItems = (current, res, threshold) => {
  if (current.file) return;

  if (current.fileSize < threshold) {
    res.push(current);
  }

  Object.keys(current).forEach((key) => {
    setThresholdedItems(current[key], res, threshold)
  });
};

const partTwo = async () => {
  const data = await fetch(7);
  console.log(data);
  const tree = getTree(data);
  const directories = [];
  const totalFileSize = setFileSize(tree, directories);
  const MAXIMUM_SPACE = 70000000;
  const UPDATE_REQUIRED_SPACE = 30000000
  const REQUIRED_SPACE = MAXIMUM_SPACE - UPDATE_REQUIRED_SPACE;
  directories.sort((x,y) => x.fileSize - y.fileSize);
  if (totalFileSize < REQUIRED_SPACE) {
    console.log("hit");
    return undefined;
  }
  const toDelete = directories.find(i => {
    if (totalFileSize - i.fileSize < REQUIRED_SPACE) return true;
    return false;
  })
  console.log(toDelete);
};

// partOne();
partTwo();
