const fs = require("fs")

const constest = fs.readFileSync("a.txt", "utf-8");
console.log(constest)