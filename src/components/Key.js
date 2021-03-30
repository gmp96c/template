import React from 'react';
import styled from 'styled-components';

export const Key = ({ handler, val, classname = '' }) => (
    <KeyStyle
        className={classname}
        variant="h3"
        align="center"
        onClick={handler}
        isNaN={isNaN(parseInt(val))}
    >
        {val}
    </KeyStyle>
);

const KeyStyle = styled.div`
    font-size: ${props => (props.isNaN ? '1.75rem' : '2.5rem')};
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    background: #fff;
    border: 1.5px solid #3f3f3f;
    box-sizing: border-box;
    border-radius: 4px;
    :hover {
        background: #fcfcfc;
        color: ${props => (props.isNaN ? '#e5e5e5' : ' #757575')};

    box-shadow: 0px 0px 1px 2px #444444;
    }
    box-shadow: 0px 0px 2px 1px #444444;

    font-weight: ${props => (props.isNaN ? '500' : ' normal')};
    /* text-shadow: ${props => (props.isNaN ? '0px 0px 1px #000000' : '0')}; */

    color: ${props => (props.isNaN ? '#e5e5e5' : '#272727')};
    font-family: 'Roboto', sans-serif;
    /* font-size: 7vh;
  line-height: 14.1vh; */
    /* min-height: 14vh; */
`;
