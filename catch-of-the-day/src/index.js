import React from 'react';
import {render} from 'react-dom';

/* At the moment, this causes a not used warning because its not used
   but it soon will be, so its left in as-is */
import StorePicker from './components/StorePicker.js';
import "./css/style.css";
import App from './components/App.js';

/* Main mounting point. See public/index.html */
render(<App/>, document.querySelector('#main'));
