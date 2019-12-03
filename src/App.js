import React, { Component } from 'react';
import firebase from './firebase';
import './styles/App.scss';
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
        {/* add favicon */}
      </div>
    );
  }
}

export default App;
