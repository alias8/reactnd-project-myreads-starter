import React from "react";
import {Book} from "./Book";
import PropTypes from 'prop-types';

export const BookShelf = (props) => (
    <div className="bookshelf">
        <h2 className="bookshelf-title">{props.shelfTitle}</h2>
        <div className="bookshelf-books">
            <ol className="books-grid">
                {props.books.map((book, index) => (
                    <li key={index}>
                        <Book id={book.id}
                              shelf={book.shelf}
                              title={book.title}
                              author={book.authors ? book.authors.join(", ") : ""}
                              imgUrl={book.imageLinks ? book.imageLinks.thumbnail : ""}
                              onSubmitChange={props.onSubmitChange}/>
                    </li>
                ))}
            </ol>
        </div>
    </div>
)

BookShelf.propTypes = {
    shelfTitle: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onSubmitChange: PropTypes.func.isRequired
};
