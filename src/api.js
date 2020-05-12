import Axios from 'axios';

// const API_URL = 'https://youngs-review.mooo.com';
const API_URL = 'http://localhost:4000';

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
  deleteReview: (id) => axiosForServer.delete(`/reviews/${id}`),
  getMovieReviewList: (id) => axiosForServer.get(`/reviews/movie/${id}`),
  editReview: (payload) => axiosForServer.put(`/reviews/edit-review`, payload),
  likeReview: (id) => axiosForServer.put(`/reviews/${id}/like-review`),
  dislikeReview: (id) => axiosForServer.put(`/reviews/${id}/dislike-review`),
  createComment: (payload) => axiosForServer.post(`/comments/create`, payload),
  deleteComment: (payload) =>
    axiosForServer.delete(`/comments/${payload.reviewId}/${payload.commentId}`),
  updateComment: (payload) => axiosForServer.put(`/comments/update`, payload),
  getReviewComments: (id) => axiosForServer.get(`/comments/${id}`),
  getReviewPaging: (payload) =>
    axiosForServer.get(
      `/reviews/reviewPaging?id=${payload.id}&key=${payload.key}&len=${payload.len}&page=${payload.page}`,
    ),
};

const axiosForUser = Axios.create({
  baseURL: `${API_URL}/api/users`,
  withCredentials: true,
});

export const toUserApi = {
  changePassword: (payload) => axiosForUser.put(`/change-password`, payload),
  getUserDetail: (id) => axiosForUser.get(`/${id}`),
  editUserProfile: (payload) => axiosForUser.put(`/edit-profile`, payload),
  uploadThumbnail: (formData) =>
    axiosForUser.post(`/upload/thumbnail`, formData),
  dropOutUser: (id) => axiosForUser.delete(`/dropOut/${id}`),
};
