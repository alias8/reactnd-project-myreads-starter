import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {BookShelf} from "./BookShelf";

export class ListBooksPage extends Component {
    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {this.props.shelves.map((shelf, index) => (
                            <BookShelf key={index} title={shelf[0]} books={shelf.slice(1)}/>
                        ))}
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
}