import React, { Component } from 'react';
import '../index_2.css';
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
     
            <div className="App">

               <div className="App-header">
            
                  <h1 className="title">fun! game!</h1>
       
            </div>

            {this.props.children}
               
                   <Popup
                  className="popup"
                   closeBtn={false}
                
                  />
             

            <div className="inputForm">
            <form onSubmit={(e) => this.submitName(e)}>

                  <label for="student_name"><h3>Name: </h3>
                          <input type="text" className="textAreaHome" name="student_name" placeholder="name" value={this.state.student_name} onChange={this.handleChangeName}></input>
                  
                  </label>
                  
                  <label for="student_ID"><h3>Student ID: </h3>
                        <input type="text" className="textAreaHome" name="student_ID" value={this.state.student_ID} onChange={this.handleChangeID}></input>
                  
                  </label>     
                  
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