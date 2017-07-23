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

    merge(prevState) {
        return prevState.books.map(book => { // merge ratings into book state
            const myRating = prevState.ratings.filter(rating => rating.id === book.id);
            if(myRating.length === 1) {
                book.rating = myRating[0].rating;
            } else if(myRating.length === 0) {
                book.rating = "unrated"
            }
            return book;
        });
    }

    update() {
        BooksAPI.getAll().then(books => {
            if (this.state.ratings.length === 0) this.initRatings(books);
            const mergedBooks = this.merge(books)
            this.setState({books: mergedBooks});
        })
    }

    onSubmitCategoryChange = (id, shelf) => {
        BooksAPI.update({id}, shelf).then(response => {
            this.update()
        })
    };

    onSubmitRatingsChange = (id, rating) => {
        this.setState((prevState, props) => {
            const ratings = prevState.ratings.map(r => {
                if (r.id === id) r.rating = rating;
                return r;
            });
            const books = this.merge(prevState)
            return {books, ratings};
        });

    };

    render() {
        return (
            <div className="app">
                <Route exact path='/search' render={() => (
                    <SearchBooksPage onSubmitCategoryChange={this.onSubmitCategoryChange}/>
                )}/>
                <Route exact path="/" render={() => (
                    <ListBooksPage
                        books={this.state.books}
                        onSubmitCategoryChange={this.onSubmitCategoryChange}
                        onSubmitRatingsChange={this.onSubmitRatingsChange}/>
                )}/>
            </div>
        )
    }
}



