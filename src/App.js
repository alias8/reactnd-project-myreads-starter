import React, {Component} from "react";
import {Route} from "react-router-dom";
import "./App.css";
import {SearchBooksPage} from "./SearchBooksPage";
import {ListBooksPage} from "./ListBooksPage";
import * as BooksAPI from "./BooksAPI";

export default class BooksApp extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        books: []
    }

    componentDidMount() {
        this.update()
    }

    update() {
        BooksAPI.getAll().then(books => {
            this.setState({books})
        })
    }

    onSubmit = (id, shelf) => {
        BooksAPI.update({id}, shelf).then(response => {
            this.update()
        })
    }

    render() {
        return (
            <div className="app">
                <Route exact path='/search' render={() => (
                    <SearchBooksPage onSubmit={this.onSubmit}/>
                )}/>
                <Route exact path="/" render={() => (
                    <ListBooksPage books={this.state.books} onSubmit={this.onSubmit}/>
                )}/>
            </div>
        )
    }
}
