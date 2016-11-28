import React, { Component } from 'react';
import { Link } from 'react-router';

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
            isHovering:[false, false],
            selected:[false,false],
            answerGroupOne:0,
            answerGroupTwo:0,
            gameType:'more',
            correct:false,
            tie:false,
            score:0,
            negativeScore:0,
            attempts:0,
            totalTime:0
            
};


this.generateRandomPhotosOne=this.generateRandomPhotosOne.bind(this);
this.generateRandomPhotosTwo=this.generateRandomPhotosTwo.bind(this);
this.clearPhotos=this.clearPhotos.bind(this);
this.handleMouseOver=this.handleMouseOver.bind(this);
this.handleMouseOut=this.handleMouseOut.bind(this);
this.checkAnswer=this.checkAnswer.bind(this);
this.moreOrLess=this.moreOrLess.bind(this);
this.tick=this.tick.bind(this);
this.pause=this.pause.bind(this);
this.play=this.play.bind(this);
    
};

componentDidMount(){
    this.play();
}
//TIMER
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

componentWillMount(){
    this.generateRandomPhotosOne();
    this.generateRandomPhotosTwo();
}


 generateRandomPhotosOne(){
    this.clearPhotos();
    this.generateRandomPhotosTwo();
    this.moreOrLess();

//generate a random number for the image index
let randomNumber1 = Math.floor((Math.random() * 10));
//2nd random number will be the number of items displayed --> this will change state of answer
let randomNumber2 = Math.floor((Math.random() * 9)) + 1;

  let _arrayOfRandomPhotos=[];
    for (let i = 0; i < randomNumber2; i++){
        _arrayOfRandomPhotos.push(<img id="smallPhotoMath" key={i} role="presentation" src={images[randomNumber1]} />)
    }

    this.setState({
        randomPhotosOne:_arrayOfRandomPhotos,
        answerGroupOne: randomNumber2,
        isHovering:[false,false],
        selected:[false,false],
        tie:false
    })
  
}   


 generateRandomPhotosTwo(){
    //generate a random number for the image index
    let randomNumber1 = Math.floor((Math.random() * 10));
    //2nd random number will be the number of items displayed --> this will change state of answer
    let randomNumber2 = Math.floor((Math.random() * 9)) + 1;

    let _arrayOfRandomPhotos=[];
    for (let i = 0; i < randomNumber2; i++){
        _arrayOfRandomPhotos.push(<img id="smallPhotoMath" key={i} role="presentation" src={images[randomNumber1]} />)
    }

    this.setState({
        randomPhotosTwo:_arrayOfRandomPhotos,
        answerGroupTwo:randomNumber2
       
    })

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
        isHovering:[true,false],
        selected:[true,false]
    })
}

if (index === 1){
    this.setState({
        isHovering:[false,true],
        selected:[false,true]
    })
}
}

handleMouseOut(index){

if (index === 0){
    this.setState({
        isHovering:[false, false],
        selected:[true,false]
    })

    if (index === 1){
        this.setState({
            isHovering:[false,false],
            selected:[false,true]
        })
    }
}
}



checkAnswer(index){
if (this.state.answerGroupOne > this.state.answerGroupTwo && this.state.selected[0] === true && this.state.gameType === 'more'){
    
    this.setState({
            correct:true,
            score:this.state.score + 1,
            attempts: this.state.attempts + 1
        })
}

else if (this.state.answerGroupOne > this.state.answerGroupTwo && this.state.selected[1] === true && this.state.gameType === 'fewer'){
    
    this.setState({
            correct:true,
            score:this.state.score + 1,
            attempts: this.state.attempts + 1
        })
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
}

else if (this.state.answerGroupOne < this.state.answerGroupTwo && this.state.selected[0]=== true && this.state.gameType === 'fewer'){
   this.setState({
       correct:true,
       score:this.state.score +1,
       attempts: this.state.attempts + 1
   })
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
       tie:true
       
   })
}
}

render() {
	let findStyle = () => {
		let style = {};
		    if (this.state.isHovering[0]){
			style["borderColor"] = "darkBlue"
             style["borderWidth"]= 6
            }
            if (this.state.selected[0]){
               style["backgroundColor"] = "lightBlue"
            }
    
            // style["background"]=0.8
            // style["backgroundColor"]="grey"
     

		return style
    }

    let findStyle2 = () => {
        let style = {};
        if (this.state.isHovering[1]){
            style["borderColor"] = "darkBlue"
             style["borderWidth"]= 6
            //  style["margin"] = 3
        } 
        if (this.state.selected[1]){
               style["backgroundColor"] = "lightBlue"
            }
        
        return style
    }


return (
  
        <div>
             <div className="App-header">
            
                <h1 className="title">title shmitle</h1>
                <button className="homeButton" type="button"> <Link to="/">Home</Link></button>
       
             </div>
          
                <div className="col-lg-2 col-md-2">
                    <h1 className="mathAppMore">Which group has {this.state.gameType}?</h1>
                    <div className="tinyTimerMath2">
                    <h4>Total Time:  {this.state.totalTime} seconds</h4>
                    <button onClick={(e)=>this.play(e)}><span className="glyphicon glyphicon-play"></span></button>
                    <button onClick={(e)=>this.pause(e)}><span className="glyphicon glyphicon-pause"></span></button>

                </div>
                   
                </div> 
                <div className="col-lg-8 col-md-4 col-sm-4 col-xs-4 outerBoxMathApp">
                    <div style={findStyle(0)} className="optionBoxMathApp"
                    onMouseEnter={(e)=>this.handleMouseOver(0)} 
                    onMouseLeave={(e) => this.handleMouseOut(0)}>
                    {this.state.randomPhotosOne}
                    </div>

                    <div style={findStyle2(1)}className="optionBoxMathApp"
                    onMouseEnter={(e)=>this.handleMouseOver(1)} 
                    onMouseLeave={(e) => this.handleMouseOut(1)}>
                    {this.state.randomPhotosTwo}
                    </div>

                </div>
                
                   <button className="btn btn-lrg btn-primary checkAnswerMathButton" onClick={()=>this.checkAnswer()} type="submit" >Submit</button>
                   <h3 className={this.state.correct ? "success":"keepTrying"}>{this.state.correct ? "Success! Awesome!":"Keep trying"}</h3>
                   <h3>Score: {this.state.score}</h3>
                   <h3>Attempts: {this.state.attempts}</h3>
                   <h3 className="success">{this.state.tie ? "It's a tie!":null}</h3>
                    <button className="btn btn-lrg btn-primary" type="button" onClick={this.generateRandomPhotosOne}>Click to change pictures!</button>
                     
          
            </div>
  )};
}

  



export default MathApp2;