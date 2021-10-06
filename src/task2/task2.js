const fs = require('fs');
const readline = require('readline');
const csv = require('csvtojson');
const path = require('path');

const file = path.resolve(__dirname,'./csv/file.csv');
const resultFile = path.resolve(__dirname, './resultFile.txt');

const readStream = fs.createReadStream(file).pipe(csv({
    headers: ['book', 'author','amount', 'price'],
    ignoreColumns: /(amount)/,
}));

const rl = readline.createInterface({
    input: readStream,
    crlfDelay: Infinity,
})
const writeStream = fs.createWriteStream(resultFile);

rl.on('line', (line) => {
    writeStream.write(line + '\n')
})
    .on('error', (error) => {
        console.log(error);
    });
