import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';
import { QueryInProgress } from './LoadingScreen';
import * as Globals from './Globals';

const ListBooksPage = (props) => {
  const bookGroups = Globals.CATEGORIES_CAMELCASE.map(categoryName => (
    props.books.filter(book => book.shelf === categoryName)
  ));
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      {props.books.length === 0 &&
      <QueryInProgress />}
      {props.books.length > 0 &&
      <div>
        <div className="list-books-content">
          {bookGroups.map((books, index) => (
            <BookShelf
              key={index}
              shelfTitle={Globals.CATEGORIES[index]}
              books={books}
              onSubmitChange={props.onSubmitChange}
            />

          ))}
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
      }
    </div>
  );
};

export default ListBooksPage;

ListBooksPage.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  onSubmitChange: PropTypes.func.isRequired,
};
