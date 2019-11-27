import React, { Component } from 'react';
import firebase from './firebase';
import ImageSection from './ImageSection.js';
import axios from 'axios';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      apiKey: '14421506-770fc3d3a51ab16bab09705a9',
      apiUrl: 'https://pixabay.com/api/'
    }
  }


  componentDidMount() {
    // const callImages = () => {
    axios.get(`${this.state.apiUrl}/?key=${this.state.apiKey}`)
      .then((result) => {
        console.log(result.data.hits);
      })

    // callImages();
  }
  render() {
    // <ImageSection />



    return (
      <div className="App">
        <header>
          <h1>Writer's Block</h1>
        </header>
        <ImageSection />
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
