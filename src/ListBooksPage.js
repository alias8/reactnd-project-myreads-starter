import React from "react";
import {Link} from "react-router-dom";
import {BookShelf} from "./BookShelf";
import {QueryInProgress} from "./LoadingScreen"
import * as Globals from "./Globals";
import PropTypes from 'prop-types';

export const ListBooksPage = (props) => {
    const bookGroups = Globals.CATEGORIES_CAMELCASE.map(categoryName => (
        props.books.filter(book => book.shelf === categoryName)
    ));
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            {props.books.length === 0 &&
            <QueryInProgress/>}
            <div className="list-books-content">
                {bookGroups.map((books, index) => (
                    <BookShelf key={index}
                               shelfTitle={Globals.CATEGORIES[index]}
                               books={books}
                               onSubmitChange={props.onSubmitChange}/>

                ))}
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    )
}

ListBooksPage.propTypes = {
    books: PropTypes.array.isRequired,
    onSubmitChange: PropTypes.func.isRequired
};