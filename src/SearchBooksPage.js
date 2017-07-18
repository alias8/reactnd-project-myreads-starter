import React, {Component} from "react";
import {Link} from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import {BookShelf} from "./BookShelf";

export class SearchBooksPage extends Component {
    state = {
        query: '',
        books: []
    };

    updateQuery = (query) => {
        this.setState({query: query.target.value.trim()})
    };

    handleSubmit = (event) => {
        event.preventDefault();
        let query = this.state.query;
        BooksAPI.search(query, 10).then(books => {
            if(books.length > 0) {
                this.setState({books})
			} else {
                let a= 2;
            }
        })
    };

    render() {
        const {query} = this.state;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <form onSubmit={this.handleSubmit}>
                            <input type="text"
                                   placeholder="Search by title or author"
                                   value={query}
                                   onChange={this.updateQuery}
                            />
                        </form>
                    </div>
                </div>
                <div className="search-books-results">
                    <BookShelf shelfTitle={"Search Results"} books={this.state.books} onSubmit={this.props.onSubmit}/>
                </div>
            </div>
        )
    }
}