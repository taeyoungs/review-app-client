import React from 'react';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
    
    @font-face {
        font-family: 'NanumGothic';
        src: url('https://fonts.googleapis.com/css?family=Nanum+Gothic|Anton&display=swap.eot');
        src: url('https://fonts.googleapis.com/css?family=Nanum+Gothic|Anton&display=swap.eot?#iefix') format('embedded-opentype');
    }
    ${reset}
    * {
        box-sizing: border-box;
    }
    body {
        font-family: 'NanumGothic';
        background-color: rgba(20, 20, 20, 1);
        padding-top: 60px;
    }
    a {
        text-decoration: none;
        color: white;
    }
    button {
        outline: 0;
        font-family: 'NanumGothic';
        cursor: pointer;
    }
    input[type=email], input[type=password] {
        outline: 0;
        background-color: white;
        color: black;
        font-size: 17px;
        padding: 20px;
        border-radius: 20px;
        font-family: 'NanumGothic';
        ::placeholder {
            font-family: 'NanumGothic';
            font-size: 16px;
        }
    }
    .shadow {
        -webkit-filter: drop-shadow( 1px 1px 1px #f1c40f);
        filter: drop-shadow( 1px 1px 1px #f1c40f);
    }
`;

export default GlobalStyles;
