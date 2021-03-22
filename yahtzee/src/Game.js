import React, { Component } from 'react'
import Dice from "./Dice";
import { v4 as uuidv4 } from 'uuid';
import RollButton from "./RollButton";
import GameTable from "./GameTable";
class Game extends Component{
    constructor(props){
        super(props);
        this.state = {
            dices : this.resetDices(6),
            numberOfRolls : 2,
            buttonDisabled: false,
            upperTable : this.setUpperTable(),
            bottomTable : this.setLowerTable(),
            total : 0
        }
        this.resetDices = this.resetDices.bind(this);
        this.freezeDice = this.freezeDice.bind(this);
        this.rollDices = this.rollDices.bind(this);
        this.getRandomDices = this.getRandomDices.bind(this);
        this.setUpperTable = this.setUpperTable.bind(this);
        this.setLowerTable = this.setLowerTable.bind(this);
        this.simples = this.simples.bind(this);
        this.numOfKind = this.numOfKind.bind(this);
        this.getTableInformation = this.getTableInformation.bind(this);
        this.fullHouse = this.fullHouse.bind(this);
        this.straights = this.straights.bind(this);
        this.chance = this.chance.bind(this);
    }

    setUpperTable(){
        let upperTable = [];
        const names = ["Ones","Twos","Threes","Fours","Fives","Sixes"];
        for(let i = 0 ; i < 6; i++){
            upperTable.push({
                name : names[i],
                info : `${i+1} points per ${i+1}`,
                completed: false,
                key : uuidv4(),
                id : i+1
            })
        }

        return upperTable;
    }

    setLowerTable(){
        let lowerTable = [];
        const names = ["Three of Kind","Four of Kind","Full House","Small Straight","Large Straight","Yahtzee","Chance"];
        const info = ["Sum of dice if 3 are the same", "Sum all dice if 4 are the same","25 points for a full house","30 points for a small straight","40 points for a large straight","50 points for yahtzee","Sum of all dice"]
        for(let i = 0 ; i <= 6; i++){
            lowerTable.push({
                name : names[i],
                info : info[i],
                completed: false,
                key : uuidv4(),
                id : 7 + i 
            })
        }

        return lowerTable;
    }

    getRandomDices(){
        const dices = this.state.dices;
        dices.forEach(x=>{
            if(!x.frozen){
                x.number = Math.floor(Math.random() * 6) +1;
                x.number = 6
                x.rolling  =  false;
                x.frozen = (this.state.numberOfRolls-1) > 0 ? x.frozen  : true;
            }
        })
        return dices;
    }

    rollDices(e){
        let numberOfRolls = this.state.numberOfRolls;
        if(numberOfRolls <= 0 ){return;}
        
        const dices  = this.state.dices;
        dices.forEach(x=>{
            if(!x.frozen){
                x.rolling = true;
            }
        });

        this.setState({dices : dices, buttonDisabled:true});

        setTimeout(x=>{
            numberOfRolls--;
            this.setState({
                                        dices : this.getRandomDices(), 
                                        buttonDisabled : numberOfRolls > 0 ? false : true,
                                        numberOfRolls : numberOfRolls});
        },2000);

    }

    resetDices(number,rolling = false){
        const dices = [];
        for(let i = 0 ; i < number; i ++){
            dices.push({
                    number: Math.floor(Math.random() * 6) +1,
                    rolling,
                    frozen : false,
                    id : uuidv4()
                });
        }
        return dices;
    }

    freezeDice(id){
        const dices = this.state.dices ;
        dices.forEach(x=>{
            if(x.id === id){
                x.frozen  = !x.frozen;
            }
        });

        this.setState({dices : dices});
    }

    simples(id,table){
        let score = 0; 
        let total = this.state.total;
        this.state.dices.forEach(x=>{
            if(x.number === id){
                score += id;
            }
        })
        // total += score;
        let stateTable = this.state[table];
        stateTable.forEach(x=>{
            if(x.id === id){
                x.info = score;
                x.completed = true;
            }
        });

        this.gameTurnOver(table,score,total,id);
    }

    gameTurnOver(table,score,total,id){

        let stateTable = this.state[table];
        stateTable.forEach(x=>{
            if(x.id === id){
                x.info = score;
                x.completed = true;
            }
        });

        this.setState({
            [table]:stateTable,
            dices:this.resetDices(6,true),
            numberOfRolls : 2,
            buttonDisabled : false,
            total : total + score
        });

        setTimeout(() => {
            this.setState({
                dices:this.resetDices(6,false),
            });
        }, 2000);
        
    }

    numOfKind(num,table,id){
        const diceObj = this.getTableInformation(this.state.dices);
        let score = 0;
        let total = this.state.total;
        if(Object.values(diceObj).indexOf(num) !== -1 ){
           score = this.state.dices.reduce((accum,x)=>{
                return accum += x.number;
            },0);
        }

        this.gameTurnOver(table,score,total,id);
    }

    fullHouse(id,table){
        const diceObj = this.getTableInformation(this.state.dices);
        let score = 0;
        let total = this.state.total;

        if(Object.values(diceObj).indexOf(3) !== -1 && Object.values(diceObj).indexOf(2) !== -1){
            score = 25;
        }

         this.gameTurnOver(table,score,total,id);
        
    }

    straights(id,table,num){
        let score = 0;
        let total = this.state.total;
        let previousNum = this.state.dices[0].number;
        let count = 1;

        for(let i  = 1; i< this.state.dices.length;i++){
            if(this.state.dices[i].number === previousNum){
                count++;

            }else{
                if(count < num){
                    count = 0;
                }
            }
            previousNum = this.state.dices[i].number;
        }

        if(count >= num){
            if(num ===4)
                score = 30
            if(num === 5)
                score = 40
            if(num === 6)
                score = 50
        }

        this.gameTurnOver(table,score,total,id);
    }

    chance(id,table){
        const dices = this.state.dices;
        const score = dices.reduce((accum,x)=>{
            accum += x.number;
            return accum;
        },0);

        this.gameTurnOver(table,score,this.state.total,id);
    }

    getTableInformation(table){
        console.log("dices",table);
        let obj = table.reduce((accum,x)=>{
            console.log("accumt: ",accum);
            if(accum[`${x.number}`] !== undefined){
                accum[`${x.number}`]  += 1;
            }else{
                accum[`${x.number}`] = 1;
            }
            return accum;
        },{});
        return obj;
    }

    render(){
        
        return(
            <div className="Game">
            <div className="Game__heading">
                <span className="heading">Yahtzee!</span>
                <div className="Game__dices">
                    {this.state.dices.map(x=>{
                         return  <Dice {...x} onClick = {this.freezeDice} key = {x.id}/>
                      })}

                </div>
                <RollButton 
                            numberOfRolls = {this.state.numberOfRolls} 
                            onClick = {this.rollDices}
                            disabled = {this.state.buttonDisabled}
                />
            </div>
            <div className="Game__bottom">
              <div className="Game__bottom__table">
                <GameTable heading = "Upper" table ={this.state.upperTable} simples = {this.simples} numOfKind = {this.numOfKind}/>
                <GameTable heading = "Bottom" table ={this.state.bottomTable} numOfKind = {this.numOfKind} fullHouse={this.fullHouse} straights={this.straights} chance = {this.chance}/>
              </div>
            </div>
            <h1 className="Game-fullscore">
              <span className="totalscore">Total score: {this.state.total}</span>
            </h1>
          </div>
        )
    }
}

export default Game;