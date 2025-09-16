import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const successColor = '\x1b[32m%s\x1b[0m';
const checkSign = '\u{2705}';

const isProduction = import.meta.env.NODE_ENV === 'production';

let targetPath;
let envFileContent;

if (isProduction) {
  console.log('Generating environment.ts for production...');
  targetPath = path.join(__dirname, './src/environments/environment.ts');
  envFileContent = `export const environment = {
  production: true,
  IMDB_KEY: '${import.meta.env.NG_APP_IMDB_KEY || ''}',
  SUPABASE_URL: '${import.meta.env.NG_APP_SUPABASE_URL || ''}',
  SUPABASE_KEY: '${import.meta.env.NG_APP_SUPABASE_KEY || ''}'
};
`;
} else {
  dotenv.config();
  console.log('Generating environment.development.ts for development...');
  targetPath = path.join(__dirname, './src/environments/environment.development.ts');
  envFileContent = `export const environment = {
  production: false,
  IMDB_KEY: '${import.meta.env.NG_APP_IMDB_KEY || ''}',
  SUPABASE_URL: '${import.meta.env.NG_APP_SUPABASE_URL || ''}',
  SUPABASE_KEY: '${import.meta.env.NG_APP_SUPABASE_KEY || ''}'
};
`;
}

fs.writeFile(targetPath, envFileContent, (err) => {
  if (err) {
    console.error(err);
    throw err;
  } else {
    console.log(successColor, `${checkSign} Successfully generated ${path.basename(targetPath)}`);
  }
});