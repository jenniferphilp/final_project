import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';

import '../index_2.css';

//two divs will appear --> randomly selected images and random number of each
// div will have a shadow and move slightly when hovered... border will go dark as well
//instructions will also be random: "Which group has MORE?" "Which group has LESS?"
//once selected --> compare random number from 1st group to random number from second...

//also have to deal with TIES

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

class MathApp2 extends Component {
    constructor(props) {

    super(props);
        this.state = {
            images:this.props.images,
            randomPhotosOne:[],
            randomPhotosTwo:[],
            selected:[false,false],
            isHovering:[false,false],
            answerGroupOne:0,
            answerGroupTwo:0,
            gameType:'more',
            correct:false,
            tie:false,
            score:0,
            negativeScore:0,
            attempts:0,
            totalTime:0,
            student_name:JSON.parse(localStorage.getItem('student_name')),
            student_ID:localStorage.getItem('student_ID')
            
};


this.generateRandomPhotos=this.generateRandomPhotos.bind(this);
this.clearPhotos=this.clearPhotos.bind(this);
this.handleMouseOver=this.handleMouseOver.bind(this);
this.handleMouseOut=this.handleMouseOut.bind(this);
this.checkAnswer=this.checkAnswer.bind(this);
this.moreOrLess=this.moreOrLess.bind(this);
this.tick=this.tick.bind(this);
this.pause=this.pause.bind(this);
this.play=this.play.bind(this);
this.handleSave=this.handleSave.bind(this);
    
};

//timer
componentDidMount(){
    this.play();
    this.generateRandomPhotos();

}

componentWillUnmount(){
      clearInterval(this.timer);
}

play(tick){
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

 generateRandomPhotos(){
    this.clearPhotos();
    this.moreOrLess();

//generate a random number for the image index
let randomNumber1 = Math.floor((Math.random() * 10));
//2nd random number will be the number of items displayed 
let randomNumber2 = Math.floor((Math.random() * 6)) + 1;
  

  let _arrayOfRandomPhotos1=[];
    for (let i = 0; i < randomNumber2; i++){
        _arrayOfRandomPhotos1.push(<img id="smallPhotoMath" key={i} role="presentation" src={images[randomNumber1]} />)
    }

    
    let randomNumber3 = Math.floor((Math.random() * 10));
    let randomNumber4 = Math.floor((Math.random() * 6)) + 1;

//DEALING WITH A TIE/SAME PHOTO...if first number === second, push into array with values first number =3, second number = 4


    let _arrayOfRandomPhotos2=[];
    
    for (let i = 0; i < randomNumber4; i++){
        _arrayOfRandomPhotos2.push(<img id="smallPhotoMath" key={i} role="presentation" src={images[randomNumber3]} />)
    }



 this.setState({
        randomPhotosOne:_arrayOfRandomPhotos1,
        randomPhotosTwo:_arrayOfRandomPhotos2,
        // answerGroupOne: randomNumber2,
        // answerGroupTwo:randomNumber4,
        selected:[false,false],
        tie:false
    })


    if (randomNumber2 === randomNumber4){
        this.generateRandomPhotos();
    }
    
    else {
        this.setState({
            answerGroupOne: randomNumber2,
            answerGroupTwo:randomNumber4
        })
    }
 }  
  
clearPhotos(){
    this.setState({
        randomPhotosOne:[],
        randomPhotosTwo:[]
    })
}

moreOrLess(){
    let randomNumber = Math.floor((Math.random()*2));
 if (randomNumber===1){
     this.setState({
         gameType:'fewer'
     })
 }
 else if (randomNumber === 0){
     this.setState({
         gameType:'more'
     })
 }
}

handleMouseOver(index){
if (index === 0){
    this.setState({
        selected:[true,false]
    })
}

if (index === 1){
    this.setState({
        selected:[false,true]
    })
}
}

handleMouseOut(index){
if (index === 0){
    this.setState({
        selected:[true,false]
    })

    if (index === 1){
        this.setState({
            selected:[false,true]
        })
    }
}
}

handleSave(e){
e.preventDefault();

axios.post('http://35.163.164.137/api/scores/', {
    // student_ID: this.state.student_ID,
  //this is saved from home page using local storage
    student_ID: this.state.student_ID,
    gameType: "Numeracy 2",
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
        attempts:0,
        totalTime:0
 
  })
}


checkAnswer(index){
if (this.state.answerGroupOne > this.state.answerGroupTwo && this.state.selected[0] === true && this.state.gameType === 'more'){
    
    this.setState({
            correct:true,
            score:this.state.score + 1,
            attempts: this.state.attempts + 1
        })
           this.generateRandomPhotos();
}

else if (this.state.answerGroupOne > this.state.answerGroupTwo && this.state.selected[1] === true && this.state.gameType === 'fewer'){
    
    this.setState({
            correct:true,
            score:this.state.score + 1,
            attempts: this.state.attempts + 1
        })
           this.generateRandomPhotos();
}


else if (this.state.answerGroupOne > this.state.answerGroupTwo && this.state.selected[1] === true && this.state.gameType === 'more'){
    this.setState({
        correct:false,
        negativeScore:this.state.negativeScore - 1,
        attempts: this.state.attempts + 1
})
}

else if (this.state.answerGroupOne > this.state.answerGroupTwo && this.state.selected[0] === true && this.state.gameType === 'fewer'){
    this.setState({
        correct:false,
        negativeScore:this.state.negativeScore - 1,
        attempts: this.state.attempts + 1
})
}


else if (this.state.answerGroupOne < this.state.answerGroupTwo && this.state.selected[1]=== true && this.state.gameType === 'more'){
   this.setState({
       correct:true,
       score:this.state.score +1,
       attempts: this.state.attempts + 1
   })
      this.generateRandomPhotos();
}

else if (this.state.answerGroupOne < this.state.answerGroupTwo && this.state.selected[0]=== true && this.state.gameType === 'fewer'){
   this.setState({
       correct:true,
       score:this.state.score +1,
       attempts: this.state.attempts + 1
   })

   this.generateRandomPhotos();
}

else if (this.state.answerGroupOne < this.state.answerGroupTwo && this.state.selected[0] === true && this.state.gameType === 'more'){
    this.setState({
        correct:false,
        negativeScore:this.state.negativeScore-1,
        attempts: this.state.attempts + 1
    })
}
else if (this.state.answerGroupOne < this.state.answerGroupTwo && this.state.selected[1] === true && this.state.gameType === 'fewer'){
    this.setState({
        correct:false,
        negativeScore:this.state.negativeScore-1,
        attempts: this.state.attempts + 1
    })
}

else if (this.state.answerGroupOne === this.state.answerGroupTwo){
   this.setState({
       tie:true,
       correct:false
       
   })
}
}

render() {

return (
  
        <div className="App">
               <div className="App-header">
            
                    <h1 className="title">Welcome {this.state.student_name}!</h1>
  
                </div>

                {this.props.children}

                
              <div className="containerMath2">
                    <PhotoBox
                    handleMouseOver={this.handleMouseOver}
                    handleMouseOut={this.handleMouseOut}
                    randomPhotosOne={this.state.randomPhotosOne}
                    randomPhotosTwo={this.state.randomPhotosTwo}
                    selected={this.state.selected}
                    gameType={this.state.gameType}
       
                    />
                  

                <ScoreCard
                   score={this.state.score}
                   attempts={this.state.attempts}
                   correct={this.state.correct}
                   />
</div>

                 


                   <ControlPanel
                    generateRandomPhotos={this.generateRandomPhotos}
                    totalTime={this.state.totalTime}
                    checkAnswer={this.checkAnswer}
                    pause={this.pause}     
                    play={this.play}
                    handleSave={this.handleSave}
                
                   />
      
            </div>
  )};
}


class PhotoBox extends Component{
render() {
   	let findStyle = () => {
		let style = {};
		
            if (this.props.selected[0]){
                style["backgroundColor"] = "white"
                style["border"]="solid"
                style["borderRadius"]=50   
                style["borderColor"] = "#F0B835"
                style["borderWidth"]= 6

            }
        return style
    }

    let findStyle2 = () => {
        let style = {};
        if (this.props.selected[1]){
                style["backgroundColor"] = "white"
                style["border"]="solid"
                style["borderRadius"]=50   
                style["borderColor"] = "#F0B835"
                style["borderWidth"]= 6

            }
        
        return style
    }

//   border:1px solid lightslategrey;
//   border-radius: 50px;
//   border-width:6px;


    return(
          
               <div>
                    <div style={findStyle(0)} className="photoboxMath2"
                    onMouseEnter={(e)=>this.props.handleMouseOver(0)} 
                    onMouseLeave={(e) => this.props.handleMouseOut(0)}>
                    {this.props.randomPhotosOne}
                    </div>
                    
                      <div>
                        <h1 className="instructions">Which group has {this.props.gameType}?</h1>
    
                    </div>

                    <div style={findStyle2(1)} className="photoboxMath2"
                    onMouseEnter={(e)=>this.props.handleMouseOver(1)} 
                    onMouseLeave={(e) => this.props.handleMouseOut(1)}>
                    {this.props.randomPhotosTwo}
                    </div>
                  </div>


    )
}

}


class ScoreCard extends Component{
    render(){
        return(
            <div className="scoreCardMath2">
                <h3>Number Correct: {this.props.score}</h3>
                <h3>Number of Attempts: {this.props.attempts}</h3>
                <h3 className={this.props.correct ? "success":"keepTrying"}>{this.props.correct ? "Success! Awesome!":"Keep trying"}</h3>
             
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
                    <button className="btn-circle" type="button" onClick={(e) => this.props.generateRandomPhotos(e)}>Change</button>
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
                    <button className="btn-circle" type="button" onClick={(e)=> this.props.checkAnswer(e)}>Submit</button>
                    <button className="btn-circle" type="button"><Link to="/">Home</Link></button>
                </div>

           
         
         </div>

    </div>

    )
}
}
  



export default MathApp2;