export const environment = {
  production: false,
  IMDB_KEY: process.env['NG_APP_IMDB_KEY'] || '',
  SUPABASE_URL: process.env['NG_APP_SUPABASE_URL'] || '',
  SUPABASE_KEY: process.env['NG_APP_SUPABASE_KEY'] || '',
};