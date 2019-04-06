import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Header from './common/header/Header';

/*Rendering Login component as home page*/ 
ReactDOM.render(<Header />, document.getElementById('root'));
registerServiceWorker();