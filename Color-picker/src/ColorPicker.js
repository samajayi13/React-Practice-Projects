import React, { Component } from 'react';
import Color from "./Color";
import {randomSelector} from "./helperMethods"

class ColorPicker extends Component{
    static defaultProps = {
        numberOfColor : 30,
        colors : ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Brown","BlanchedAlmond","Blue","brown","BurlyWood","Chocolate","Chartreuse","purple","LightYellow"],

    }

    render(){
        const colorMix = [];
        for(let i  = 0; i< this.props.numberOfColor; i++){
            const randColor = randomSelector(this.props.colors);
            colorMix.push(<Color color={randColor}/>);
        }

        console.log(colorMix);

        return (
            <div>
                {colorMix};
            </div>
        )
    }
}

export default ColorPicker;