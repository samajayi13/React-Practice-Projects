import React, { Component } from 'react'


class ToDoForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            textInput : ""
        }
        this.onClickHandler = this.onClickHandler.bind(this);
        this.onInputHandler = this.onInputHandler.bind(this);

    }
    onClickHandler(e){
        if(this.state.textInput){
            this.props.addItem(this.state.textInput)
        }
    }

    onInputHandler(e){
        this.setState({[e.target.id] : e.target.value});
    }
    render(){
        return(
            <div className="ToDoForm">
                <h3>New Todo</h3>
                <form className="form-inline">
                    <div className="form-group mx-sm-3">
                        <input 
                                type="text" 
                                className="form-control" 
                                id="textInput" 
                                placeholder=""
                                onInput={this.onInputHandler}
                                value = {this.state.textInput}
                        /> 
                    </div>
                    <button 
                            type="button" 
                            className="btn btn-primary mb-2"
                            onClick = {this.onClickHandler}
                     >Add TODO</button>
                </form>
            </div>
        );
    }
}

export default ToDoForm;