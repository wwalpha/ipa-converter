import * as fs from 'fs';
import * as path from 'path';

const dictLines = fs.readFileSync(path.join(__dirname, '../dict/cmudict.dict'), 'utf-8');
const dicts: string[] = [];

const america: string[] = [];
const england: string[] = [];

dictLines.split('\n').forEach((item: string) => {
  if (item.indexOf('\'s') !== -1) {
    return;
  }

  dicts.push(item);
});

dicts.forEach((item: string, idx: number) => {
  if (item.indexOf('(2)') !== -1) {
    england.pop();
    england.push(item.replace('(2)', ''));
    return;
  }

  america.push(item);
  england.push(item);

  if ((idx % 1000) === 0) {
    console.log(`index:${idx}`);
  }
});

fs.writeFileSync(path.join(__dirname, '../dict/america.dict'), america.join('\n'), {
  encoding: 'utf-8',
});

fs.writeFileSync(path.join(__dirname, '../dict/england.dict'), england.join('\n'), {
  encoding: 'utf-8',
});
