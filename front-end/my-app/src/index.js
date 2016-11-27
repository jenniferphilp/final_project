import React from 'react';
import ReactDOM from 'react-dom';

import LitApp1 from './pages/app_literacy1';
import LitApp2 from './pages/app_literacy2';
import MathApp1 from './pages/app_math1';
import MathApp2 from './pages/app_math2';

import Home from './pages/home';


import { Router, Route, browserHistory } from 'react-router';
// import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import './index_2.css';





ReactDOM.render((

 <Router history={browserHistory} >

 
 <Route path="/" component={Home} />
    <Route path="/literacy1" component={LitApp1} />
    <Route path="/literacy2" component={LitApp2} />
    <Route path="/numeracy1" component={MathApp1} />
    <Route path="/numeracy2" component={MathApp2} />

 </Router>

), document.getElementById('root'));




