import fs from 'fs';
import readline from 'readline';
import csv from 'csvtojson';
import path from 'path';

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
    writeStream.write(`${line}\n`)
})
    .on('error', (error) => {
        console.log(error);
    });
