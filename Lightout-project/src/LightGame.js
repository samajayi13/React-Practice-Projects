import React, { Component } from 'react'
import Box from "./Box.js"

class LightGame extends Component{
    constructor(props){
        super(props);
        const boxesArray = [];
        for(let i = 1; i <=25; i ++){
            boxesArray.push(Math.floor(Math.random() * 10)% 3 === 0 ? true : false);
        }
        this.state = {
            // selected : [
            //     false,false,false,false,false,
            //     false,false,false,false,false,
            //     false,false,false,false,false,
            //     false,false,false,false,true,
            //     false,false,false,true,true
            // ]
            selected : boxesArray
        };

        this.clickHandler = this.clickHandler.bind(this);
        this.findNeigbours = this.findNeigbours.bind(this);
    }

    static defaultProps = {
       colors : ["white","blue"]
    }

    findNeigbours(key){
        key = parseInt(key);
        const selected = [key];
        //right
        if((key + 1)  % 5 !== 1){
            selected.push(key + 1);
        }
        //left
        if((key-1) % 5 !== 0){
            selected.push(key-1);
        }
        //bottom
        if((key + 5) <= 25){
            selected.push(key+5);
        }
        //top
        if((key-5) >= 1 ){
            selected.push(key-5)
        }
        return selected;
    }
    clickHandler(e,key){
       const selected = this.findNeigbours(key);
       this.setState(curState => {
           return {
               selected : curState.selected.map((x,index)=>{
                    return selected.includes(index+1) 
                                ? !x
                                : x;
                })
        }
       });
    }
    render(){
        const winner = this.state.selected.every(x=>{
            return x === false;
        });
        const winnerStyle = {display : winner === false ? "none" : "block"};
        const divStyle = {display: winner === true ? "none" : "block"}
        console.log(divStyle)
        return (
            <div className="LightGame">
                <h1 style={winnerStyle}>You win!!!!</h1>
                <div style={divStyle} >
                    {this.state.selected.map((x,i)=>{
                        const index = x === true ? 1 : 0;
                        return <Box 
                                    color = {this.props.colors[index]}
                                    clickHandler = {this.clickHandler}
                                    key = {i+1}
                                />;
                    })}
                </div>
                
            </div>
        ) 
    }
}

export default LightGame;