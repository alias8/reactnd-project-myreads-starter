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
        books: [],
        ratings: []
    };

    componentDidMount() {
        this.update();
    }

    initRatings(books) {
        const ratings = books.map(book => {
            return {id: book.id, rating: "unrated"}
        });
        this.setState({ratings})
    }

    update() {
        BooksAPI.getAll().then(books => {
            this.setState({books: books});
            if (this.state.ratings.length === 0) {
                this.initRatings(books)
            }
        })
    }

    onSubmitCategoryChange = (id, shelf) => {
        BooksAPI.update({id}, shelf).then(response => {
            this.update()
        })
    };

    onSubmitRatingsChange = (id, rating) => {
        this.setState(function (prevState, props) {
            let a = {ratings: Object.assign({}, prevState.ratings, [{id, rating}])};
            return a; // why doesn't this work?
        });
    };

    render() {
        return (
            <div className="app">
                <Route exact path='/search' render={() => (
                    <SearchBooksPage onSubmit={this.onSubmitCategoryChange}/>
                )}/>
                <Route exact path="/" render={() => (
                    <ListBooksPage
                        books={this.state.books}
                        ratings={this.state.ratings}
                        onSubmitCategoryChange={this.onSubmitCategoryChange}
                        onSubmitRatingsChange={this.onSubmitRatingsChange}/>
                )}/>
            </div>
        )
    }
}



