import React, { Component, useState, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import 'normalize.css';
import axios from 'axios';
import { Display } from './Display';
import { Key } from './Key';
import { NumInput } from './NumInput';
import logo from '../gate_sentry_main_logo_400.png';

export const Calc = ({ loc }) => {
    const [input, setInput] = useState('');
    const [messageActive, setMessageActive] = useState(false);
    const [error, setError] = useState('');
    const addKey = key => {
        const handler = () => {
            if (error.length > 0) {
                setError('');
            }
            if (messageActive) {
                setMessageActive(false);
                setInput(key);
            } else {
                setInput(oldInput => {
                    if (oldInput.length < 8) {
                        return oldInput + key;
                    }

                    return oldInput;
                });
            }
        };
        return handler;
    };
    const setMessage = message => {
        setInput(message);
        setMessageActive(true);
    };
    const removeKey = () => {
        if (error.length > 0) {
            setError('');
        }
        if (messageActive) {
            setMessageActive(false);
            setInput('');
        } else {
            setInput(oldInput => oldInput.slice(0, -1));
        }
    };
    const submit = async () => {
        try {
            if (messageActive) {
                setMessageActive(false);
                setInput('');
                return;
            }
            if (input.length < 4) {
                if (input.length == 0) {
                    setMessage('Please Enter Code');
                } else {
                    setMessage('Invalid Code');
                }
            } else if (
                !window.location.href.includes('avE7daf82hnFGa21') ||
                window.location.href.split('avE7daf82hnFGa21')[1].length != 10
            ) {
                setMessage('Invalid QR Code');
            } else {
                setMessageActive(true);
                setMessage('Submitted');
                const keyRes = await axios.post(
                    'https://gatesentry-staging.herokuapp.com/solo',
                    {
                        code: input,
                        commId: window.location.href.split(
                            'avE7daf82hnFGa21'
                        )[1],
                    },
                    { timeout: 10000 }
                );
                if (keyRes.data.success) {
                    setMessage('Success');
                } else {
                    setMessage('Invalid Code');
                }
                console.log(keyRes);
            }
        } catch (err) {
            if (err.toJSON().message.split(' ')[0] == 'timeout') {
                setMessage('Relay Offline');
            } else {
                setMessage('Invalid Code');
            }
        }
    };
    return (
        <CalcContainer>
            <div id="calc">
                <Display current={input} messageActive={messageActive} />
                <div id="InputArea">
                    <NumInput addKey={addKey} />
                    <Key
                        val="Back"
                        classname="back"
                        handler={removeKey}
                        aria-label="Backspace"
                    />
                    <Key
                        classname="numKey"
                        key="0"
                        val="0"
                        handler={addKey('0')}
                    />
                    <Key
                        val="Open"
                        classname="submit"
                        aria-label="Submit"
                        handler={submit}
                    />
                </div>
            </div>
        </CalcContainer>
    );
};
const CalcContainer = styled.div`
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80%;
    margin-top: 1.2rem;
    margin-bottom: 4rem;
    box-sizing: border-box;
    position: fixed;
    bottom: 1rem;
    left: 1rem;
    right: 1rem;
    top: 6rem;

    #calc {
        width: 100%;
        max-width: 24rem;
        padding: 1rem;
        background: #c7c7c7;
        border-radius: 4px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        max-height: 35rem;
    }

    #InputArea {
        width: 100%;
        flex-grow: 1;
        max-width: var(--max-width);
        margin-top: 1rem;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-auto-rows: 1fr 1fr 1fr 1fr;
        grid-gap: 1em;
        height: 20rem;
        /* grid-template-areas:
            'num num num'
            'num num num'
            'num num num'
            'back num submit'; */
    }
`;
