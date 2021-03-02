import React, { Component } from 'react'


class AlphaButtons extends Component{
    constructor(props){
        super(props);
        this.handleGuess = this.handleGuess.bind(this);
    }

    handleGuess(evt){
        this.props.handleGuess(evt);
    }
    static defaultProps ={
        keys : "abcdefghijklmnopqrstuvwxyz",
        handleGuess : null,
        guessed : null
    }

    /**return array of letter buttons to render */

    render(){
        return this.props.keys.split("").map((ltr,index) => (
            <button
              value={ltr}
              onClick={this.handleGuess}
              disabled={this.props.guessed.has(ltr)}
              key = {index}
            >
              {ltr}
            </button>
          ));
    }
}

export default AlphaButtons;