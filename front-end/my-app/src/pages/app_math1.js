import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';

import '../index_2.css';

//notes: use react-router to go from main page to both apps -- literacy, numeracy. 

//need HOME button
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

const images = [baby, car, mouse, computer, bear, cat, dog, ball, bed, bat];


class MathApp extends Component {

constructor(props) {

super(props);
    this.state = {
        images:this.props.images,
        arrayOfRandomPhotos:[],
        answer:0,
        submittedAnswer:0,
        itemName:" ",
        imageText:["baby", "car", "mouse", "computer", "bear", "cat", "dog", "ball", "bed", "bat"],
        correct:false,
        score:0,
        negativeScore:0,
        attempts:0,
        totalTime:0,
        student_name:JSON.parse(localStorage.getItem('student_name')),
        student_ID:localStorage.getItem('student_ID')


    };

    this.generateRandomPicture=this.generateRandomPicture.bind(this);
    this.clearPhotos=this.clearPhotos.bind(this);
    this.handleAnswer=this.handleAnswer.bind(this);
    this.checkAnswer=this.checkAnswer.bind(this);

    this.tick=this.tick.bind(this);
    this.pause=this.pause.bind(this);
    this.play=this.play.bind(this);
    this.handleSave=this.handleSave.bind(this);
};

//timer
componentDidMount(){
    this.play();
 
}

componentWillUnmount(){
      clearInterval(this.timer);
}


play(tick){
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

//problem of student saving over and over... put setTimeOut on handleSave
handleSave(e){
e.preventDefault();

// http://35.163.164.137

axios.post('http://localhost:8080/api/scores/', {
    // student_ID: this.state.student_ID (from local storage)

    student_ID: this.state.student_ID,
    gameType: "Numeracy 1",
    percent:((this.state.score)/(this.state.attempts)*100),
    correct:this.state.score,
    attempts:this.state.attempts,
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
        attempts:0,
        totalTime:0
 
  })
}

componentWillMount(){
    this.generateRandomPicture();
}




generateRandomPicture(){
this.clearPhotos();

//generate a random number for the image index
let randomNumber1 = Math.floor((Math.random() * 10));

//2nd random number will be the number of items displayed --> this will change state of answer
let randomNumber2 = Math.floor((Math.random() * 9)) + 1;

  let _arrayOfRandomPhotos=[];
    for (let i = 0; i < randomNumber2; i++){
        _arrayOfRandomPhotos.push(<img id="smallPhotoMath" key={i} role="presentation" src={images[randomNumber1]} />)
        
    }

 this.setState({
       arrayOfRandomPhotos:_arrayOfRandomPhotos,
        answer:randomNumber2,
        itemName:this.state.imageText[randomNumber1]
    })

    console.log("random number:" + randomNumber2)
}



clearPhotos(){
    this.setState({
        arrayOfRandomPhotos:[]
    })
}


handleAnswer(e){
    //handles text in input 
   let submitted = e.target.value;
   console.log("e.target.value" + e.target.value)
        this.setState({
            submittedAnswer:submitted
})
} //this doesn't work... e.target.value not recognized by form???' must do this with 2 methods. .... 
 

checkAnswer(e){
    e.preventDefault();
let submitted = this.state.submittedAnswer;
let answer = this.state.answer;

    if (submitted == answer){
            this.setState({
                correct:true,
                score:this.state.score + 1,
                attempts: this.state.attempts+1
            })

            this.generateRandomPicture();
        }
        else {
            this.setState({
            correct:false,    
            negativeScore:this.state.negativeScore-1,
            attempts: this.state.attempts+1
    })
    }
}


//play instruction

playSong(e, ref){
    e.preventDefault();
        const player = ref;
        player.play();
  
}



render() {

 

        return (
  
        <div className="App">
             <div className="App-header">
            
                <h1 className="title">Welcome {this.state.student_name}!</h1>
            
  
            </div>

            {this.props.children}

               <div className="containerMath">
                 <InputBox
                    itemName={this.state.itemName}
                    handleAnswer={this.handleAnswer}
                    playSong={this.playSong}

                    />
                    <Photos
                    arrayOfRandomPhotos={this.state.arrayOfRandomPhotos}
                    />

                  

                </div>

                <ScoreCard
                    score={this.state.score}
                    attempts={this.state.attempts}
                    correct={this.state.correct} 
                />

                <ControlPanel
                    generateRandomPicture={this.generateRandomPicture}
                    totalTime={this.state.totalTime}
                    checkAnswer={this.checkAnswer}
                    pause={this.pause}     
                    play={this.play}
                    submitLetter={this.submitLetter}
                    handleSave={this.handleSave}
                />

          </div>
  )};
}

class InputBox extends Component{
    render (){
        return(
                <div className="inputBoxMath1">
                    <h1 className="instructions">Count each {this.props.itemName}!</h1>
                    <input type="number"  autoComplete="off" className="inputSpellPicture" onChange={this.props.handleAnswer}/>
                <audio ref="player" src='/AUDIO/howmany.mp3'></audio>
                    <button onClick={(e) => this.props.playSong(e, this.refs.player)} className="audioButton">
                        <span className="glyphicon glyphicon-volume-up"></span>
                    </button>
                </div>

        )
    }
}

class ScoreCard extends Component{
    render(){
        return(
           <div className="smallBox1withBorder">
                <h3>Number Correct: {this.props.score}</h3>
                <h3>Number of Attempts: {this.props.attempts}</h3>
                <h3 className="success">{this.props.correct ? "Success! Awesome!":"Keep trying"}</h3>
            </div>
        )
    }
}










class Photos extends Component {
render(){
    return(
                <div className="bigBoxMath1">
                    {this.props.arrayOfRandomPhotos}
                 </div>
    )
}
}

class ControlPanel extends Component {

render(){

    return (
       
    <div>

         <div className="controlPanel">

                <div className="buttonsContainer col-lg-4 col-md-12 col-sm-12 col-xs-12">
                    <button className="btn-circle" type="button" onClick={this.props.generateRandomPicture}>Change</button>
                     <button className="btn-circle" type="button" onClick={(e)=> this.props.handleSave(e)}>Save</button>
                    
                </div>
         
                <div className="timerContainer col-lg-4 col-md-12 col-sm-12 col-xs-12">
                     <div className="tinyTimer">
                        <h4>Total Time:  {this.props.totalTime} seconds</h4>
                        <button onClick={(e)=>this.props.play(e)}><span className="glyphicon glyphicon-play"></span></button>
                        <button onClick={(e)=>this.props.pause(e)}><span className="glyphicon glyphicon-pause"></span></button>
                    </div>
                </div>

                <div className="buttonsContainer col-lg-4 col-md-12 col-sm-12 col-xs-12">
                    <button className="btn-circle" type="button" onClick={(e) => this.props.checkAnswer(e)}>Submit</button>
                    <button className="btn-circle" type="button"><Link to="/">Home</Link></button>
                </div>

         
         
         </div>

    </div>
    )}
}

export default MathApp;



