import React, { Component } from 'react';
import '../index_2.css';
import { Link } from 'react-router';
import axios from 'axios';

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

const imageSounds = ['/AUDIO/baby.mp3', '/AUDIO/car.mp3','/AUDIO/mouse.mp3','AUDIO/computer.mp3','AUDIO/bear.mp3','AUDIO/cat.mp3','AUDIO/dog.mp3','AUDIO/ball.mp3','AUDIO/bed.mp3','AUDIO/bat.mp3'];


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
        numberOfAttempts: 0,
        totalTime:0,
        student_name:JSON.parse(localStorage.getItem('student_name')),
        student_ID:localStorage.getItem('student_ID')
   

  };

    this.generateRandomNumber=this.generateRandomNumber.bind(this);
    this.checkSpelling=this.checkSpelling.bind(this);
    this.handleTextChange=this.handleTextChange.bind(this);
    this.createHint=this.createHint.bind(this);
    this.handleSave=this.handleSave.bind(this);
    
    this.tick=this.tick.bind(this);
    this.pause=this.pause.bind(this);
    this.playTimer=this.playTimer.bind(this);
    this.playSong=this.playSong.bind(this);
    this.playInstruction=this.playInstruction.bind(this);

  };

componentDidMount(){
    this.playTimer();
    this.generateRandomNumber();
   
}

componentWillUnmount(){
      clearInterval(this.timer);
}

//play Instruction
  playInstruction(e, ref){
    e.preventDefault();
      const player2 = ref;
        player2.play();
  
}
//play image description
  playSong(e, ref){
    e.preventDefault();
      console.log(imageSounds[this.state.randomImageIndex]);
        const player = ref;
        player.play();
  
}


generateRandomNumber (randomNumber) {
   
   this.createHint();

   randomNumber = Math.floor((Math.random() * 10));

        this.setState({
          randomImageIndex:randomNumber,
          negativeScore:0,
        
         })

  }
 

//hint is created; only displayed once negative score = -4
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
  
//handles upper and lower case submissions
handleTextChange(e){
  e.preventDefault();
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
      // newText:" ",
      // newText:this.state.newText,
      spacesForHint:this.state.spacesForHint,
      numberOfAttempts: this.state.numberOfAttempts+1,

   
  })

  this.generateRandomNumber();


}
  else if (this.state.newText !== this.state.imageText[this.state.randomImageIndex]){
    this.setState({
      correct:false,
      // newText:" ",
      negativeScore:this.state.negativeScore - 1,
      numberOfAttempts: this.state.numberOfAttempts+1


   
    })
  }
}

//problem of student saving over and over... put setTimeOut on handleSave
handleSave(e){
e.preventDefault();

// http://35.163.164.137

axios.post('http://35.163.164.137/api/scores/', {
    // student_ID: this.state.student_ID,
  //this is saved from home page using cookies
    //
    //created at: need timestamp
    student_ID:this.state.student_ID,
    gameType: "Literacy 2",
    percent:((this.state.score)/(this.state.numberOfAttempts)*100),
    correct:this.state.score,
    attempts:this.state.numberOfAttempts,
    totalTime: this.state.totalTime
    })

  .then(function (response) {
    console.log(response);
    alert('Saved!')
  })
  .catch(function (error) {
    console.log(error);
    alert('You have an error! Please see your teacher')
  });

  //handles "reset" of timer and score, attempts. 
  this.setState({
        correct:false,
        score:0,
        negativeScore:0,
        numberOfAttempts:0,
        totalTime:0
 
  })
}

playTimer(tick){
    // e.preventDefault();
     this.timer = setInterval(this.tick, 1000);
}

  
 pause(e){
     e.preventDefault();
    clearInterval(this.timer);
     console.log('paused')
           
    }

