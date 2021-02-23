import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import DiceGame from "./DiceGame";


class App extends Component{
  render(){
    return <DiceGame numberOfDices = {4}/>
  }
}


export default App;
