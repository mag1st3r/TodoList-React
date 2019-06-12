import React, { Component } from 'react';
import TodoList from "./TodoList"
import './App.css';

export default class  App  extends Component {
    idList = 0;

    state = {
        todoList: [
            this.createTodoItem('Do first'),
            this.createTodoItem('Do second'),
            this.createTodoItem('Do third'),
        ],
        inputValue:"",
        filter: "all"
    };

    createTodoItem  (title)  {
        return {
            title: title,
            checked: false,
            id: this.idList++
        };
    };

    addItem = () => {

        const newItem = this.createTodoItem(this.state.inputValue);
        let todoList = this.state.todoList;
        const  newArr = [...todoList, newItem];

        this.setState({
            todoList: newArr,
            inputValue: ''
        });

    };

    deleteItem = (id) => {
        let todoList = this.state.todoList;

        const indexDelete = todoList.findIndex((el) => el.id === id);
        const before = todoList.slice(0, indexDelete);
        const after = todoList.slice(indexDelete + 1);
        const newArr = [...before, ...after];

       this.setState({
            todoList: newArr
        });
    };

    onChangeInput = (txt) => {
        const text = txt;
        this.setState({
            inputValue: text
        });

    };

    onChangeCheckBox = (id) => {
        let newTodoList = this.state.todoList;
        let newArr = [...newTodoList];
        const index = newArr.findIndex((el) => el.id === id);
        newArr[index].checked =  !newArr[index].checked;

       this.setState({
           todoList: newArr
       });

    };

    changeFilter = (e) => {
        e.preventDefault();
        this.setState({
            filter:e.currentTarget.innerText
        });
    };

    changeArr(filter) {
        let newTodoList = this.state.todoList;
        let newArr = [...newTodoList];

        if(filter === "Active") {
            return newArr.filter((item) => !item.checked);
        }
        if(filter === "Done") {
            return newArr.filter((item) => item.checked);
        }else{ return newArr }

    }

    render() {

        const filter = this.state.filter;
        const newArr = this.changeArr(filter);

        return (
            <div>
                <div>
                    <input type="text"
                           onChange={ (e) => this.onChangeInput(e.target.value)}
                           value={this.state.inputValue}
                    />
                    <button onClick={ () => this.addItem()}>Add</button>
                </div>
                <div>
                    <div>
                        <TodoList
                            list={newArr}
                            onChange={this.onChangeCheckBox}
                            deleteItem={this.deleteItem}

                        />
                    </div>

                </div>
                <div>
                    <p>
                        Show:
                        <a href="All"
                           onClick={ (e) => {this.changeFilter(e)}}
                        >All</a>
                        {" "}
                        <a href="Active"
                           onClick={ (e) => {this.changeFilter(e)}}
                        >Active</a>
                        {" "}
                        <a href="Done"
                           onClick={ (e) => {this.changeFilter(e)}}
                        >Done</a>
                    </p>

                </div>
            </div>

        );
    }
}

