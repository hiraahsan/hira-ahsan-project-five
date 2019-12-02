import React, { Component } from 'react';
import axios from 'axios';
import firebase from 'firebase/app';
import Images from './Images';
import StoredImages from './StoredImages';
import StorySection from './StorySection';

// To-Do: filter the selections by their height/widths?? and image types

class SecondApiCall extends Component {

    constructor() {
        super();
        this.state = {
            // apiKey: '14421506-770fc3d3a51ab16bab09705a9',
            // apiUrl: 'https://pixabay.com/api/',
            // q: 'dogs',
            data: [],
            mappedArray: [],
            imageArray: [],
            textArray: [],
            imageToAppend: '',
            userInput: '',
            mappedDbref: '',
            isButtonDisabled: false,
            dbRefImages: firebase.database().ref('/images'),
            dbRefText: firebase.database().ref('/text')
        }
    }

    componentDidMount() {

        axios({
            async: true,
            crossDomain: true,
            url: "https://api.imgur.com/oauth2/token",
            method: "POST",
            processData: false,
            contentType: false,
            mimeType: "multipart/form-data",
            data: {
                "grant_type": "refresh_token",
                "client_secret": "aa763100e6dca10653b3f4d58028b0ce9f932a0b",
                "client_id": "69cda15ad772d1f",
                "refresh_token": "4af099346d4d467002be85afb189a6c583ecab4e"
            }
        }).then((response) => {
            console.log(response);
            this.state.authToken = response.data;
        });

        axios({
            "url": "https://api.imgur.com/3/gallery/r/aww",
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Authorization": "Client-ID 69cda15ad772d1f"
            },
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false
        }).then((response) => {
            console.log(response.data.data);

            this.setState({
                data: response.data.data
            })

            this.setState({
                mappedArray: this.state.data.map( (response) => {
                    return response.link
                })
            })
        });

        this.state.dbRefImages.on('value', (snapshot) => {
            // console.log(snapshot.val());
            const images = snapshot.val();
            const newImages = []

            for (let key in images) {
                const individualImages = {
                    imageId: key,
                    imageUrl: images[key]
                }
                newImages.push(individualImages);
                // console.log(newImages);
            }

            this.setState({
                imageArray: newImages
            })
        })

        this.state.dbRefText.on('value', (snapshot) => {
            // console.log(snapshot.val());
            const stories = snapshot.val();
            const newStories = []

            for (let key in stories) {
                const individualStories = {
                    storyId: key,
                    storyText: stories[key]
                }
                newStories.push(individualStories);
                // console.log(newStories);
            }

            this.setState({
                textArray: newStories
            })
        })
    }

    handleChange = () => {
        // console.log(document.querySelector('input[name="radio"]:checked').value)

        this.setState({
            imageToAppend: document.querySelector('input[name="radio"]:checked').value
        }
        )


        // add a submit button for pushing images

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

        const storedImages = this.state.imageArray.map((image, i) => (
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

        const imagesFinal = this.state.data.map((response, i) => (
            <Images
                previewImg={response.link}
                // linkToPage={response.pageURL}
                indexKey={i}
                appendImages={this.handleChange}
            />
        ))

        // appending images

        return (
            <div className="App">
                <form onSubmit={this.handleSubmit}>
                    <div className="imageSection">
                        <section>
                            <div className="imageContainer">
                                {imagesFinal}
                            </div>

                        </section>

                    </div>
                    {/* <button type="submit">Select Image</button> */}

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

export default SecondApiCall;