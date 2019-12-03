import React, { Component } from 'react';
import firebase from './firebase';
import './styles/App.css';
import MainSection from './MainSection';

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
        <MainSection />
      </div>
    );
  }
}

export default App;
