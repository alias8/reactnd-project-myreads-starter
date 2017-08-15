import PropTypes from 'prop-types';
import React from 'react';
import Book from './Book';

const BookShelf = props => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{props.shelfTitle}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {props.books.map(book =>
          (<li key={book.id}>
            <Book
              id={book.id}
              shelf={book.shelf}
              title={book.title}
              author={book.authors ? book.authors.join(', ') : ''}
              imgUrl={book.imageLinks ? book.imageLinks.thumbnail : ''}
              onSubmitChange={props.onSubmitChange}
            />
          </li>))}
      </ol>
    </div>
  </div>);

export default BookShelf;

BookShelf.propTypes = {
  shelfTitle: PropTypes.string.isRequired,
  onSubmitChange: PropTypes.func.isRequired,
  books: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired
  })).isRequired,
};
