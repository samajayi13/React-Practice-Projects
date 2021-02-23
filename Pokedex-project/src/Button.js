import React, { Component } from 'react'


class Button extends Component{
    constructor(props){
        super(props);
        this.state = {clicked:false};
        this.buttonHandler = this.buttonHandler.bind(this);
    }

    buttonHandler(e){
        if(this.state.clicked === true){
            this.setState({clicked:false});
        }else{
            this.setState({clicked:true});
        }
    }
    render(){
        return(
            <div>
                <h1>{this.state.clicked === true? "Clicked": "Not clicked"}</h1>
                <button onClick={this.buttonHandler}>Click me</button>
            </div>
        )
    }
}


export default Button;