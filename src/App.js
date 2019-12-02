import React, { Component } from 'react';
import firebase from './firebase';
// import SecondApiCall from './SecondApiCall';
// import ImageSection from './ImageSection';
// import axios from 'axios';
import './App.scss';
// import ImageSection from './ImageSection';
import UnsplashCall from './UnsplashCall';

class App extends Component {

  constructor() {
    super();
    this.state = {
      dbRef: firebase.database().ref()
    }
  }

  render() {

    return (
      <div className="App wrapper">
        <UnsplashCall />
        {/* Insert instructions here
        as pop up?
        or <details> */}
        {/* add favicon */}
      </div>
    );
  }
}

export default App;
