import React, { Component } from 'react';
import Coin from "./Coin";

class CoinFlipper extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentSide : "heads",
            tails : 0,
            heads : 0,
            numberOfFlips : 0,
            flipping: false
        }

        this.flip = this.flip.bind(this);
        this.increaseFlips = this.increaseFlips.bind(this);
    }

    flip(){
       const randNum = Math.floor(Math.random()*2) + 1;
       this.result = randNum === 1 ? "heads" : "tails";

       this.setState({
           currentSide : this.state.currentSide,
           flipping : true
       });
       
       setTimeout( () => {
            this.setState({
                             currentSide : this.result,
                             flipping : false,
                             ... this.increaseFlips()
                        });
        },4000);

    }

    increaseFlips(){
        let curState = this.state;
        const numHeads = this.result === "heads" ? curState.heads + 1 : curState.heads;
        const numTails = this.result === "tails" ? curState.tails + 1 : curState.tails;
        return {
                    numberOfFlips :curState.numberOfFlips + 1,
                    heads : numHeads, 
                    tails : numTails 
                };
    }
    render(){
        const info =  `Out of ${this.state.numberOfFlips} flips, there have been ${this.state.heads} heads and ${this.state.tails} tails `;
        return(
            <div className="CoinFlipper">
                <h1 className="CoinFlipper__title">Let's flip a coin!</h1>
                    <Coin type={this.state.currentSide} flipable = {this.state.flipping}/>
                <button className="CoinFlipper__btn" onClick ={this.flip} disabled ={this.state.flipping}>Flip Me</button>
                <p>{info}</p>
            </div>
        )
    }
}

export default CoinFlipper;