import React, { Component, useState, useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import 'normalize.css';
import axios from 'axios';
import { Display } from './components/Display';
import { Key } from './components/Key';
import { NumInput } from './components/NumInput';
import logo from './gate_sentry_main_logo_400.png';
import { Calc } from './components/Calc';

const App = () => {
    const [loc, setLoc] = useState(undefined);
    const [locPermissionStatus, setLocPermissionStatus] = useState('prompt');
    function getLocation() {
        console.log('trying to get location');
        navigator.permissions.query({ name: 'geolocation' }).then(res => {
            console.log(res.state);
            if (res.state != locPermissionStatus) {
                setLocPermissionStatus(res.state);
            }
        });
        if (navigator.geolocation) {
            const res = navigator.geolocation.getCurrentPosition(setLoc);
        } else {
            console.log('Geolocation is not supported by this browser.');
        }
    }
    useEffect(() => {
        console.log(loc);
        if (loc !== undefined) {
            setLocPermissionStatus('granted');
        }
    }, [loc]);
    // initially asks for then sets location
    useEffect(() => {
        navigator.permissions.query({ name: 'geolocation' }).then(res => {
            console.log(res.state);
            if (res.state != locPermissionStatus) {
                setLocPermissionStatus(res.state);
            }
        });
    }, []);
    return (
        <MainWrapper>
            <img id="logo" alt="Gate Sentry Visitor Management" src={logo} />
            {/* <ErrorStyle closed={error.length < 1}>{error}</ErrorStyle> */}
            {locPermissionStatus === 'prompt' && (
                <div id="locHandler">
                    Please confirm you are willing to share your location so we
                    can verify you are at the gate, you will not be able to use
                    the keypad otherwise.
                    <Key
                        classname="submit confirmLoc"
                        handler={() => {
                            console.log('ran');
                            getLocation();
                        }}
                        val="Confirm"
                    />
                </div>
            )}
            {locPermissionStatus === 'granted' && <Calc loc={loc} />}
            {locPermissionStatus === 'denied' && (
                <div id="locHandler">
                    If you see this message you have denied sharing your
                    location, please allow sharing location in your browser then
                    press the button below. Otherwise you will need to contact
                    the person you are visiting to open the gate.
                    <Key
                        classname="submit confirmLoc"
                        handler={() => {
                            getLocation();
                        }}
                        val="Confirm"
                    />
                </div>
            )}
        </MainWrapper>
    );
};

const MainWrapper = styled.main`
    box-sizing: border-box;
    grid-area: main;
    background: #fcfcfc;
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
    padding: 0 25px;
    #logo {
        max-width: 55vw;
        height: auto;
        margin-top: 3px;
    }
    #locHandler {
        margin-top: 2rem;
        width: 100%;
        max-width: 24rem;
        padding: 1rem;
        border: 3px solid #696969;
        background: #fff;
        border-radius: 4px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        max-height: 35rem;
        font-size: 1rem;
    }

    .submit {
        background: var(--confirm-color);
    }
    .back {
        background: var(--reject-color);
    }
    .confirmLoc {
        width: 35%;
        margin: 0 auto;
        margin-top: 1rem;
        padding: 0.5rem;
        cursor: pointer;
        :hover {
            background: white;
        }
    }
`;

const ErrorStyle = styled.h3`
    display: ${props => (props.closed ? 'none' : 'block')};
    color: red;
    font-size: 2.5rem;
    height: 2.5rem;
`;

ReactDOM.render(<App />, document.getElementById('root'));
// display
// input
// button
