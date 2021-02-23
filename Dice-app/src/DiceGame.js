import React, { Component } from 'react'
import Die from "./Die";

class DiceGame extends Component{
    constructor(props){
        super(props);
        this.state = {
            rolling:false,
            rolled: false,
            numbers : []
        }
        this.roll = this.roll.bind(this);
        this.setUpDices = this.setUpDices.bind(this);

    }
    
 
    static defaultProps = {
        color : "purple",
        numberOfDices : 10
    }

    roll(e){
        let randNums = []
        for(let i = 0; i < this.props.numberOfDices; i++){
            let randNum = Math.floor(Math.random() * 6) +1;
            randNums.push(randNum);
        }
        this.setState({numbers:randNums});
    }

    setUpDices(){
        var dies = [];
        if(this.state.numbers.length > 0){
            let i = -1;
            dies = this.state.numbers.map((x)=>{    
                i++;
                var die =  <Die dieNumber = {this.state.numbers[i]} shakeable={true} />
                return die;
            }) 
         }else{
             for(let i = 0; i< this.props.numberOfDices; i++){
                dies.push(<Die/>);
             }
         }

         return dies;
    }
    

    render(){
        let dies =  this.setUpDices();

        return (
           <div className="DiceGame">
               <div className="DiceGame-Dices">
                    {dies}
               </div>
                <button className="DiceGame__btn" onClick={this.roll}>Roll</button>
           </div>
        )
    }

}

export default DiceGame;