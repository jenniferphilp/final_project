import React, { Component } from 'react';
import '../index_2.css';
import { Link } from 'react-router';
import axios from 'axios';

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
        imageSounds:this.props.imageSounds,
        randomImageIndex:0,
        //10 possible pictures
        imageText:["baby", "car", "mouse", "computer", "bear", "cat", "dog", "ball", "bed", "bat"],
        //8 spaces for hints
        arrayRandomIndex:[],
        selected:[false, false, false, false, false, false, false, false],
        correct:false,
        selectedLetter: " ",
        score:0,
        negativeScore:0,
        numberOfAttempts:0,
        totalTime:null,
        student_name:JSON.parse(localStorage.getItem('student_name')),
        //JSON.parse --> change from string to an object
        student_ID:localStorage.getItem('student_ID')
     
 };

    this.generateRandomNumber=this.generateRandomNumber.bind(this);
    this.selectLetterBox=this.selectLetterBox.bind(this);
    this.randomize=this.randomize.bind(this);
    this.submitLetter=this.submitLetter.bind(this);
    
    this.tick=this.tick.bind(this);
    this.pause=this.pause.bind(this);
    this.playTimer=this.playTimer.bind(this);
    
    this.handleSave=this.handleSave.bind(this);
    this.playSong=this.playSong.bind(this);
   
};


