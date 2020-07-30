"use strict";

const fs = require("fs");
const path = require("path");
const locales = "../locales";

fs.readdir(locales, function(err, files) {
  if (err) return console.error(err);

  files.forEach(function(file) {
    const unordered = JSON.parse(fs.readFileSync(path.join(locales, file)));
    const ordered = {};

    Object.keys(unordered)
      .sort()
      .forEach(function(key) {
        ordered[key] = unordered[key];
      });

    fs.writeFileSync(
      path.join(locales, file),
      JSON.stringify(ordered, null, 2).concat('\n')
    );
  });
});
