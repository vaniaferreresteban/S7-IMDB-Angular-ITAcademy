export const environment = {
  production: true,
  IMDB_KEY:process.env['IMDB_KEY'] || '',
  supabaseUrl: process.env['SUPABASE_URL'] || '',
  supabaseKey: process.env['SUPABASE_KEY'] || '',
};
