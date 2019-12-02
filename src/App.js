import React, { Component } from 'react';
import firebase from './firebase';
import SecondApiCall from './SecondApiCall';
// import ImageSection from './ImageSection';
// import axios from 'axios';
import './App.scss';

class App extends Component {

  constructor() {
    super();
    this.state = {
      dbRef: firebase.database().ref()
    }
  }

  render() {

    return (
      <div className="App">
        <header>
          <h1>Writer's Block</h1>
        </header>

        <details>
          <summary>
            Instructions in here
          </summary>
          <p>Testing the details tab</p>
          <p>Testing again</p>
        </details>
        <SecondApiCall />
        {/* Insert instructions here
        as pop up?
        or <details> */}
        {/* Create component for image sections */}
        {/* add favicon */}
      </div>
    );
  }
}

export default App;
