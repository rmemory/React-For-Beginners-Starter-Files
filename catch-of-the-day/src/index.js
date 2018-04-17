/* 
 * Import the base react module. See package.json
 * for the react version used. 
 * 
 * Could also do this,
 * 
 * import React, {Component} from 'react';
 */
import React from 'react';

/* The react-dom module is what connects us to a web
   page, as opposed to a mobile (native) app */
import {render} from 'react-dom';
import StorePicker from './components/StorePicker.js';

/* Main mounting point. See public/index.html */
render(<StorePicker/>, document.querySelector('#main'));
