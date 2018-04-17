import React from 'react';
import {render} from 'react-dom';
import StorePicker from './components/StorePicker.js';
import "./css/style.css";
import App from './components/App.js';

/* Main mounting point. See public/index.html */
render(<App/>, document.querySelector('#main'));
