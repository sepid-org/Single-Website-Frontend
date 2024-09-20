export const FilmBaziBackendURL = process.env.NODE_ENV === 'production'
  ? 'https://api.filmbazi.ir/'
  : 'http://localhost:12000/';