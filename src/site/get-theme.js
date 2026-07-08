require("dotenv").config();
const fs = require("fs");
const crypto = require("crypto");
const {globSync} = require("glob");

async function getTheme() {
  try {
    // 1. Read your uploaded theme.css file directly from your project folder
    const data = fs.readFileSync("theme.css", "utf8");

    // 2. Clean out old theme builds
    const existing = globSync("src/site/styles/_theme.*.css");
    existing.forEach((file) => {
      fs.rmSync(file);
    });

    // 3. Hash and write the file locally so the build finishes smoothly
    const hashSum = crypto.createHash("sha256");
    hashSum.update(data);
    const hex = hashSum.digest("hex");
    fs.writeFileSync(`src/site/styles/_theme.${hex.substring(0, 8)}.css`, data);
    console.log("Successfully loaded theme.css locally!");
  } catch (err) {
    console.error("Local theme build failed:", err);
  }
}

getTheme();
