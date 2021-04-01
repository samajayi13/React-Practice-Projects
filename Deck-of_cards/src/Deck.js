import React, { Component } from 'react'

class Deck extends Component{
    constructor(props){
        super(props);

    }
    render(){
        const {image,rotate} = this.props;
        const style = {transform : `rotate(${rotate})`};
        return(
            <img className ="card" src={image} style = { style } />
        )
    }
}

export default Deck;