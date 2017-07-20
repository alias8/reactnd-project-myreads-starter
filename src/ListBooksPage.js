import React, {Component} from "react";
import {Link} from "react-router-dom";
import {BookShelf} from "./BookShelf";
import {LoadingScreen} from "./LoadingScreen"

export class ListBooksPage extends Component {
    render() {
        let currentlyReading = this.props.books.filter(book => book.shelf === "currentlyReading");
        let wantToRead = this.props.books.filter(book => book.shelf === "wantToRead");
        let read = this.props.books.filter(book => book.shelf === "read");

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                {this.props.books.length === 0 &&
                <LoadingScreen/>}
                <div className="list-books-content">
                    <BookShelf shelfTitle={"Currently Reading"}
                               books={currentlyReading}
                               ratings={this.props.ratings}
                               onSubmitCategoryChange={this.props.onSubmitCategoryChange}
                               onSubmitRatingsChange={this.props.onSubmitRatingsChange}/>
                    <BookShelf shelfTitle={"Want to Read"}
                               books={wantToRead}
                               ratings={this.props.ratings}
                               onSubmitCategoryChange={this.props.onSubmitCategoryChange}
                               onSubmitRatingsChange={this.props.onSubmitRatingsChange}/>
                    <BookShelf shelfTitle={"Read"}
                               books={read}
                               ratings={this.props.ratings}
                               onSubmitCategoryChange={this.props.onSubmitCategoryChange}
                               onSubmitRatingsChange={this.props.onSubmitRatingsChange}/>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
}