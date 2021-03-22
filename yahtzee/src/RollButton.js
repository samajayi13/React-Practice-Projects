import React, { Component } from 'react'

class RollButton extends Component{
    constructor(props){
        super(props);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onClickHandler(e){
        this.props.onClick();
    }
    render(){
        const {numberOfRolls,disabled} = this.props;
        const className = `RollButton ${disabled ? "disabled" : ""}`;
        return <button 
                        className={className} 
                        onClick = {this.onClickHandler}
                        disabled = {disabled}>{numberOfRolls} Rolls Left</button>
    }
}

export default RollButton;