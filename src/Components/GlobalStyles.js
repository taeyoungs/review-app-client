import React from 'react';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
    
    @import url('//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css');
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
    input[type=radio] {
        display: none;
    }
    label:before {
        display: inline-block;
        font-size: 1.1rem;
        padding: .3rem .2rem;
        margin: 0;
        cursor: pointer;
        font-family: 'FontAwesome';
        content: '\f005'; /* full star */
    }

    label:last-child:before {
        content: '\f006'; /* empty star outline */
    }
    .half:before {
        content: '\f089'; /* half star no outline */
        position: absolute;
        padding-right: 0;
    }
    input[type=radio]:checked ~ label, label:hover, label:hover ~ label {
        color: #73B100;
    }
    input[type=radio]:checked + label:hover, input[type=radio]:checked ~ label:hover, /* highlight current and previous stars */
    input[type=radio]:checked ~ label:hover ~ label, /* highlight previous selected stars for new rating */
    label:hover ~ input[type=radio]:checked ~ label /* highlight previous selected stars */ { color: #A6E72D;  } 
`;

export default GlobalStyles;
