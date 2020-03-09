import Axios from 'axios';

const axiosForMovie = Axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: '93938de29ee06b9d46369c6d6d363f01',
    language: 'ko-KR',
  },
});

export const movieApi = {
  nowPlaying: () => axiosForMovie.get('movie/now_playing'),
  upComing: () => axiosForMovie.get('movie/upcoming'),
  genre: () => axiosForMovie.get('genre/movie/list'),
  search: term =>
    axiosForMovie.get('search/movie', {
      params: {
        query: encodeURIComponent(term),
      },
    }),
};

const axiosForServer = Axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const toServerApi = {
  join: payload => axiosForServer.post(`/join`, payload),
  logout: () => axiosForServer.post(`/logout`),
  createUser: payload => axiosForServer.post(`/user`, payload),
  insertReview: payload => axiosForServer.post(`/review`, payload),
};
