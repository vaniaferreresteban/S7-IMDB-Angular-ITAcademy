export const environment = {
  production: false,
  IMDB_KEY: process.env['NG_APP_IMDB_KEY'] || '',
  supabaseUrl: process.env['NG_APP_SUPABASE_URL'] || '',
  supabaseKey: process.env['NG_APP_SUPABASE_KEY'] || '',
};