import React, { Component } from 'react'
import "./DeckOfCards.css"
import Deck from "./Deck"
import axios from "axios"
import { uuid } from 'uuidv4';

class DeckOfCards extends Component{
    constructor(props){
        super(props);
        this.state = {
            cards : [],
            numOfCardsDrawn: 0,
            btnDisabled : false 
        }
        this.deckID = null;
        this.btnClickHandler = this.btnClickHandler.bind(this);
        this.addCardToDeck = this.addCardToDeck.bind(this);
        this.getCardRotation = this.getCardRotation.bind(this);
    }

    componentDidMount(){
        axios.post("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        .then((response)=>{
            this.deckID = response.data.deck_id;
        })
    }

    componentDidUpdate(currState,prevState){
        if(this.state.numOfCardsDrawn >=52 && this.btnDisabled === false){
            alert("Cards finished");
        }
        console.log("in component did update");
    }
    componentWillUnmount(){
        clearTimeout(this.setTimeoutID);
        console.log("in component did unmount");
    }

    btnClickHandler(e){
        if(this.state.numOfCardsDrawn < 52){
            axios.post(`https://deckofcardsapi.com/api/deck/${this.deckID}/draw/?count=2`)
            .then(({data})=>{
                console.log(data);
                this.addCardToDeck(data.cards[0]);
            });
        }
    }

    addCardToDeck({code,image,suit,value}){
        const cardDrawn = {code,image,suit,value,rotate:this.getCardRotation()};
        this.setState(currState =>{
            return {
                numOfCardsDrawn : currState.numOfCardsDrawn+1,
                cards : [...currState.cards,cardDrawn],
                btnDisabled : true
            }
        });

       this.setTimeoutID = setTimeout(()=>{
            this.setState(currState =>{return {btnDisabled : false}})
        },1000);
    }

    getCardRotation(){
        return Math.floor(Math.random() * 360 + 1) + "deg";

    }
    render(){
        return (
            <div className="DeckOfCards">
                <h1 className="heading">
                    <i className="far fa-gem"></i>
                    <span className="heading-title">Card Dealer</span>
                    <i className="far fa-gem"></i>
                </h1>
                <h4 className="sub-title">
                    <i className="far fa-gem"></i>
                    <span>A Little Demo made with react</span>
                    <i className="far fa-gem"></i>
                </h4>
                <button 
                        className="deal-btn"
                        onClick = {this.btnClickHandler}
                        disabled = {this.state.disabled && this.state.numOfCardsDrawn < 52}
                        >Deal Me A Card
                </button>
                {this.state.cards.map(x=>{
                    return <Deck key ={uuid()} image = {x.image} rotate = {x.rotate}/>
                })}
            </div>
        )
    }

}

export default DeckOfCards;