import React from 'react';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
    
    @font-face {
        font-family: 'NanumGothic';
        src: url('https://fonts.googleapis.com/css?family=Nanum+Gothic|Anton&display=swap');
    }
    ${reset}
    body {
        font-family: 'NanumGothic';
        background-color: rgba(20, 20, 20, 1);
        padding-top: 60px;
    }
    a {
        text-decoration: none;
    }
`;

export default GlobalStyles;
