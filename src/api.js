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
        query: term,
      },
    }),
  movieDetail: id =>
    axiosForMovie.get(`movie/${id}`, {
      params: {
        append_to_response: 'videos',
      },
    }),
  collection: id => axiosForMovie.get(`collection/${id}`),
};

//encodeURIComponent(term)

const axiosForAuth = Axios.create({
  baseURL: 'http://localhost:4000/api/auth/',
  withCredentials: true,
});

// axiosForAuth.defaults.withCredentials = true;

export const toAuthApi = {
  join: payload => axiosForAuth.post(`join/local`, payload),
  exists: payload =>
    axiosForAuth.get(`exists/${payload.type}/${payload.value}`),
  Slogin: payload => axiosForAuth.post(`login/local`, payload),
  Slogout: () => axiosForAuth.post(`logout`),
  check: () => axiosForAuth.get(`check`),
};

const axiosForServer = Axios.create({
  baseURL: 'http://localhost:4000/api',
});

export const toServerApi = {
  createUser: payload => axiosForServer.post(`/user`, payload),
  insertReview: payload => axiosForServer.post(`/review`, payload),
};
