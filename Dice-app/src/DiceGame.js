import React, { Component } from 'react'
import Die from "./Die";

class DiceGame extends Component{
    constructor(props){
        super(props);
        this.state = {
            rolling:false,
            numbers : []
        }
        this.roll = this.roll.bind(this);
        this.setUpDices = this.setUpDices.bind(this);
        this.makeRandomNumbers = this.makeRandomNumbers.bind(this);

    }
    
 
    static defaultProps = {
        color : "purple",
        numberOfDices : 10
    }

    makeRandomNumbers(){
        let randNums = []
        for(let i = 0; i < this.props.numberOfDices; i++){
            let randNum = Math.floor(Math.random() * 6) +1;
            randNums.push(randNum);
        }
        return randNums;
    }
    roll(e){
        let randNums = this.makeRandomNumbers();
        this.setState({numbers:randNums,rolling:true});
        setTimeout(() => {
            this.setState({rolling : false });
            console.log("working timeout");
            console.log(this);
        }, 5000);
    }

    setUpDices(){
        var dies = [];
        if(this.state.numbers.length > 0){
            let i = -1;
            dies = this.state.numbers.map((x)=>{    
                i++;
                var die =  <Die dieNumber = {this.state.numbers[i]} shakeable={this.state.rolling} />
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
                <button className="DiceGame__btn" onClick={this.roll} disabled={this.state.rolling}> 
                                                                                {this.state.rolling === true
                                                                                 ? "Rolling..." 
                                                                                : "Roll"}
                                                                                </button>
           </div>
        )
    }

}

export default DiceGame;
