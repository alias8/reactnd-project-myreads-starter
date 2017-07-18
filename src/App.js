import React, {Component} from "react";
import {Route} from "react-router-dom";
import "./App.css";
import {SearchBooksPage} from "./SearchBooksPage";
import {ListBooksPage} from "./ListBooksPage";
import * as BooksAPI from "./BooksAPI";
import {LoadingScreen} from "./LoadingScreen"

export default class BooksApp extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        books: [],
        ratings: []
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
        this.setState({id, rating: 5});
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
                    <ListBooksPage books={this.state.books} ratings={this.state.ratings} onSubmit={this.onSubmit}/>
                )}/>
            </div>
        )
    }
}



