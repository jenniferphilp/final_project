import React, { Component } from 'react';
import '../index_2.css';
import { Link } from 'react-router';
import Popup from 'react-popup';



class Home extends Component {

  constructor(props) {

    super(props);

    this.state = {
       student_name: " ",
       student_ID:" "
    }

    this.submitName=this.submitName.bind(this);
    this.handleChangeName=this.handleChangeName.bind(this);
    this.handleChangeID=this.handleChangeID.bind(this);
  }

 handleChangeName(e){
       this.setState({
             student_name:e.target.value,
          
       })

 }

handleChangeID(e){
this.setState({
      student_ID: e.target.value,
})
}

  

  submitName(e){
        e.preventDefault();
      Popup.alert('Please click a link to get started!');
      localStorage.setItem('student_name', JSON.stringify(this.state.student_name))
      localStorage.setItem('student_ID', this.state.student_ID)
   
   console.log(this.state.student_name);
      console.log(this.state.student_ID);

  }

render() {
 
        return (
      <div className="homeBody">
            <div className="App-header">
            
                  <h1 className="title">fun! game!</h1>
       
            </div>
          
             <ul className='nav'>
                  <li><h1><Link to="/literacy1">Literacy 1</Link></h1></li>
                  <li><h1><Link to="/literacy2">Literacy 2</Link></h1></li>
                  <li><h1><Link to="/numeracy1">Numeracy 1</Link></h1></li>
                  <li><h1><Link to="/numeracy2">Numeracy 2</Link></h1></li>
             </ul>
               
               <Popup
                  className="popup"
                   closeBtn={false}
                
            />

            <div className="inputForm">
            <form className="homePageInput" onSubmit={(e) => this.submitName(e)}>
                  <label><h4>Name: </h4></label><input type="text" className="inputSpellPicture" name="student_name" value={this.state.student_name} onChange={this.handleChangeName}></input>
                  <label><h4>ID: </h4></label><input type="text" className="inputSpellPicture" name="student_ID" value={this.state.student_ID} onChange={this.handleChangeID}></input>
           
                    <input type="submit" value="Submit" />
            </form>
            </div>
       
       
      </div>         
        )

      }
}


      export default Home; 


//       onChangeName(e){
//     this.setState({
//         student_name: e.target.value
//     })
//  }

// onChangeID(e){
//     let id = Number(e.target.value, 10);
//      console.log(id)
//   this.setState({
//         student_ID: id
//     })
//  }