//problem of student saving over and over... put setTimeOut on handleSave
handleSave(e){
e.preventDefault();

//CHANGE BACK TO HOSTED SITE BEFORE DEPLOYMENT
axios.post('http://localhost:8080/api/scores/', {
    // student_ID: this.state.student_ID,
  //this is saved from home page using local storage
    //
    student_ID: this.state.student_ID,
    gameType: "Literacy 1",
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






componentDidMount(){
    this.playTimer();
}

componentWillUnmount(){
      clearInterval(this.timer);
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





//handles "change picture button"
//calls randomize function for pictures

generateRandomNumber (randomNumber) {


this.randomize();
//creates random number between 0 and 9; becomes the image index
   randomNumber = Math.floor((Math.random() * 10));

        this.setState({
          randomImageIndex:randomNumber,
          negativeScore:0,
          selectedLetter:" "
      
         
        })
    this.setState({
        // 8 spaces for letter hints; resets any selected divs to false
        selected:[false,false,false,false,false,false,false,false]
    
    })
}

componentWillMount(){
    this.randomize ();
   
}


//need ONLY the letterBox selected to true; all else need to be false
selectLetterBox(index){
   
let trueArray = [];
let _selected = this.state.selected;
for (let j=0; j < _selected.length; j++){
    if (j === index){
        _selected[j]=true;
    }
    else{
        _selected[j]=false;
    }

    trueArray.push(_selected[j])
    
}

this.setState({
    selected:trueArray
})

  

//displayed image text
let fullHint= this.state.imageText[this.state.randomImageIndex];
//arrayLetters === all the possible letter options for hints 
let arrayLetters = [fullHint.charAt(0), "s", "f", "n", "t", "r", "z", "a"]
    
    this.setState({
            selectedLetter: arrayLetters[this.state.arrayRandomIndex[index]]
    })

}

//handles whether selected letter is correct
submitLetter(e){
    e.preventDefault();
   let currentImage = this.state.imageText[this.state.randomImageIndex];


if (this.state.selectedLetter === currentImage.charAt(0)){
    this.setState({
        correct:true,
        score:this.state.score + 1,
        numberOfAttempts:this.state.numberOfAttempts + 1
    })

        //if attempt is correct, reset picture. Message in scoreboard should be "success"
        this.generateRandomNumber();
}
    else if (this.state.selectedLetter !== currentImage.charAt(0)){
        this.setState({
            negativeScore:this.state.negativeScore - 1,
            correct:false,
            numberOfAttempts:this.state.numberOfAttempts + 1
        })
        
    }

}

randomize(){
    //creates an array of 8 hint letters; includes the correct letter
    let _arrayRandomIndex = [];

    //creates an array of 8 (# of spaces) random numbers between 0 and 7 (# of possible letter options)
    for (let i = 0; i <8; i++) {
        //creates random numbers between 0 and 7
        let randomNumber = Math.floor((Math.random() * 8));

            _arrayRandomIndex.push(randomNumber);
         
        }

       if(_arrayRandomIndex.includes(0)){
            this.setState({
            arrayRandomIndex:_arrayRandomIndex
        })
       }
       //need this in the instance that a 0 (correct letter index) is not selected. if a 0 isn't in the array, 
       //splice will add a 0 at index of 2, removing 1 item. 
       else {
           _arrayRandomIndex.splice(2, 1, 0);
            this.setState({
            arrayRandomIndex:_arrayRandomIndex
        })
       }
   
       console.log(_arrayRandomIndex);
 
}

//play image description

playSong(e, ref){
    e.preventDefault();
      console.log(imageSounds[this.state.randomImageIndex]);
        const player = ref;
        player.play();
  
}


render() {
        let fullHint= this.state.imageText[this.state.randomImageIndex];
        let arrayLetters = [fullHint.charAt(0), "s", "f", "n", "t", "r", "z", "a"];

return (
  
      <div className="App">
        
        <div className="App-header">
            
            <h1 className="title">Welcome {this.state.student_name}!</h1>
            
  
        </div>
    
 <h1 className="instructions">Choose the first sound in the word:</h1>
 <div className="container">
         
         
       <PhotoBox
            imageText={this.state.imageText}
            images={this.props.images}
            randomImageIndex={this.state.randomImageIndex}
            imageSounds={this.props.imageSounds}
            playSong={this.playSong}


        />

        <LetterBox
            arrayLetters={arrayLetters}
            arrayRandomIndex={this.state.arrayRandomIndex}
            selectLetterBox={this.selectLetterBox}
            selected={this.state.selected}
           
        />

</div>  
         <AnswerBox
            correct={this.state.correct}
            score={this.state.score}
            numberOfAttempts={this.state.numberOfAttempts}
            negativeScore={this.state.negativeScore}
            
          />

  
       <ControlPanel 
            generateRandomNumber={this.generateRandomNumber}
            randomImageIndex={this.state.randomImageIndex}
            totalTime={this.state.totalTime}
            pause={this.pause}     
            playTimer={this.playTimer}
            submitLetter={this.submitLetter}
            handleSave={this.handleSave}
       />

</div>
)}}

// alt={imageText[this.props.randomImageIndex]}

class PhotoBox extends Component {

   render() {
 
      return (
          <div>
     

         <div className="smallBoxLiteracy1">
         
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

class LetterBox extends Component {
    
    render () {
        
        const style ={
            backgroundColor: 'blue'}


        

 return (
    
    <div className="bigBoxLiteracy">
         <div className="container" id="letterContainer">
         
                <div id="letterBox" 
                   
                    style={this.props.selected[0] ? style:null} 
                    onClick={(e)=>this.props.selectLetterBox(0)} 
                    >
                    <h2 className="letter">{this.props.arrayLetters[this.props.arrayRandomIndex[0]]}</h2></div>
               
          

                <div id="letterBox"
               
                   style={this.props.selected[1] ? style:null} 
                    onClick={(e)=>this.props.selectLetterBox(1)}
                  >
                <h2 className="letter">{this.props.arrayLetters[this.props.arrayRandomIndex[1]]}</h2></div>

     

                <div id="letterBox"
                 
                   style={this.props.selected[2] ? style:null} 
                    onClick={(e)=>this.props.selectLetterBox(2)}
                    >
                <h2 className="letter">{this.props.arrayLetters[this.props.arrayRandomIndex[2]]}</h2></div>

 

                <div id="letterBox"
               
                   style={this.props.selected[3] ? style:null} 
                    onClick={(e)=>this.props.selectLetterBox(3)}
                    >
                <h2 className="letter">{this.props.arrayLetters[this.props.arrayRandomIndex[3]]}</h2></div>

   

                <div id="letterBox"
                
                   style={this.props.selected[4] ? style:null} 
                    onClick={(e)=>this.props.selectLetterBox(4)}>
                <h2 className="letter">{this.props.arrayLetters[this.props.arrayRandomIndex[4]]}</h2></div>

           

                <div id="letterBox"
                 
                   style={this.props.selected[5] ? style:null} 
                    onClick={(e)=>this.props.selectLetterBox(5)}>
                <h2 className="letter">{this.props.arrayLetters[this.props.arrayRandomIndex[5]]}</h2></div>

         

                <div id="letterBox"
                
                   style={this.props.selected[6] ? style:null} 
                onClick={(e)=>this.props.selectLetterBox(6)}>
                <h2 className="letter">{this.props.arrayLetters[this.props.arrayRandomIndex[6]]}</h2></div>
              
        
   

            <div id="letterBox"
                 
                   style={this.props.selected[7] ? style:null} 
                  onClick={(e)=>this.props.selectLetterBox(7)}>
                <h2 className="letter">{this.props.arrayLetters[this.props.arrayRandomIndex[7]]}</h2></div>

    
    
       
       </div> 
       </div>  

)

}



}



class AnswerBox extends Component {
render(){


return (
     
            <div className="smallBox1withBorder" >
                <h3 className="success">{this.props.correct ? "Success!": " "}</h3>
                <h3 className="success">{!this.props.correct && this.props.negativeScore < 0 ? "Keep Trying!":null}</h3>
                <h3>Number Correct: {this.props.score}</h3>
                <h3>Number of Attempts: {this.props.numberOfAttempts}</h3>
               

             
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
                    <button className="btn-circle" type="button" onClick={(e)=> this.props.submitLetter(e)}>Submit</button>
                    <button className="btn-circle" type="button"><Link to="/">Home</Link></button>
                </div>

         
         
         </div>

    </div>

    )
}
}
 
  

export default App;




