const fs = require('fs');
const { exec } = require('node:child_process');

const folder = '.';

const res = fs.readdirSync(folder);
const ids = res.map(Number).filter((v) => v >= 101020);

exec('ls **/*.prefab | cut -d"." -f-2 | xargs -I{} mv {}.prefab {}');
exec('ls **/*.asset | cut -d"." -f-2 | xargs -I{} mv {}.asset {}');

ids.forEach((id) => {
  const atlasContent = fs.readFileSync(`./${id}/Pilot_${id}.atlas`, 'utf-8');
  const lines = atlasContent.split('\n');
  const targetSize = lines[2].split(' ')[1];
  if (fs.existsSync(`./${id}/pilot_${id}.skel`)) {
    exec(`mv ./${id}/pilot_${id}.skel ./${id}/Pilot_${id}.skel`);
  }
  if (fs.existsSync(`./${id}/pilot_${id}.atlas`)) {
    exec(`mv ./${id}/pilot_${id}.atlas ./${id}/Pilot_${id}.atlas`);
  }
  if (fs.existsSync(`./${id}/pilot_${id}.png`)) {
    exec(`mv ./${id}/pilot_${id}.png ./${id}/Pilot_${id}.png`);
  }
  exec(`cli resize-img ./${id}/Pilot_${id}.png ${targetSize}`);
});