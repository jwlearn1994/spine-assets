const fs = require('fs')
const { exec } = require('node:child_process');

const folder = './Character'

const res = fs.readdirSync(folder)
// console.log(JSON.stringify(res, null, 2))

const result = res.map((name) => {
  const matched = name.match(/(.+)\.atlas$/g);
  console.log();
  // exec(`mv ${folder}/${name} ${folder}/${name.replace(matched, '')}`);
  return matched?.[0].replace('.atlas', '');
}).filter(Boolean)
console.log(JSON.stringify(result, null, 2));