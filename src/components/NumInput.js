import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Key } from './Key';

const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

export const NumInput = ({ addKey }) => (
    <>
        {keys.map(el => (
            <Key classname="numKey" key={el} val={el} handler={addKey(el)} />
        ))}
    </>
);

NumInput.propTypes = {
    addKey: PropTypes.func,
};
