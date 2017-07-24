import React, {Component} from "react";
import {Route} from "react-router-dom";
import "./App.css";
import {SearchBooksPage} from "./SearchBooksPage";
import {ListBooksPage} from "./ListBooksPage";
import * as BooksAPI from "./BooksAPI";
import * as Globals from "./Globals";

export default class BooksApp extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        books: [],
        ratings: []
    };

    componentDidMount() {
        this.update();
        this.clearLocalStorage()
    }

    clearLocalStorage() {
        Object.keys(window.localStorage).forEach(key=> {
            window.localStorage.removeItem(key)
        })
    }

    update() {
        BooksAPI.getAll().then(books => {
            this.setState({books});
        });
        const keys = Object.keys(window.localStorage);
        let ratings = [];
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if(key.includes(Globals.localStorageToken)) { // only include tokens from this session
                const value = window.localStorage[key];
                ratings.push(JSON.parse(value));
            }
        }
        this.setState({ratings});
    }

    onSubmitChange = (id, selectOption, data) => {
        switch (selectOption) {
            case "select shelf":
                BooksAPI.update({id}, data).then(response => {
                    this.update()
                });
                break;
            case "select rating":
                let obj = {id, rating: data};
                window.localStorage.setItem(`${Globals.localStorageToken} ${id}`, JSON.stringify(obj));
                this.update();
                break;
        }
    };

    render() {
        return (
            <div className="app">
                <Route exact path='/search' render={() => (
                    <SearchBooksPage onSubmitChange={this.onSubmitChange}/>
                )}/>
                <Route exact path="/" render={() => (
                    <ListBooksPage
                        books={this.state.books}
                        ratings={this.state.ratings}
                        onSubmitChange={this.onSubmitChange}/>
                )}/>
            </div>
        )
    }
}



