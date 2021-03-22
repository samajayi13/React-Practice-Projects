import React, { Component } from 'react'

class Dice extends Component{
    constructor(props){
        super(props);
        this.numberName = this.numberName.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onClickHandler(e){
        console.log(this.props);
        this.props.onClick(this.props.id);
    }
    numberName(number){
        return ["one","two","three","four","five","six"][number-1];
    }

    render(){
        const {number,rolling,frozen} = this.props;
        const className = `fas fa-dice-${this.numberName(number)} Dice__${frozen? "not-active":"active"} ${rolling ? "rolling" : "" }`;
        return <i className={className} onClick = {this.onClickHandler}></i>
    }
}

export default Dice;