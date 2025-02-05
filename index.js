require("dotenv").congif();
const express = require("express");
const app = express();

console.log("-------- Env Vars --------");
console.log(process.env);
console.log("-------- /Env Vars --------");

app.listen(3001);
