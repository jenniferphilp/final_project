import React, { Component } from 'react';
import '../index_2.css';
import axios from 'axios';


class DataPage extends Component {

  
  constructor(props) {
    super(props);


    this.state={
        data:[],
        newID:" ",
        name:" "
         };


this.displayTwo=this.displayTwo.bind(this);
this.handleChange=this.handleChange.bind(this);

   };



//all student_name values in Mongo entered in lowercase
handleChange(e) {
  let submittedText = e.target.value;

	  this.setState({
          newID:submittedText
        })
}



// axios.get('http://35.163.164.137/api/scores/', {
displayTwo(e){
//write a get endpoint that displays all data for one student ID. 
      e.preventDefault();

      let search=this.state.newID;
      axios.get('http://35.163.164.137/api/scores/'+search).then((response)=> {
            console.log(response.data);
            this.setState({
              data: response.data
            })
        
        })

          .catch((error) => {
            console.log(error);
          })
//gets the name of the student from Users table so it can be displayed 
          axios.get('http://35.163.164.137/api/users/'+search).then((nameResponse)=>{
              console.log(nameResponse.data);
              this.setState({
                name:nameResponse.data
              })
          })
          
           .catch((error) => {
            console.log(error);
          })
      
        };


render() {
let student_name=this.state.name[0].student_name;

let dataArray=this.state.data.map((item, index)=> {
    return(<div className="smallBoxDataPage" key={index}>
           <h3>Date: {this.state.data[index].createdAt.slice(0,10)}</h3><br></br>
            Time: {this.state.data[index].createdAt.slice(11, 13)}:{this.state.data[index].createdAt.slice(14,16)}<br></br>
            Student ID: {this.state.data[index].student_ID}<br></br>
            Game Type: {this.state.data[index].gameType}<br></br>
            Percent: {this.state.data[index].percent}%<br></br>
            Number Correct: {this.state.data[index].correct}<br></br>
            Number Attempted: {this.state.data[index].attempts}<br></br>
            Total Time on Task: {this.state.data[index].totalTime} seconds
  </div>  
    )}

)

    return (
       <div className="App">

            <div className="App-header">
            
                  <h1 className="title">fun! game!</h1>
       
            </div>

            {this.props.children}
  
            <div className="smallBoxDataPage">
  
                  <form onSubmit={(e)=>this.displayTwo(e)}>
                      <h1>Enter student ID to display scores: </h1>
                      
                      <input type="text"  autoComplete="off" className="inputSpellPicture" onChange={(e)=>this.handleChange(e)} />

                      <input type="submit" value="Submit" className="btn" />

                       <h2 className="nameDataPage">Data For: {student_name}</h2><br></br>
                  </form>
        
            </div>
          
         

          {dataArray}



        </div>
        )}
    

}


export default DataPage;


