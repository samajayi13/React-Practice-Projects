import React, { Component } from 'react'

class Box extends Component{
    constructor(props){
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }
    static defaultProps = {
        color : "pink"
    }

    clickHandler(e){
        this.props.clickHandler(e,this._reactInternals.key);
    }
    render(){
        const boxStyle = {backgroundColor : this.props.color};
        return <div className="Box"  style = {boxStyle} onClick= {this.clickHandler}></div>
    }
}

export default Box;