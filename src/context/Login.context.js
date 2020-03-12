import { createContext } from 'react';

const LoginContext = createContext({
  isLoggedIn: false,
  userInfo: {},
  Clogin: () => {},
  Clogout: () => {},
});

export default LoginContext;