tick() {
    this.setState({
   
        totalTime: this.state.totalTime + 1,
    })
}




  render() {
  let hint = this.state.imageText[this.state.randomImageIndex];
  let hintFirstLetter = (hint.charAt(0));


      return (
  
      <div className="App">
        
       <div className="App-header">
            
            <h1 className="title">Welcome {this.state.student_name}!</h1>
            
  
        </div>

        {this.props.children}
          
      <div className="container">

        <PhotoBox
        
          images={this.props.images}
          randomImageIndex={this.state.randomImageIndex}
          imageSounds={this.props.imageSounds}
          playSong={this.playSong}
          imageText={this.state.imageText}

        />

        <SpellingChecker
          handleTextChange={this.handleTextChange}
          checkSpelling={this.checkSpelling}
          showHint={this.state.negativeScore <= -4 ? " ":"hideHint"}
         spacesForHint={this.state.spacesForHint}
         hintFirstLetter={hintFirstLetter}
         playInstruction={this.playInstruction}
        

        />

    </div> 

          <ScoreCard
          resetScore={this.resetScore}
          correct={this.state.correct}
          newText={this.state.newText}
          score={this.state.score}
          numberOfAttempts={this.state.numberOfAttempts}
         />

      <ControlPanel
            generateRandomNumber={this.generateRandomNumber}
            totalTime={this.state.totalTime}
            pause={this.pause}     
            play={this.play}
            checkSpelling={this.checkSpelling}
            handleSave={this.handleSave}
       />

        
       
          </div>
  )};
}
  
class PhotoBox extends Component {

   render() {
      return (
        <div> 
            <div className="smallBox1">
                <img alt={this.props.imageText[this.props.randomImageIndex]} id="photoLiteracy" role="presentation" src={images[this.props.randomImageIndex]} />
            </div>
            <audio ref="player" src={imageSounds[this.props.randomImageIndex]}></audio>
               <button onClick={(e) => this.props.playSong(e, this.refs.player)} className="audioButton">
                  <span className="glyphicon glyphicon-volume-up"></span>
              </button>
        </div>      
     )
   }
 } 

class SpellingChecker extends Component{
  render() {
    return(
    <div className="smallBox1">
        
              <h1 className="instructions">Spell the word:</h1>    
              <audio ref='player2' src='/AUDIO/spelltheword.mp3'></audio>
               <button onClick={(e) => this.props.playInstruction(e, this.refs.player2)} className="audioButton">
                    <span className="glyphicon glyphicon-volume-up litTwoAudio"></span>
              </button> 

  
              <input type="text"  autoComplete="off" name="spellPicture" value={this.props.newText} className="inputSpellPicture" onChange={(e) => this.props.handleTextChange(e)}/>
                
          
           
          <div className="fadeIn">
              <div className={this.props.showHint}>
                  <h1 className="hint">Here's a Hint: <br></br>
                    {this.props.hintFirstLetter}
                    {this.props.spacesForHint}</h1>      
                </div>
           </div>

    </div>

    )
  }
}

   class ScoreCard extends Component {
     render(){
       return(
       <div className="smallBox1withBorderLit2">
     
               <h3 className="success">{this.props.correct ? "Success!":"Keep Trying"}</h3>
               <h3 className="score">Number Correct: {this.props.score}</h3>
              <h3 className="score">Number of Attempts: {this.props.numberOfAttempts}</h3>
           
          
      </div>
)}}



class ControlPanel extends Component {

render(){

    return (
       
    <div>

         <div className="controlPanel">

                <div className="buttonsContainer col-lg-4 col-md-12 col-sm-12 col-xs-12">
                    <button className="btn-circle" type="button" onClick={this.props.generateRandomNumber}>Change</button>
                     <button className="btn-circle" type="button" onClick={(e)=> this.props.handleSave(e)}>Save</button>
                    
                </div>
         
                <div className="timerContainer col-lg-4 col-md-12 col-sm-12 col-xs-12">
                     <div className="tinyTimer">
                        <h4>Total Time:  {this.props.totalTime} seconds</h4>
                        <button onClick={(e)=>this.props.playTimer(e)}><span className="glyphicon glyphicon-play"></span></button>
                        <button onClick={(e)=>this.props.pause(e)}><span className="glyphicon glyphicon-pause"></span></button>
                    </div>
                </div>

                <div className="buttonsContainer col-lg-4 col-md-12 col-sm-12 col-xs-12">   
                    <button className="btn-circle" type="button" onClick={(e)=> this.props.checkSpelling(e)}>Submit</button>
                    <button className="btn-circle" type="button"><Link to="/">Home</Link></button>
                </div>

         
         
         </div>

    </div>

    )
}
}



export default App;



