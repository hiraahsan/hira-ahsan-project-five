import React, { Component } from 'react';
import firebase from './firebase';
import ImageSection from './ImageSection.js';
import axios from 'axios';
import './App.scss';

class App extends Component {

  constructor() {
    super();
    this.state = {
      apiKey: '14421506-770fc3d3a51ab16bab09705a9',
      apiUrl: 'https://pixabay.com/api/',
      resultArray: [],
      mappedArray: []
    }
  }


  componentDidMount() {
    axios.get(`${this.state.apiUrl}/?key=${this.state.apiKey}`)
      .then((result) => {

        console.log(result.data.hits);
        this.setState({
          resultArray: result.data.hits,
          // map over the objects for taking out the relevant items. 
          })

          console.log(this.state.resultArray);

          // have to set it at a certain position in the code. 
          this.setState({
            mappedArray: this.state.resultArray.map((data) => {
              // console.log(data.previewURL);
              return data.previewURL;
            })
          })
        })
  }



  handleChange = (event) => {
    event.preventDefault();
    console.log('event', event.target)
    const appendHere = event.target;

    // const node = document.createElement('div')
    // const textnode = document.createTextNode(this.state.mappedArray)
    for (let i = 0; i < this.state.mappedArray.length ; i++ ) {
      appendHere.append(<img src={this.state.mappedArray[i]} />)
    }

    // console.log('i worked!', this.state.resultArray)
  }
    // console.log(this.state.resultArray);

  render() {
    // <ImageSection />
   

    return (
      <div className="App">
        <header>
          <h1>Writer's Block</h1>
        </header>
        {/* <ImageSection /> */}
        <form onSubmit={this.handleChange}>
        <button type="submit">Click me!</button>
        </form>
        {/* Insert instructions here
        pop up?
        or <details> */}
        {/* Create component for image sections */}
        {/* add favicon */}
      </div>
    );

  }
}

export default App;
