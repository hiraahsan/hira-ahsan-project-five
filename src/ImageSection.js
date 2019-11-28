import React, { Component } from 'react';
import axios from 'axios';
import firebase from 'firebase/app';
import Images from './Images';
import StorySection from './StorySection';


class ImageSection extends Component {

    constructor() {
        super();
        this.state = {
            apiKey: '14421506-770fc3d3a51ab16bab09705a9',
            apiUrl: 'https://pixabay.com/api/',
            q: 'witches',
            data: [],
            mappedArray: [],
            imageArray: [],
            displayData: '',
            handleClickImage: '',
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
            })
    }

    handleChange = (event) => {
    event.preventDefault();
    console.log('event', event.target)
    console.log(this.state.mappedArray);

    this.setState({
        handleClickImage: (event) => {
            console.log('you clicked me!', event)
        }
    })

    // this.state.handleClickImage = (event) => {
    //     console.log('you clicked me!', event)
    // }

    for (let i = 0; i < this.state.mappedArray.length; i++) {
    //   this.displayData.push(<div id="display-data"><img src={this.state.mappedArray[i]}></img></div>);
    }
    }
    render() {
        console.log(this.state.data);
        const imagesFinal = this.state.data.map( (response, i) => (
            // console.log(i)
            <Images 
            previewImg={response.webformatURL}
            linkToPage={response.pageURL}
            indexKey={i}
            />
        ))
        // for (let i = 0; i < this.state.mappedArray.length; i++) {
        //     return <Images img={this.state.mappedArray[i]} />
        // }

        return(
            <div className="imageSection">
                <section>
                    <form onSubmit={this.handleChange}>
                        <button type="submit">Click me!</button>
                    </form>
                    <div className="imageContainer">
                        {imagesFinal}
                    </div>
                </section>
                {/* { console.log(this.state.resultArray) } */}
            </div>
        )
    }
}

export default ImageSection;