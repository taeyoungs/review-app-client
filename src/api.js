import Axios from 'axios';

const API_URL = 'https://youngs-review.mooo.com';

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
  search: (term) =>
    axiosForMovie.get('search/movie', {
      params: {
        query: term,
      },
    }),
  movieDetail: (id) =>
    axiosForMovie.get(`movie/${id}`, {
      params: {
        append_to_response: 'videos',
      },
    }),
  collection: (id) => axiosForMovie.get(`collection/${id}`),
};

//encodeURIComponent(term)

const axiosForAuth = Axios.create({
  baseURL: `${API_URL}/api/auth/`,
  withCredentials: true,
});

// axiosForAuth.defaults.withCredentials = true;

export const toAuthApi = {
  join: (payload) => axiosForAuth.post(`join/local`, payload),
  exists: (payload) =>
    axiosForAuth.get(`exists/${payload.type}/${payload.value}`),
  Slogin: (payload) => axiosForAuth.post(`login/local`, payload),
  Slogout: () => axiosForAuth.post(`logout`),
  check: () => axiosForAuth.get(`check`),
  tempPwChange: (email) => axiosForAuth.post(`tempPwChange`, email),
  checkPassword: (payload) => axiosForAuth.post(`checkPassword`, payload),
  googleLogin: (payload) => axiosForAuth.post(`google`, payload),
};

const axiosForServer = Axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
});

export const toServerApi = {
  createUser: (payload) => axiosForServer.post(`/user`, payload),
  insertReview: (payload) => axiosForServer.post(`/reviews/upload`, payload),
  getReview: (id) => axiosForServer.get(`/reviews/${id}`),
  getReviewList: (payload) =>
    axiosForServer.get(`/reviews/${payload.key}/list/${payload.page}`),
  deleteReview: (id) => axiosForServer.get(`/reviews/${id}/delete`),
  getMovieReviewList: (id) => axiosForServer.get(`/reviews/movie/${id}`),
  editReview: (payload) => axiosForServer.post(`/reviews/edit-review`, payload),
  likeReview: (id) => axiosForServer.post(`/reviews/${id}/like-review`),
  dislikeReview: (id) => axiosForServer.post(`/reviews/${id}/dislike-review`),
  createComment: (payload) => axiosForServer.post(`/comments/create`, payload),
  deleteComment: (payload) => axiosForServer.post(`/comments/delete`, payload),
  updateComment: (payload) => axiosForServer.post(`/comments/update`, payload),
  getReviewComments: (id) => axiosForServer.get(`/comments/${id}`),
  getReviewPaging: (payload) =>
    axiosForServer.post(`/reviews/reviewPaging`, payload),
};

const axiosForUser = Axios.create({
  baseURL: `${API_URL}/api/users`,
  withCredentials: true,
});

export const toUserApi = {
  changePassword: (payload) => axiosForUser.post(`/change-password`, payload),
  getUserDetail: (id) => axiosForUser.get(`/${id}`),
  editUserProfile: (payload) => axiosForUser.post(`/edit-profile`, payload),
  uploadThumbnail: (formData) =>
    axiosForUser.post(`/upload/thumbnail`, formData),
  dropOutUser: (id) => axiosForUser.get(`/dropOut/${id}`),
};
