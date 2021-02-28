import React, { Component } from 'react'
import {randomSelector} from "./helperMethods"


class Color extends Component{
    constructor(props){
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
        this.updateColor = this.updateColor.bind(this);
        this.state = {
            color : ""
        }
    }

    static defaultProps = {
        colors : ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Brown","BlanchedAlmond","Blue","brown","BurlyWood","Chocolate","Chartreuse","purple","LightYellow"],
        color : "red"
    }

    
    updateColor(){
        let randColor = "";
        do{
            randColor = randomSelector(this.props.colors);
        }while(randColor === this.props.color);
        
         this.setState(curState => {
            return {color: randColor}
        });

    }

    clickHandler(e){
        this.updateColor();
    }

    render(){
        const {color} = this.props;
        return <div
                    style = {{
                                backgroundColor : this.state.color === "" 
                                                  ? color 
                                                  : this.state.color,
                                width : "150px",
                                height : "150px",
                                float: "left"
                            }}
                    onClick = {this.clickHandler} >
                </div>
    }
}


export default Color;