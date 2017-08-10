import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import { BookShelf } from './BookShelf';
import { QueryInProgress, UpdateInProgress } from './LoadingScreen';
import PropTypes from 'prop-types';

export class SearchBooksPage extends Component {
    updateQuery = (query) => {
      query = query.target.value.trim();
      this.setState({ query });
      if (query.length > 0) {
        this.setState({ queryInProgress: true });
        BooksAPI.search(query, 10).then((searchResultBooks) => {
          if (searchResultBooks.length > 0) {
            searchResultBooks = this.checkCorrectShelf(searchResultBooks, this.props.shelfBooks); // fix the incorrect shelf
            this.setState({
              searchResultBooks,
              queryInProgress: false,
              searchSuccessful: true,
            });
          } else {
            this.setState({
              searchResultBooks: [],
              queryInProgress: false,
              searchSuccessful: false,
            });
          }
        });
      } else {
        this.setState({ searchResultBooks: [], queryInProgress: false, searchSuccessful: false });
      }
    };
    handleChange = (id, selectOption, data) => {
      this.setState({ updateInProgress: true });
      this.props.onSubmitChange(id, selectOption, data);
    }

    constructor(props) {
      super(props);
      this.state = {
        query: '',
        searchResultBooks: [],
        searchSuccessful: false,
        queryInProgress: false,
        updateInProgress: false,
      };
    }

    checkCorrectShelf(booksFromSearch, shelfBooks) {
      const correctedBooksFromSearch = booksFromSearch; // initialise, then change this array
      const shelfBooksCheck = shelfBooks;
      booksFromSearch.forEach((bookFromSearch, index, array) => {
        correctedBooksFromSearch[index].shelf = 'none'; // default
        for (let i = 0; i < shelfBooks.length; i++) { // find (if any) top level book that matches
          if (shelfBooks[i].id === bookFromSearch.id) {
            correctedBooksFromSearch[index].shelf = shelfBooks[i].shelf;
            break; // book found, stop search and continue to next book in search
          }
        }
      });
      return correctedBooksFromSearch;
    }

    componentWillReceiveProps(nextProps) {
      const correctedShelfBooks = this.checkCorrectShelf(this.state.searchResultBooks, nextProps.shelfBooks);
      this.setState({ updateInProgress: false });
      this.setState({ searchResultBooks: correctedShelfBooks });
    }

    render() { // todo: how to make the progress bar positon:fixed but have it underneath the searchbox?
      return (
        <div className="search-books">
          <div className="search-top">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <input
                  type="text"
                  placeholder="Search by title or author"
                  value={this.state.query}
                  onChange={this.updateQuery}
                />
              </div>
            </div>
            {this.state.queryInProgress && <QueryInProgress />}
            {this.state.updateInProgress && <UpdateInProgress />}
          </div>
          <div className="search-books-results">
            {this.state.searchSuccessful &&
              <BookShelf
                shelfTitle={'Search Results'}
                books={this.state.searchResultBooks}
                onSubmitChange={this.handleChange}
              />}
            {!this.state.searchSuccessful &&
              <BookShelf
                shelfTitle={'No Results to Display'}
                books={this.state.searchResultBooks}
                onSubmitChange={this.props.onSubmitChange}
              />}
          </div>
        </div>
      );
    }
}

SearchBooksPage.propTypes = {
  shelfBooks: PropTypes.array.isRequired,
  onSubmitChange: PropTypes.func.isRequired,
};
