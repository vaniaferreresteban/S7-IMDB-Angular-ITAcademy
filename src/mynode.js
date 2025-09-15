const fs = require('fs');
const path = require('path');
const successColor = '\x1b[32m%s\x1b[0m';
const checkSign = '\u{2705}';
const dotenv = require('dotenv').config({ path: 'src/.env' });


const isProduction = process.env.NODE_ENV === 'production';

const envFile = `export const environment = {
    IMDB_KEY: '${process.env.IMDB_KEY}',
    SUPABASE_URL: '${process.env.SUPABASE_URL}',
    SUPABASE_KEY: '${process.env.SUPABASE_KEY}'
};
`;
if (isProduction) {
    targetPath = path.join(__dirname, './src/environments/environment.ts');
    envFileContent = `export const environment = {
  production: true,
  IMDB_KEY: '${process.env.IMDB_KEY}',
  SUPABASE_URL: '${process.env.SUPABASE_URL}',
  SUPABASE_KEY: '${process.env.SUPABASE_KEY}'
};
`;
} else {
    require('dotenv').config();
    targetPath = path.join(__dirname, './src/environments/environment.development.ts');
    envFileContent = `export const environment = {
  production: false,
  IMDB_KEY: '${process.env.IMDB_KEY}',
  SUPABASE_URL: '${process.env.SUPABASE_URL}',
  SUPABASE_KEY: '${process.env.SUPABASE_KEY}'
};
`;
}

fs.writeFile(targetPath, envFile, (err) => {
    if (err) {
        console.error(err);
        throw err;
    } else {
        console.log(successColor, `${checkSign} Successfully generated environment.development.ts`);
    }
});
