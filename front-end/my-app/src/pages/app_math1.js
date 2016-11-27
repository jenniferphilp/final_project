import React, { Component } from 'react';
import { Link } from 'react-router';

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
        attempts:0


    };

    this.generateRandomPicture=this.generateRandomPicture.bind(this);
    this.clearPhotos=this.clearPhotos.bind(this);
    this.handleAnswer=this.handleAnswer.bind(this);
    this.checkAnswer=this.checkAnswer.bind(this);
};


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

console.log("submitted answer:" + this.state.submittedAnswer)
console.log(typeof this.state.submittedAnswer)
console.log("real answer:" + this.state.answer)
console.log(typeof this.state.answer)




    if (submitted == answer){
            this.setState({
                correct:true,
                score:this.state.score + 1,
                attempts: this.state.attempts+1
            })
        }
        else {
            this.setState({
            negativeScore:this.state.negativeScore-1,
            attempts: this.state.attempts+1
    })
    }


}

    



render() {

 

        return (
  
            <div>
              <div className="App-header">
            
                    <h1 className="title">This is the title</h1>
                    <button className="homeButton" type="button"> <Link to="/">Home</Link></button>
            </div>
               
                <div className="col-lg-6 col-md-6 col-sm-1 col-xs-1 outerBoxMathApp">
          

        
                 {this.state.arrayOfRandomPhotos}


                </div>

                 <div className="col-lg-6 col-md-6 col-sm-1 col-xs-1 outerBox">
                    <h1>Count each {this.state.itemName}!</h1>
                    <button className="btn btn-lrg btn-primary changePictureButtonMathApp" type="button" onClick={this.generateRandomPicture}>Click to change picture!</button>

                    <form onSubmit={this.checkAnswer}>
                        <input type="number"  autoComplete="off" className="inputMathAnswer" onChange={this.handleAnswer}/>
                        <button className="btn btn-lrg btn-primary checkAnswerMath" type="submit" >Submit</button>
                    </form>    
                    
                        <h3>Number Correct: {this.state.score}</h3>
                        <h3>Number of Attempts: {this.state.attempts}</h3>
              </div>
                      <div className="photoBox col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <h3 className={this.state.correct ? "success":null}>{this.state.correct ? "Success! Awesome!":"Keep trying"}</h3>
                     
          </div>
          </div>
  )};
}

  



export default MathApp;



