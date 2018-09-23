import * as fs from 'fs';
import * as path from 'path';

const symbolLines = fs.readFileSync(path.join(__dirname, '../dict/cmudict.symbols'), 'utf-8');

let symbols: any = {};

symbolLines.split('\n').forEach((item: string) => {
  const keypairs = item.split(' ');
  symbols[keypairs[0]] = keypairs[1];
});

const createDict = (dictName: string, outputName: string) => {
  const dictLines = fs.readFileSync(path.join(__dirname, `../dict/${dictName}`), 'utf-8');
  const dicts: any = [];

  dictLines.split('\n').forEach((item: string) => {
    const wordParts = item.split(' ');

    const word: any = wordParts.shift();
    const pronunciation = wordParts.reduce((prev: string, curr: string) => {
      return `${prev}${symbols[curr]}`;
    }, '');

    dicts.push(`${word} ${pronunciation}`);
  });

  fs.writeFileSync(path.join(__dirname, `../pronunciation/${outputName}`), dicts.join('\n'), {
    encoding: 'utf-8',
  });
}

createDict('america.dict', 'america.dict');
createDict('england.dict', 'england.dict');
