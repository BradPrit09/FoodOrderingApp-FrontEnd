import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Header from './common/header/Header';
import Home from './screens/home/Home';

/*Rendering Login component as home page*/ 
ReactDOM.render(<Home />, document.getElementById('root'));
registerServiceWorker();