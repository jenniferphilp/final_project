import React, { Component } from 'react';
import '../index_2.css';
import { Link } from 'react-router';

//notes: use react-router to go from main page to both apps -- literacy, numeracy. 

import baby from '../img/baby.png';
import car from '../img/car.png';
import mouse from '../img/mouse.png';
import computer from '../img/computer.png';
import bear from '../img/bear.png';
import cat from '../img/cat.png';
import dog from '../img/dog.png';
import ball from '../img/ball.png';
import bed from '../img/bed.png';
import bat from '../img/bat.png';
// const images = ['./img/baby.png', './img/car.png','./img/mouse.jpg','./img/computer.png'];

const images = [baby, car, mouse, computer, bear, cat, dog, ball, bed, bat]


class App extends Component {

  
  constructor(props) {
    super(props);



    this.state = {
        images:this.props.images,
        randomImageIndex:0,
        newText:"start",
        imageText:["baby", "car", "mouse", "computer", "bear", "cat", "dog", "ball", "bed", "bat"],
        correct:false,
        score:0,
        negativeScore:0,
        spacesForHint: [],
        numberOfAttempts: 0
   

  };

    this.generateRandomNumber=this.generateRandomNumber.bind(this);
    this.checkSpelling=this.checkSpelling.bind(this);
    this.handleTextChange=this.handleTextChange.bind(this);
    this.resetScore=this.resetScore.bind(this);
    this.createHint=this.createHint.bind(this);


  };
generateRandomNumber (randomNumber) {
   
   this.createHint();

   randomNumber = Math.floor((Math.random() * 10));

        this.setState({
          randomImageIndex:randomNumber,
          negativeScore:0
         })

     if (this.state.correct){
          this.setState({
          correct:false
        })
      
    }


  }
 


    createHint (){
   
        const numberOfSpaces = (this.state.imageText[this.state.randomImageIndex].length) - 1; 
        let spaces = []; 
        for (let i = 0; i < numberOfSpaces; i++){
        spaces.push(" _ ");
        }

        this.setState({
            spacesForHint:spaces
        })

    }
  

handleTextChange(e){
  let submittedText = e.target.value
  let submittedTextLowerCase = submittedText.toLowerCase();
	  this.setState({newText:submittedTextLowerCase})
}

  
  checkSpelling(e) {
      this.createHint();

    e.preventDefault();
    if (this.state.newText === this.state.imageText[this.state.randomImageIndex]) {
    this.setState({
      correct:true,
      score:this.state.score + 1, 
      newText:this.state.newText,
      spacesForHint:this.state.spacesForHint,
      numberOfAttempts: this.state.numberOfAttempts+1
   
  })


}
  else if (this.state.newText !== this.state.imageText[this.state.randomImageIndex]){
    this.setState({
      correct:false,
      newText:"",
      negativeScore:this.state.negativeScore - 1,
      numberOfAttempts: this.state.numberOfAttempts+1


   
    })
  }
}

resetScore(e){
  e.preventDefault();
  this.setState({
    score: 0,
    correct:false,
    negativeScore:0
  })
}

  render() {
  let hint = this.state.imageText[this.state.randomImageIndex];
  let hintFirstLetter = (hint.charAt(0));



   

      return (
  
      <div className="App">
        
        <div className="App-header">
            
            <h1 className="title">This is the title</h1>
             <button className="homeButton" type="button"> <Link to="/">Home</Link></button>
       
         </div>
          
       <PhotoBox
          generateRandomNumber={this.generateRandomNumber}
          images={this.props.images}
          randomImageIndex={this.state.randomImageIndex}
        />

        <SpellingChecker
          handleTextChange={this.handleTextChange}
          checkSpelling={this.checkSpelling}
        />

        <ScoreCard
          resetScore={this.resetScore}
          correct={this.state.correct}
          newText={this.state.newText}
          score={this.state.score}
          numberOfAttempts={this.state.numberOfAttempts}
         />

         <HintBox
         showHint={this.state.negativeScore <= -4 ? "showHint":"hideHint"}
         spacesForHint={this.state.spacesForHint}
         hintFirstLetter={hintFirstLetter}
         />

        
            <div className="col-lg-6 col-md-6 col-sm-1 col-xs-1 outerBox">
          
          
          
            </div>
            <div className="col-lg-6 col-md-6 col-sm-1 col-xs-1 outerBox">
          
          
          
            </div>
          
       
          </div>
  )};
}
  
class PhotoBox extends Component {

   render() {
      return (
         <div className="photoBox col-lg-3 col-md-3 col-sm-6 col-xs-12">
         <button className="btn btn-lrg btn-primary changePictureButton" type="button" onClick={this.props.generateRandomNumber}>Click here to change picture!</button>
           <img id="photoLiteracy" role="presentation" src={images[this.props.randomImageIndex]} />
        </div>
     )
   }
 }

class SpellingChecker extends Component{
  render() {
    return(
    <div className="spellingChecker col-lg-3 col-md-3 col-sm-6 col-xs-12">
          <form onSubmit={this.props.checkSpelling}>
              <h1>Spell the word in the picture:</h1><br></br>
              <input type="text"  autoComplete="off" name="spellPicture" className="inputSpellPicture" onChange={this.props.handleTextChange}/>
              <button className="btn btn-lrg btn-primary submitAnswerButton"  type="submit" >Click to check your spelling</button>         
          </form>  
    </div>

    )
  }
}

   class ScoreCard extends Component {
     render(){
       return(
       <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 outerBox">
            <div className="scoreCard">
               <h3 className="success">{this.props.correct && this.props.newText !== "" ? "Success!":null}</h3>
               <h3 className="keepTrying">{!this.props.correct && this.props.newText ==="" ? "Keep Trying!":null}</h3>
               <h3 className="score">Number Correct: {this.props.score}</h3>
              <h3 className="score">Number of Attempts: {this.props.numberOfAttempts}</h3>
            </div>
          <button className="btn btn-lrg btn-primary resetButton"  type="submit" onClick={(e) =>this.props.resetScore(e)}>Click to reset Score</button> 
      </div>
)}}


class HintBox extends Component {
  render(){

    
  
  return(
        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 outerBox">
              <div className={this.props.showHint}>
                  <h1>Here's a Hint: <br></br></h1>
                  <h1 className="flashingLetter">{this.props.hintFirstLetter}
                  {this.props.spacesForHint}</h1>      
                </div>
              </div>


  )}}

export default App;



