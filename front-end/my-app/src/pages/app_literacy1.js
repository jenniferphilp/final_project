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
        randomImageIndex:0,
        //10 possible pictures
        imageText:["baby", "car", "mouse", "computer", "bear", "cat", "dog", "ball", "bed", "bat"],
        //8 spaces for hints
        isHovering:[false, false, false, false, false, false, false, false],
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
    this.handleMouseOver=this.handleMouseOver.bind(this);
    this.handleMouseOut=this.handleMouseOut.bind(this);
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

axios.post('http://35.163.164.137/api/scores/', {
    // student_ID: this.state.student_ID,
  //this is saved from home page using cookies
    //

    

    student_ID: this.state.student_ID,
    gameType: "Literacy 1",
    percent:((this.state.score)/(this.state.numberOfAttempts)*100),
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

//handles mouse over. Sets all hovering/selected divs back to false
handleMouseOver(index){

    this.setState({
        isHovering:[false,false,false,false,false,false,false],
        selected:[false,false,false,false,false,false,false],
     
    })
  
//sets hovering & selected states of selected div by index value
//timeout ensures all divs are set to false 1st
let item = this.state.isHovering;
item[index] = true;
 
 //necessary so that isHovering & selected changes to false before item is selected. prevents multiple divs from being selected
 setTimeout(()=> {

    this.setState({
        isHovering:item,
        selected:item
    })
}, 10)  
  
}

//handles mouse out. ensure all hovering is false. 'Selected' state does not change
handleMouseOut(index){
    this.setState({
        isHovering:[false, false, false, false, false, false, false, false],
        // selected:[false, false, false, false, false, false, false]
     
    })

let item = this.state.selected;
item[index] = true;
item[!index] = false;
    
setTimeout(()=> {

    this.setState({
        selected:item
    })
}, 10)  

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
          generateRandomNumber={this.generateRandomNumber}
          images={this.props.images}
          randomImageIndex={this.state.randomImageIndex}
          imageSounds={this.props.imageSounds}
          playSong={this.playSong}


        />

        <LetterBox
            arrayLetters={arrayLetters}
            arrayRandomIndex={this.state.arrayRandomIndex}
            isHovering={this.state.isHovering}
            handleMouseOver={this.handleMouseOver}
            handleMouseOut={this.handleMouseOut}
            selected={this.state.selected}
            correct={this.state.correct}
            selectedLetter={this.state.selectedLetter}
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


class PhotoBox extends Component {

   render() {
 
      return (
          <div>
     

         <div className="smallBoxLiteracy1">
         
           <img id="photoLiteracy" role="presentation" src={images[this.props.randomImageIndex]} />
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
                    className={this.props.selected[0] ? "selected":null}
                    style={this.props.isHovering[0] ? style:null} 
                    onMouseEnter={(e)=>this.props.handleMouseOver(0)} 
                    onMouseLeave={(e) => this.props.handleMouseOut(0)}>
                    <h2 className="letter">{this.props.arrayLetters[this.props.arrayRandomIndex[0]]}</h2></div>
               
          

                <div id="letterBox"
                 className={this.props.selected[1] ? "selected":null}
                   style={this.props.isHovering[1] ? style:null} 
                    onMouseEnter={(e)=>this.props.handleMouseOver(1)}
                    onMouseLeave={(e) => this.props.handleMouseOut(1)}>
                <h2 className="letter">{this.props.arrayLetters[this.props.arrayRandomIndex[1]]}</h2></div>

     

                <div id="letterBox"
                  className={this.props.selected[2] ? "selected":null}
                   style={this.props.isHovering[2] ? style:null} 
                    onMouseEnter={(e)=>this.props.handleMouseOver(2)}
                    onMouseLeave={(e) => this.props.handleMouseOut(2)}>
                <h2 className="letter">{this.props.arrayLetters[this.props.arrayRandomIndex[2]]}</h2></div>

 

                <div id="letterBox"
                  className={this.props.selected[3] ? "selected":null}
                   style={this.props.isHovering[3] ? style:null} 
                    onMouseEnter={(e)=>this.props.handleMouseOver(3)}
                    onMouseLeave={(e)=> this.props.handleMouseOut(3)}>
                <h2 className="letter">{this.props.arrayLetters[this.props.arrayRandomIndex[3]]}</h2></div>

   

                <div id="letterBox"
                  className={this.props.selected[4] ? "selected":null}
                   style={this.props.isHovering[4] ? style:null} 
                    onMouseEnter={(e)=>this.props.handleMouseOver(4)}
                    onMouseLeave={(e) => this.props.handleMouseOut(4)}>
                <h2 className="letter">{this.props.arrayLetters[this.props.arrayRandomIndex[4]]}</h2></div>

           

                <div id="letterBox"
                  className={this.props.selected[5] ? "selected":null}
                   style={this.props.isHovering[5] ? style:null} 
                    onMouseEnter={(e)=>this.props.handleMouseOver(5)}
                    onMouseLeave={(e) => this.props.handleMouseOut(5)}>
                <h2 className="letter">{this.props.arrayLetters[this.props.arrayRandomIndex[5]]}</h2></div>

         

                <div id="letterBox"
                  className={this.props.selected[6] ? "selected":null}
                   style={this.props.isHovering[6] ? style:null} 
                    onMouseEnter={(e)=>this.props.handleMouseOver(6)}
                    onMouseLeave={(e) => this.props.handleMouseOut(6)}>
                <h2 className="letter">{this.props.arrayLetters[this.props.arrayRandomIndex[6]]}</h2></div>
              
        
   

            <div id="letterBox"
                  className={this.props.selected[7] ? "selected":null}
                   style={this.props.isHovering[7] ? style:null} 
                    onMouseEnter={(e)=>this.props.handleMouseOver(7)}
                    onMouseLeave={(e) => this.props.handleMouseOut(7)}>
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




