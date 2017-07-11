import React, {Component} from 'react'
import {Book} from "./Book";

export class BookShelf extends Component {
    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        <li>
                            {this.props.books.map((book, index) => (
                                <Book key={index} title={book.title} author={book.author} imgUrl={book.imgUrl}/>
                            ))}
                        </li>
                    </ol>
                </div>
            </div>
        )
    }
}