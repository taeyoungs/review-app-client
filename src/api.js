import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: 'e58a81dc501947f271b5a7d7fb46764f',
    language: 'ko-KR',
  },
});

export const movieApi = {
  nowPlaying: () => axios.get('movie/now_playing'),
  upComing: () => axios.get('movie/upcoming'),
  getBackdrop: id => axios.get(`movie/${id}/images`),
  search: term =>
    axios.get('search/movie', {
      params: {
        query: encodeURIComponent(term),
      },
    }),
};
