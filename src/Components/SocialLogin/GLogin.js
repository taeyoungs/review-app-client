import React from 'react';
import GoogleLogin from 'react-google-login';
import { onLoginCallback } from 'lib/gLoginCallback';

const Login = () => {
  return (
    <GoogleLogin
      clientId="1060200703755-6mdo0b79pdmguq22l2st0ad91csqjbis.apps.googleusercontent.com"
      buttonText="구글 계정으로 로그인"
      onSuccess={(result) => onLoginCallback(result)}
      onFailure={(result) => console.log(result)}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default Login;
