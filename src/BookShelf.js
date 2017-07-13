import React, {Component} from 'react'
import {Book} from "./Book";

export class BookShelf extends Component {
    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.books.map((book, index) => (
                            <li>
                                <Book key={index} id={book.id} shelf={this.props.shelfTitle} title={book.title} author={book.authors[0]} imgUrl={book.imageLinks.thumbnail} onSubmit={this.props.onSubmit}/>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}