import React, { Component } from 'react';
import axios from 'axios';
import firebase from 'firebase/app';
import Images from './Images';
import StorySection from './StorySection';
import UserInput from './UserInput';


class ImageSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            apiKey: '14421506-770fc3d3a51ab16bab09705a9',
            apiUrl: 'https://pixabay.com/api/',
            q: 'dogs',
            data: [],
            mappedArray: [],
            imageArray: [],
            displayData: '',
            handleClick: '',
            imageToAppend: '',
            userInput: '',
            dbRef: firebase.database().ref(),
            // handleChange: ''
        }
    }

    componentDidMount() {
        axios.get(`${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.q}`)
            .then((result) => {

                // console.log(result.data.hits);
                this.setState({
                    data: result.data.hits,
                    // map over the objects for taking out the relevant items. 
                })

                console.log(this.state.data);

                // have to set it at a certain position in the code. 
                this.setState({
                    mappedArray: this.state.data.map((response) => {
                        // console.log(data.previewURL);
                        return response.previewURL;
                    })
                })

                this.setState({
                    handleClick: (event) => {
                        event.preventDefault();
                        console.log('event', event.target);
                    }
                })
            })
        
    }

    

    handleChange = () => {
        console.log(document.querySelector('input[name="radio"]:checked').value)

        this.setState({
            imageToAppend: document.querySelector('input[name="radio"]:checked').value
            }
        )
    }

    handleChangeInput = (event) => {
        console.log('event', event.target.value);

        this.setState({
            userInput: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('event', event.target);

    }

    

    render() {
        const textToAppend = this.state.userInput;

        const imagesFinal = this.state.data.map( (response, i) => (
            <Images 
            previewImg={response.webformatURL}
            linkToPage={response.pageURL}
            indexKey={i}
            appendImages={this.handleChange}
            />
        ))

        return(
            <div className="App">
                <div className="imageSection">
                    <section>
                        <form onSubmit={this.handleChange}>
                            <button type="submit">Click me!</button>
                        </form>
                        <div className="imageContainer">
                            {imagesFinal}
                        </div>
                    </section>

                </div>

                <form onSubmit={this.handleSubmit}>
                    <textarea onChange={this.handleChangeInput} name="" id=""></textarea>
                    <button type="submit">Submit text here</button>
                </form>

                    <StorySection
                        appendImg={this.state.imageToAppend}
                        textToBeAppended={textToAppend}
                    />
            </div>
        )
    }
}

export default ImageSection;