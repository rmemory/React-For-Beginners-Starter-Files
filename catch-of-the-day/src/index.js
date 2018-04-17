import React from 'react';
import {render} from 'react-dom';
import StorePicker from './components/StorePicker.js';
import "./css/style.css";

/* Main mounting point. See public/index.html */
render(<StorePicker/>, document.querySelector('#main'));
