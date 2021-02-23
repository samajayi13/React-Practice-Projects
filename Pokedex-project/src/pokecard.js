import React, {Component} from "react";

function formatID(id){
    var formated = "";
    if(`${id}`.length === 1){
        formated = "00" + id;
    }else if (`${id}`.length === 2){
        formated = "0" + id;
    }else{
        formated = ""+ id;
    }

    return "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/"+ formated +  ".png";

}
class PokeCard extends Component{
    render(){
        var {id, name,type,base_experience} = this.props.card;
        // return <span>{id} {name} {type} {base_experience}</span>;
        id = formatID(id);
        return <div className="playing-hand__card">
                <div className="card-img">
                    <img src={id}></img>
                </div>
                <div className="card-info">
                    <h4 className="card-info__name">{name}</h4>
                    <p className="card-info__type">Type:{type}</p>
                    <p className="card-info__EXP">EXP:{base_experience}</p>
                </div>
                
                
        </div>;
    }
}

export default PokeCard;