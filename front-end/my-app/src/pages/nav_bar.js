import React, { Component } from 'react';
import '../index_2.css';
import { Link } from 'react-router';




class NavBar extends Component {



render() {
 
return (
     <div>
        
             <ul className='nav'>
                  <li ><h1 className='navFont'><Link to="/literacy1">Literacy 1</Link></h1></li>
                  <li ><h1 className='navFont'><Link to="/literacy2">Literacy 2</Link></h1></li>
                  <li ><h1 className='navFont'><Link to="/numeracy1">Numeracy 1</Link></h1></li>
                  <li ><h1 className='navFont'><Link to="/numeracy2">Numeracy 2</Link></h1></li>
                  <li ><h1 className='navFont'><Link to="/about">About</Link></h1></li>
                  <li ><h1 className='navFont'><Link to="/data">Data</Link></h1></li>
             </ul>
               
  
      </div>         
        )

      }
}

export default NavBar; 


