import fs from 'fs';

export const writeJSON = <T = any>(path: string, filename: string, content: T, meta?: any) => {
  // make folders if they don't exist
  fs.mkdirSync(path, { recursive: true });

  // write all content to json file
  const json = JSON.stringify({ ...meta, data: content });
  fs.writeFile(`${path}/${filename}.json`, json, err => {
    if (err) console.log(err);
  });
};
