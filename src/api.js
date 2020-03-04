import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: '93938de29ee06b9d46369c6d6d363f01',
    language: 'ko-KR',
  },
});

export const movieApi = {
  nowPlaying: () => axios.get('movie/now_playing'),
  upComing: () => axios.get('movie/upcoming'),
  search: term =>
    axios.get('search/movie', {
      params: {
        query: encodeURIComponent(term),
      },
    }),
};
