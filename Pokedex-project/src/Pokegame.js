import React,{Component} from "react";
import Pokedex from "./pokedex"
function getWinner(teams){
    var winningTeam;
    var maxTotal = 0;
    var totals  = {};

    teams.forEach(function(team,i){
        var total = 0;

        team.forEach(function(x){
         total += x.base_experience;
        });

        totals[`${i}`] = total;

        if(total > maxTotal ){
            winningTeam = i;
            maxTotal = total;
        }
    });

    totals.winningTeam = winningTeam;
    return totals;
}
class PokeGame extends Component{
    static defaultProps = {
        teams : []
    }
    render(){
        var {teams} = this.props;
        if(teams.length  === 0 ){
            return <h1>No teams passed</h1>;
        }
        var totals = getWinner(teams);
        var teamIndex = -1;
        
        var teamsHTML = teams.map(function(x){
            teamIndex++;
           return teamIndex === totals.winningTeam 
                ? <Pokedex cards = {x} winner = {true} total = {totals[`${teamIndex}`]} />
                : <Pokedex cards = {x} winner = {false} total = {totals[`${teamIndex}`]}/>;
        });

        return (
            <div>
                {teamsHTML}
            </div>
        );
        
    }
}

export default PokeGame;