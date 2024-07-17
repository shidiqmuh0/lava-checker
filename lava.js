const fs = require('fs');
const csv = require('csv-parser');

const csvFilePath = 'lava.csv';
const jsonOutputPath = 'output.json';

let result = [];
let no = 1;

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (row) => {
    let jsonObject = {
      no: no++,
      address: row.claimedAddresses
    };
    result.push(jsonObject);
  })
  .on('end', () => {
    fs.writeFile(jsonOutputPath, JSON.stringify(result, null, 2), (err) => {
      if (err) {
        console.error('Error writing to JSON file:', err);
      } else {
        console.log('CSV successfully converted to JSON');
      }
    });
  });
