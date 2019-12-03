import React, { Component } from 'react';
import axios from 'axios';
import firebase from 'firebase/app';
import Images from './Images';
import StoredImages from './StoredImages';
import StorySection from './StorySection';
import InputSearch from './InputSearch';
import Details from './Details';
import Svg from './Svg';

// To-Do: filter the selections by their height/widths?? and image types

class MainSection extends Component {
    constructor() {
        super();
        this.state = {
            apiKey: '851ca0e417e4da7927bb7094b0bb790d78758e507f353acd3aaa66d2e6e48462',
            apiUrl: 'https://api.unsplash.com',
            data: [],
            mappedArray: [],
            imageArray: [],
            textArray: [],
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

        axios({
            "async": true,
            "crossDomain": true,
            "url": `${this.state.apiUrl}/photos/?client_id=${this.state.apiKey}`,
            "method": "GET",
            params: {
                per_page: 20,
                order_by: "popular"
            }
        }).then( (response) => {
            this.setState({
                data: response.data
            })
        }).catch(error => {
            alert(error);
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
            imageToAppend: document.querySelector('input[name="radio"]:checked').value,
            idOfImage: document.querySelector('input[name="radio"]:checked').id
        })
    }

    handleSubmitImage = (event) => {
        event.preventDefault();
        this.setState({
            isButtonDisabled: "disabled"
        })
    }

    handleChangeInput = (event) => {
        this.setState({
            userInput: event.target.value
        })
    }

    handleSearchImages = (event) => {
        this.setState({
            inputToSearch: event.target.value
        })
    }

    handleSubmitSearch = (event) => {
        event.preventDefault();

        if(this.state.inputToSearch !== '') {

            let callApi = () => {
                axios({
                    "async": true,
                    "crossDomain": true,
                    "url": `https://api.unsplash.com/search/photos/?client_id=851ca0e417e4da7927bb7094b0bb790d78758e507f353acd3aaa66d2e6e48462&query=${this.state.inputToSearch}`,
                    "method": "GET",
                    params: {
                        per_page: 20
                    }
                }).then((response) => {
                    console.log(response)
                    this.setState({
                        data: response.data.results
                    })
                }).catch(error => {
                    console.log(error);
                })
            }
            callApi();
            this.setState({
                inputToSearch: ''
            })
        } else {
            alert("Enter in a search term to continue!");
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        // and if statement, if both radio button is selected and text area is filled, the data will be pushed then

        if (this.state.userInput !== '') {

            if (this.state.imageToAppend !== '') {
                console.log('input has registered');
                this.state.dbRefText.push(this.state.userInput);
                this.state.dbRefImages.push(this.state.imageToAppend);

                this.setState({
                    isButtonDisabled: true
                })
            }
        } else {
            console.log('this did not work')
            alert('Select an image and enter in text to continue!')
            // enter in error message function
        }

    }

    

    render() {

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
                previewImg={response.urls.small}
                linkToPage={response.links.html}
                indexKey={i}
                alt={response.alt_description}
                appendImages={this.handleChange}
            />
        ))

        // appending images

        return (
            <div className="App">

                <div className="header-section">
                    <div className="oneThirdSection">
                        {this.state.imageArray.map((image, i) => (
                        <a href={image.imageId}><img alt="" src={image.imageUrl}></img></a>
                        ))}
                    </div>

                    <div className="theRest">

                        <h1>Writer's Block</h1>

                        <Svg />

                    </div>
                </div>

                <Details />

                <InputSearch handleSearchImages={this.handleSearchImages} handleSubmitSearch={this.handleSubmitSearch} />

                <form onSubmit={this.handleSubmit}>
                    <div className="imageSection">
                        <section>
                            <div className="imageContainer">
                                {imagesFinal}
                            </div>

                        </section>

                    </div>
                    <div className="userInputSection">
                        <textarea onChange={this.handleChangeInput} placeholder="Start writing your story here! For example: You hear a knock on the door. You open it and you see a white haired man dressed like a wizard on your porch, in the middle of July. He says his name is Albus Dumbledore and he's come to take your daughter to a boarding school for witches and wizards." maxLength="500"></textarea>
                        <button disabled={this.state.isButtonDisabled} type="submit">Submit text here</button>
                    </div>
                </form>
                <div className="splitSection clearfix">
                    <div className="imageSplit">{storedImages}</div>
                    <div className="textSplit">{storedText}</div>
                </div>
            </div>
        )
    }
}

export default MainSection;