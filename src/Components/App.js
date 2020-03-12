import React from 'react';
import Router from 'Components/Router';
import GlobalStyles from './GlobalStyles';
import LoginProvider from './Provider/LoginProvider';

function App() {
  return (
    <LoginProvider>
      <Router />
      <GlobalStyles />
    </LoginProvider>
  );
}

export default App;
