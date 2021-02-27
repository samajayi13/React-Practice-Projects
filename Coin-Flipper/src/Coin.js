import React, { Component } from 'react';

class Coin extends Component{
    static defaultProps = {
        type : "heads",
        flipable : false

    }
    render(){
            const {type,flipable} = this.props;
            return <img src={`https://s3-us-west-2.amazonaws.com/s.cdpn.io/194840/${type}.png`} className = {`Coin ${flipable? "flipable" : ""}`}/>;
    }
}

export default Coin;