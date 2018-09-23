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
  // if (item.indexOf('(2)') !== -1) {
  //   const word = item.replace('(2)', '').split(' ');

  //   const key: any = word.shift();
  //   engDicts[key] = word.join('');

  //   return;
  // }

  // const word = item.split(' ');

  // dicts.push({
  //   key: word.shift(),
  //   value: word.join(' '),
  // });
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


// console.log(`dicts.length: ${dicts.length}`);
// dicts.forEach((item: string, idx: number) => {
//   america.push(`${item.key} ${item.value}`);

//   const engWord: any = Object.keys(engDicts).find((key: string) => key === item.key);

//   // 英式発音が存在する
//   if (engWord) {
//     england.push(`${engWord} ${engDicts[engWord]}`);

//     // delete key
//     item.key && delete engDicts[item.key];
//   } else {
//     england.push(`${item.key} ${item.value}`);
//   }

//   if ((idx % 1000) === 0) {
//     console.log(`index:${idx}`);
//   }
// })

fs.writeFileSync(path.join(__dirname, '../dict/america.dict'), america.join('\n'), {
  encoding: 'utf-8',
});

fs.writeFileSync(path.join(__dirname, '../dict/england.dict'), england.join('\n'), {
  encoding: 'utf-8',
});
