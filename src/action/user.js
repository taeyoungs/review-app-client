export const LOGIN = 'LOGIN';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const loginApi = (email, password) => {
  return {
    type: LOGIN,
    promise: {
      method: 'post',
      url: 'http://localhost:8000/api/login',
      data: { email, password },
    },
  };
};
