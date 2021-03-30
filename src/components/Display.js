import React, { useState } from 'react';
import styled from 'styled-components';
import { Card, CardContent, Typography } from '@material-ui/core';

export const Display = ({ current, messageActive }) => (
    <DisplayStyle messageActive={messageActive}>
        <Card id="dis">{current}</Card>
    </DisplayStyle>
);

const DisplayStyle = styled.div`
    #dis {
        overflow-x: hidden;
        margin: 0;
        min-height: 5rem;
        text-align: center;
        font-size: ${props => (props.messageActive ? '2.5rem' : '4rem')};
        font-weight: 400;
        width: 100%;
        max-width: var(--max-width);
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
