import fs from 'fs';

export const readJSON = (paths: string[]) => {
  const data = [];
  for (let i = 0; i < paths.length; i++) {
    const raw = fs.readFileSync(`../../data/${paths[i]}`, { encoding: 'utf8' });
    data.push(JSON.parse(raw).data);
  }

  return data;
};
