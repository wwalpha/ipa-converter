import * as fs from 'fs';
import * as path from 'path';

const symbolLines = fs.readFileSync(path.join(__dirname, '../dict/cmudict.symbols'), 'utf-8');
const dictLines = fs.readFileSync(path.join(__dirname, '../dict/england.dict'), 'utf-8');

let symbols: any = {};
let dicts: any = [];

symbolLines.split('\n').forEach((item: string) => {
  const keypairs = item.split(' ');
  symbols[keypairs[0]] = keypairs[1];
});

console.log(`length: ${dictLines.length}`);

dictLines.split('\n').forEach((item: string) => {
  const wordParts = item.split(' ');

  const word: any = wordParts.shift();
  const pronunciation = wordParts.reduce((prev: string, curr: string) => {
    return `${prev}${symbols[curr]}`;
  }, '');

  dicts.push(`${word} ${pronunciation}`);
});

fs.writeFileSync(path.join(__dirname, '../pronunciation/england.dict'), dicts.join('\n'), {
  encoding: 'utf-8',
});