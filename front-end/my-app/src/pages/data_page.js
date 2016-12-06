import React, { Component } from 'react';
import '../index_2.css';
import { Link } from 'react-router';
import axios from 'axios';


class DataPage extends Component {

  
  constructor(props) {
    super(props);


    this.state={
        data:[],
        newID:" "
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

if (this.state.newID === " "){
  alert("please enter a valid student ID")
}

let search=this.state.newID;
axios.get('http://localhost:8080/api/scores/'+search).then((response)=> {
      // console.log(response.data);
      
      this.setState({
        data: response.data
      })
    })
    .catch((error) => {
      console.log(error);
    })
  
  };

render() {

 
let dataArray=this.state.data.map((item, index)=> {
    return(<div className="smallBox1withBorderLit2" key={index}>
           <h3>Date: {this.state.data[index].createdAt.slice(0,10)}</h3><br></br>
            Percent: {this.state.data[index].percent}%<br></br>
            Number Correct: {this.state.data[index].correct}<br></br>
            Number Attempted: {this.state.data[index].attempts}<br></br>
            Total Time on Task: {this.state.data[index].totalTime} seconds
  </div>  
    )}

)

    return (
    <div>
  
              <div className="smallBox1withBorderLit2">
  
            <form onSubmit={(e)=>this.displayTwo(e)}>
                <h1>Enter student ID to display all scores: </h1>
                <input type="submit" value="Submit" className="btn" />
                <input type="text"  autoComplete="off" className="inputSpellPicture" onChange={(e)=>this.handleChange(e)} />
            </form>
        
        </div>
      

          {dataArray}



        </div>
        )}
    

}


export default DataPage;


