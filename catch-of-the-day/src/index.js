import React from 'react';
import {render} from 'react-dom';
import Router from './components/Router.js';
import "./css/style.css";

/* Main mounting point. See public/index.html */
render(<Router/>, document.querySelector('#main'));
