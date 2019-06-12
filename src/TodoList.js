import React, {Component} from "react";
import './TodoList.css';

export default class  TodoList  extends Component {

    onChange = (id, e) =>{
        this.props.onChange(id, e);
    };

    render() {
        const list = this.props.list;
        const todoList = list.map( (item) =>

            <li key={item.id}
                className="list-item"
                style={ item.checked ? {textDecoration: "line-through"} : {textDecoration: "none"}  }
            >
                <input type="checkbox"
                       checked={item.checked}
                       onChange={ (e) => this.onChange(item.id, e)}
                />

                {item.title}

                <button
                    onClick={ () => {this.props.deleteItem(item.id) } }>
                    X
                </button>
            </li>
        );
        return (
            <ul className="list">
                {todoList}
            </ul>
        );
    }

}