import React, { Component } from 'react'
import DiceGame from './DiceGame';

class Die extends Component{
    constructor(props){
        super(props);
    }

    static defaultProps = {
        dieNumber : 1,
        shakeable: false
    }

    getWordNumber(num){
        let words = ["one","two","three","four","five","six"];
        return words[num-1];
    }

    render(){
        let alphaNumber = this.getWordNumber(this.props.dieNumber);
        let iconClassName = `fas fa-dice-${alphaNumber} `;
        iconClassName += this.props.shakeable ? "shakeable": "";
        return <i className={iconClassName}></i>
    }
}


export default Die;