import React, { Component } from 'react';
import '../index_2.css';
import { Link } from 'react-router';


class Home extends Component {

      render() {

        return (
<div>
        <div className="App-header">
            
            <h1 className="title">This is not a title</h1>
       
         </div>

      <h1><Link to="/literacy1">Literacy - level 1</Link></h1>
      <h1><Link to="/literacy2">Literacy - level 2</Link></h1>
      <h1><Link to="/numeracy1">Numeracy - level 1</Link></h1>
      <h1><Link to="/numeracy2">Numeracy - level 2</Link></h1>
</div>         
        )

      }
}


      export default Home; 