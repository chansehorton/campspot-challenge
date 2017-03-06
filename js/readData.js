'use strict'

// pull a JSON file into an object variable
exports.readData = (filename) => {
  const fs = require('fs');
  const path = require('path');
  const dataPath = path.join(__dirname, `../data/${filename}`);

  if (!filename) {
    return new Error('No filename provided!');
  }

  if(!fs.existsSync(dataPath)) {
    return new Error('File not found!')
  }

  const campData = fs.readFileSync(dataPath, 'utf8');
  const jsonCampData = JSON.parse(campData);

  return jsonCampData;
}
