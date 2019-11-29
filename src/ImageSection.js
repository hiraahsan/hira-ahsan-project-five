import React, { Component } from 'react';
import axios from 'axios';
import firebase from 'firebase/app';
import Images from './Images';
import StorySection from './StorySection';


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
            imageToAppend: '',
            userInput: '',
            dbRef: firebase.database().ref(),
        }
    }

    componentDidMount() {
        axios.get(`${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.q}`)
            .then((result) => {
                this.setState({
                    data: result.data.hits,
                })
                this.setState({
                    mappedArray: this.state.data.map((response) => {
                        return response.previewURL;
                    })
                })
            }) 

        // To-Do: connect app to firebase


    }

    

    handleChange = () => {
        console.log(document.querySelector('input[name="radio"]:checked').value)

        this.setState({
            imageToAppend: document.querySelector('input[name="radio"]:checked').value
            }
        )

        // setting state for image append, change for firebase
    }

    handleChangeInput = (event) => {
        console.log('event', event.target.value);

        this.setState({
            userInput: event.target.value
        })

        // setting state for user Input, change for firebase
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('event', event.target);
    }

    render() {
        const textToAppend = this.state.userInput;

        // appending text

        const imagesFinal = this.state.data.map( (response, i) => (
            <Images 
            previewImg={response.webformatURL}
            linkToPage={response.pageURL}
            indexKey={i}
            appendImages={this.handleChange}
            />
        ))

        // appending images

        return(
            <div className="App">
                <div className="imageSection">
                    <section>
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