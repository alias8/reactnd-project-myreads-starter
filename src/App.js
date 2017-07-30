import React, {Component} from "react";
import {Route} from "react-router-dom";
import "./App.css";
import {SearchBooksPage} from "./SearchBooksPage";
import {ListBooksPage} from "./ListBooksPage";
import * as BooksAPI from "./BooksAPI";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        };
    }

    onSubmitChange = (id, selectOption, data) => {
        BooksAPI.update({id}, data).then(response => {
            this.update()
        });
    };

    componentDidMount() {
        this.update();
        //this.clearLocalStorage()
    }

    clearLocalStorage() {
        Object.keys(localStorage).forEach(key => {
            localStorage.removeItem(key)
        })
    }

    update() {
        BooksAPI.getAll().then(books => {
            this.setState({books});
        });
    }

    render() {
        return (
            <div className="app">
                <Route exact path='/search' render={()=> (
                    <SearchBooksPage
                        books={this.state.books}
                        onSubmitChange={this.onSubmitChange}/>)}/>
                <Route exact path="/" render={()=>(
                    <ListBooksPage
                        books={this.state.books}
                        onSubmitChange={this.onSubmitChange}/>)}/>
            </div>
        )
    }
}





