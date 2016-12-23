import React, { Component } from 'react';
import '../index_2.css';



class About extends Component {


render() {

    return (
    <div className="App">
          <div className="App-header">
            
                  <h1 className="title">fun! game!</h1>
       
            </div>

            {this.props.children}


         <div className="smallBoxAboutPage">
         
         <h1>Summary</h1>
         <p>This app was built with ReactJS (a JavaScript libray for user interfaces) and a Node server using the Express module. It is integrated with a MongoDB database, hosted by mLab. The site was deployed using an Amazon AWS EC2 instance. </p>

        <p>The site consists of two games per branch - literacy and numeracy - and supports the Ontario Kindergarten program curriculum. 
       It is suitable for ages 4 and up. </p>

        <p>This application has been designed for desktop, tablet, and mobile use.</p>
         
         
         <h1>Who is this for?</h1>
     
      
          <p>Designed for teachers and other educators who wish to track individual student progress in the general academic areas of literacy and numeracy.
          </p>


       
     
        <h1>Features</h1>
        
          <li>Supports specific literacy/numeracy goals for Ontario’s Kindergarten program as <a href="http://www.ontario.ca/document/kindergarten-program-2016"><u>per the Ministry’s curriculum documentation</u></a></li>
         
          <li>Supports the incorporation of <a href="http://www.ontario.ca/document/kindergarten-program-2016/play-based-learning-culture-inquiry#connections-to-self-regulation"><u>play-based learning in the Kindergarten classroom</u></a></li>

          <li>Data collection: Student ID, percent, number correct, number of attempts, and time on task can be saved and retrieved by user</li>
          
          
           <h1>Accessibility</h1>
          
        <p>Allows for some accessibility considerations with regards to visual and fine-motor impairments:</p>
        <li>alt image tags for screen readers</li>
        <li>audio buttons for descriptions/instructions</li>
        <li>high contrast; large font; clean, simple design</li>
        <li>mobile and tablet-friendly design increases ease of use</li>


        
        </div>

           </div>

        )}
    

}


export default About;