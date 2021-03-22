import React, { Component } from 'react'
import Line from "./Line";
class GameTable extends Component{
    constructor(props){
        super(props);
        this.lineOnClick = this.lineOnClick.bind(this);
    }

    lineOnClick(id){
        let {simples,numOfKind,fullHouse,straights,heading,chance} = this.props;
        console.log(this.props);
        heading = heading.toLowerCase()+"Table";
        switch(id){
            case 1: case 2: case 3: case 4: case 5: case 6:
                simples(id,heading);
                break;
            case 7:
                 numOfKind(3,heading,id);
                 break;
            case 8:
                numOfKind(4,heading,id);
                 break;
            case 9:
                fullHouse(id,heading);
                break;
            case 10:
                straights(id,heading,4);
                break;
            case 11:
                straights(id,heading,5);
                break;
            case 12:
                straights(id,heading,6);
                break;
            case 13:
                chance(id,heading);
                break;
        }
    }
    render(){
        const {table} = this.props;
        return (
            <div>
                <span className="table-title">
                    {this.props.heading}
                </span>
                <div className="table-content">
                  {table.map(x=>{
                      return <Line {...x}  onClick ={this.lineOnClick}/>
                  })}
                </div>
            </div>
        )
    }
}

export default GameTable;