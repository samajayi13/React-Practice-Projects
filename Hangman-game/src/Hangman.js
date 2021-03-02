import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import {randomWord} from "./words";
import AlphaButtons from "./AlphaButton";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.displayHangmanButtonArea = this.displayHangmanButtonArea.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    const words =  this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
    const guessedCorrect = !words.includes("_");
    return {words,guessedCorrect};
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  

  displayHangmanButtonArea(){
    const html = [];
    const currentGuessState = this.guessedWord();
    if(this.state.nWrong >= 6){
      html.push(...[<h1>You lost</h1>,
      <h3>Correct word was {this.state.answer}</h3>])
    }else if(currentGuessState.guessedCorrect) {
      html.push(<h1>You guessed it correctly!!!</h1>);
    }else if(!currentGuessState.guessedCorrect){
       html.push(...[<p className='Hangman-word' key={40}>{currentGuessState.words}</p>,
      <p className='Hangman-btns' key={30}><AlphaButtons guessed = {this.state.guessed} handleGuess = {this.handleGuess} keys ={"abcdefghijklmnopqrstuvwxyz"}/></p>])
    }
    return html;
  }

  handleRestart(){
    this.setState(str =>({
        nWrong: 0, guessed: new Set(), answer: randomWord() }));
  }
  /** render: render game */
  render() {
    const bottomHTML = this.displayHangmanButtonArea();
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={this.props.images[this.state.nWrong]} alt={`${this.state.nWrong}/ ${this.props.maxWrong}`} />
        <p className="Hangman-wrong-guesses-num">Number of wrong guesses: {this.state.nWrong}</p>
        {bottomHTML}
        <button className="Hangman-button" type="button" onClick={this.handleRestart}>Restart Game</button>
      </div>
    );
  }
}

export default Hangman;
