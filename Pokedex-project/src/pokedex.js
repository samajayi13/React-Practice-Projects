// <Pokedex cards = {x} winner = {true} />

import React,{Component} from "react";
import PokeCard from "./pokecard";

class Pokedex extends Component{
    static defaultProps = {
        cards : [
                    {id: 4, name: 'Charmander', type: 'fire', base_experience: 62},
                    {id: 7, name: 'Squirtle', type: 'water', base_experience: 63},
                    {id: 11, name: 'Metapod', type: 'bug', base_experience: 72},
                    {id: 12, name: 'Butterfree', type: 'flying', base_experience: 178}  
                ],
        winner : false,
        total : 0
    }
    render(){
        var html;
        var {winner,cards,total} = this.props;
        var winnerHTML = winner ? <h1 className="winner">Winning hand</h1> : <h1 className="loser">Losing hand</h1>;
        var totalHTML = <p className="playing-hand__total-eperience">Total experince: {total}</p>
        var cards = cards.map(function(card){
            return <PokeCard card = {card} />
        })

        return (
            
            <div className="playing-hand">
                {winnerHTML}
                {totalHTML}
                {cards}
            </div>
        );

    }
}

export default Pokedex;