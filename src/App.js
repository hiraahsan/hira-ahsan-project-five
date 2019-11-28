import React, { Component } from 'react';
import firebase from './firebase';
import ImageSection from './ImageSection';
// import axios from 'axios';
import './App.scss';

class App extends Component {

  constructor() {
    super();
    this.state = {
      dbRef: firebase.database().ref()
    }
  }

  // handleChange = (event) => {
  //   event.preventDefault();
  //   console.log('event', event.target)

  //   // const node = document.createElement('div')
  //   // const textnode = document.createTextNode(this.state.mappedArray)
  //   for (let i = 0; i < this.state.mappedArray.length; i++) {
  //     appendHere.appendChild(`<img src=${this.state.mappedArray[i]} />`)
  //   }

    // console.log('i worked!', this.state.resultArray)
  // }

  render() {

    // console.log(this.state.mappedArray);

    return (
      <div className="App">
        <header>
          <h1>Writer's Block</h1>
        </header>
        <ImageSection />
        {/* {this.displayData} */}
        {/* {this.images()} */}
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
