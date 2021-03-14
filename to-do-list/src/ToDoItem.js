import React, { Component } from 'react'

class ToDoItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            textInput : this.props.name
        };
        this.onInputHandler = this.onInputHandler.bind(this);
        this.onPenClickHandler = this.onPenClickHandler.bind(this);
        this.editBtnOnClickHandler = this.editBtnOnClickHandler.bind(this);
        this.onDeleteClickHandler = this.onDeleteClickHandler.bind(this);
    }

    onInputHandler(e){
        this.setState({
            [e.target.id] : e.target.value
        });
    }
    onPenClickHandler(e){
        this.props.setItemProp(this.props.id,"editing",true);
    }

    editBtnOnClickHandler(e){
        this.props.setItemProp(this.props.id,"editing",false,this.state.textInput);
    }

    onDeleteClickHandler(e){
        this.props.setItemProp(this.props.id,"deleted",!this.props.deleted,this.state.textInput);
    }
    render(){
        const {name,deleted,editing} = this.props
        
        return (
            <div>
                {editing === true
                    ? <div className="ToDoForm edit-form">
                            <form className="form-inline">
                                <div className="form-group mx-sm-3">
                                    <input type="text" className="form-control" id="textInput" placeholder="" value ={this.state.textInput} onInput = {this.onInputHandler}/>
                                </div>
                                <button type="button" className="btn btn-primary mb-2" onClick ={this.editBtnOnClickHandler}>Save</button>
                            </form>
                        </div> 
                    : <div class="ToDoTask">
                            <span className={"ToDoTask__task-name " +  (deleted ? "line-through" : "")}> {name}</span>
                            <div className="icons">
                                <i className="fas fa-pen" onClick= {this.onPenClickHandler}></i>
                                <i className="fas fa-trash-alt" onClick = {this.onDeleteClickHandler}></i>
                            </div>
                     </div>
                }
            </div>
                
            );
    }
}

export default ToDoItem;