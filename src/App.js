import React, { Component, useState, useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';


const App = () => {
  const [state, setState] = useState('');
     return (
        <MainWrapper>
           <h1>Hi</h1>
        </MainWrapper>
    );
};

const MainWrapper = styled.main`
    grid-area: main;
    background: grey;
    padding: 25px;
`;

ReactDOM.render(<App />, document.getElementById('root'));
