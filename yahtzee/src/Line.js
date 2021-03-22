import React, { Component } from 'react'

class Line extends Component{
    constructor(props){
        super(props);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onClickHandler(e){
        const {id,onClick,completed} = this.props;
        if(!completed)
            onClick(id);
    }
    render(){
        const {info,name,completed} = this.props;
        const className = `Line ${completed ? "completed" : ""}`;
        return <p className={className} onClick = {this.onClickHandler}>{name} <span class="Line-info">{info}</span></p>
    }
}

export default Line;