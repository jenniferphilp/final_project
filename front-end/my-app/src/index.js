import React from 'react';
import ReactDOM from 'react-dom';

import LitApp1 from './pages/app_literacy1';
import LitApp2 from './pages/app_literacy2';
import MathApp1 from './pages/app_math1';
import MathApp2 from './pages/app_math2';
import DataPage from './pages/data_page';
import About from './pages/about';
import NavBar from './pages/nav_bar';
import Home from './pages/home';


import { Router, Route, browserHistory } from 'react-router';
// import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import './index_2.css';




   // want NavBar to appear on every page


ReactDOM.render((

 <Router history={browserHistory} >
    <Route component={Home}>
        <Route path="/" component={NavBar} />
    </Route>

    <Route component={About}>
      <Route path="/about" component={NavBar} />
    </Route>

    <Route component={DataPage}>
      <Route path="/data" component={NavBar} />
    </Route>

    <Route component={LitApp1}>
      <Route path="/literacy1" component={NavBar} />
    </Route>


    <Route component={LitApp2}>
      <Route path="/literacy2" component={NavBar} />
    </Route>

    <Route component={MathApp1}>
      <Route path="/numeracy1" component={NavBar} />
    </Route>


    <Route component={MathApp2}>
      <Route path="/numeracy2" component={NavBar} />
    </Route>

 </Router>

), document.getElementById('root'));






 