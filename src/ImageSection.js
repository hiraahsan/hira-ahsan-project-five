import React, { Component } from 'react';
import axios from 'axios';
import firebase from 'firebase/app';
import Images from './Images';
import StoredImages from './StoredImages';
import StorySection from './StorySection';
import Header from './Header';
import InputSearch from './InputSearch';

// To-Do: filter the selections by their height/widths?? and image types

class ImageSection extends Component {

    constructor() {
        super();
        this.state = {
            apiKey: '14421506-770fc3d3a51ab16bab09705a9',
            apiUrl: 'https://pixabay.com/api/',
            q: '',
            data: [],
            mappedArray: [],
            imageArray: [],
            textArray: [],
            runApi: [],
            imageToAppend: '',
            userInput: '',
            inputToSearch: '',
            mappedDbref: '',
            isButtonDisabled: false,
            dbRefImages: firebase.database().ref('/images'),
            dbRefText: firebase.database().ref('/text')
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
        
        this.state.dbRefImages.on('value', (snapshot) => {
            const images = snapshot.val();
            const newImages = []

            for (let key in images) {
                const individualImages = {
                    imageId: key,
                    imageUrl: images[key]
                }
                newImages.push(individualImages);
            }

            this.setState({
                imageArray: newImages
            })
        })

        this.state.dbRefText.on('value', (snapshot) => {
            const stories = snapshot.val();
            const newStories = []

            for (let key in stories) {
                const individualStories = {
                    storyId: key,
                    storyText: stories[key]
                }
                newStories.push(individualStories);
            }

            this.setState({
                textArray: newStories
            })
        })
    }

    handleChange = () => {
        this.setState({
            imageToAppend: document.querySelector('input[name="radio"]:checked').value
            }
        )
        // setting state for image append, change for firebase
    }

    handleSubmitImage = (event) => {
        event.preventDefault();
        this.setState({
            isButtonDisabled: true
        })

        // console.log('event', event.target.value);
    }

    handleChangeInput = (event) => {
        this.setState({
            userInput: event.target.value
        })

        // setting state for user Input, change for firebase
    }

    handleSearchImages = (event) => {
        this.setState({
            inputToSearch: event.target.value
        })
    }

    handleSubmitSearch = (event) => {
        event.preventDefault();
        this.setState({
            q: this.state.inputToSearch
        })

        let callApi = () => {
            axios.get(`${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.q}`)
            .then((result) => {
                this.setState({
                    data: result.data.hits
                })
                this.setState({
                    mappedArray: this.state.data.map((response) => {
                        return response.previewURL;
                    })
                })
            })
        }
            callApi();
        // this.state.runApi();
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // console.log('event', event.target);

        // and if statement, if both radio button is selected and text area is filled, the data will be pushed then

        // let radioBtn = document.getElementsByName('radio');

        if (this.state.userInput !== '') {

         if (this.state.imageToAppend !== '') {
            console.log('input has registed');
            this.state.dbRefText.push(this.state.userInput);
            this.state.dbRefImages.push(this.state.imageToAppend);

        this.setState({
            isButtonDisabled: true
        })
        }
     } else {
            console.log('this did not work')
            // enter in error message function
        } 

    }

    render() {
        // const textToAppend = this.state.userInput;

        const storedImages = this.state.imageArray.map( (image, i) => (
            <StoredImages 
            storedImg={image.imageUrl}
            id={image.imageId}
            key={i}
            />
        ))

        const storedText = this.state.textArray.map((text, i) => (
            <StorySection
            storedText={text.storyText}
            storedTextId={text.storyId}
            key={i}
            />
        ))
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
            <Header />

                <InputSearch handleSearchImages={this.handleSearchImages} handleSubmitSearch={this.handleSubmitSearch}/>

                <form onSubmit={this.handleSubmit}>
                <div className="imageSection">
                    <section>
                        <div className="imageContainer">
                            {imagesFinal}
                        </div>
                        
                    </section>

                </div>

                    <textarea onChange={this.handleChangeInput} name="" id=""></textarea>
                    <button disabled={this.isButtonDisabled} type="submit">Submit text here</button>
                </form>
                <div className="splitSection clearfix">
                    <div className="imageSplit">{storedImages}</div>
                    <div className="textSplit">{storedText}</div>
                </div>
                <StorySection
                    // appendImg={this.state.imageToAppend}
                    // textToBeAppended={textToAppend}
                />
            </div>
        )
    }
}

export default ImageSection;