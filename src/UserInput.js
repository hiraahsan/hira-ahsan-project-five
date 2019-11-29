import React, { Component } from 'react';
import firebase from 'firebase/app';
import StorySection from './StorySection';

class UserInput extends Component {
    constructor(){
        super();
        this.state = {
            userInput: ''
        }

    }

    componentDidMount() {

    }

    

    
    render(){
        
        return(
            <div className="UserInputSection">
                <form onSubmit={this.handleSubmit}>
                    <textarea onChange={this.handleChange} name="" id=""></textarea>
                <button type="submit">Submit text here</button>
                </form>
                <StorySection
                     />
            </div>
        )
    }
}

export default UserInput;