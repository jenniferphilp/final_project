import React from 'react';
import ReactDOM from 'react-dom';

import LitApp1 from './pages/app_literacy1';
import LitApp2 from './pages/app_literacy2';
import MathApp1 from './pages/app_math1';
import MathApp2 from './pages/app_math2';

import DataPage from './pages/data_page';
import About from './pages/about';


import Home from './pages/home';


import { Router, Route, browserHistory } from 'react-router';
// import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import './index_2.css';



// use react router to have home page nav displayed on every page. Move log in info to it's own component:Log IN

ReactDOM.render((

 <Router history={browserHistory} >

  


    <Route path="/" component={Home} />
        <Route path="/literacy1" component={LitApp1} />
        <Route path="/literacy2" component={LitApp2} />
        <Route path="/numeracy1" component={MathApp1} />
        <Route path="/numeracy2" component={MathApp2} />
          <Route path="/dataPage" component={DataPage} />
            <Route path="/about" component={About} />
    

 </Router>

), document.getElementById('root'));




