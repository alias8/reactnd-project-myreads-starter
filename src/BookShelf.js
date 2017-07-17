import React, {Component} from "react";
import {Book} from "./Book";

export class BookShelf extends Component {
    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.books.map((book, index) => (
                            <li key={index}>
                                <Book id={book.id}
                                      shelf={this.props.shelfTitle}
                                      title={book.title}
                                      author={book.authors ? book.authors.join(", ") : ""}
                                      imgUrl={book.imageLinks ? book.imageLinks.thumbnail : ""}
                                      onSubmit={this.props.onSubmit}/>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}