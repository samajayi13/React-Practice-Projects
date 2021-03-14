import React, { Component } from 'react'
import ToDoForm from "./ToDoForm";
import ToDoItem from './ToDoItem';
import ToItem from "./ToDoItem";
import { v4 as uuidv4 } from 'uuid';


class ToDoList extends Component{
    constructor(props){
        super(props);
        this.state = {
           items : []
        }
        this.addItem = this.addItem.bind(this);
        this.setItemProp =  this.setItemProp.bind(this);
    }
    
    addItem(itemName){
        this.setState({items : [
                                    ...this.state.items,
                                    {
                                        itemName:itemName,
                                        deleted:false,
                                        editing:false,
                                        id : uuidv4()
                                    }
                                ]
                            });
        
    }

    setItemProp(id,propName,value,newName = ""){
        const items =  this.state.items;
        items.forEach(x=>{
            if(x.id === id){
                x[propName] = value;
                x.itemName  = newName ? newName : x.itemName;
            }
            
        });
        this.setState({items: items});
    }

    
    render(){
        console.log(this.state.items);
        return(
                <div className="ToDoList">
                    <h1 className="ToDoList__heading">
                        <span className="ToDoList__heading-main">ToDo List!</span>
                        <span className="ToDoList__heading-sub">A Simple React ToDo List App</span>
                    </h1>
                    <div className="ToDoTasks">
                        {this.state.items.map(x=>{
                        return  <ToDoItem 
                                        name = {x.itemName} 
                                        deleted = {x.deleted} 
                                        editing = {x.editing} 
                                        key = {x.id} id = {x.id}
                                         setItemProp = {this.setItemProp}
                                />
                        })}    
                    </div>

                    <ToDoForm addItem = {this.addItem} key = {uuidv4()} />    
                </div>
        );
    }
}

export default ToDoList;