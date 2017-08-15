import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookShelf from './BookShelf';
import { QueryInProgress, UpdateInProgress } from './LoadingScreen';

export default class SearchBooksPage extends Component {
  static checkCorrectShelf(booksFromSearch, shelfBooks) {
    const correctedBooksFromSearch = booksFromSearch; // initialise, then change this array
    booksFromSearch.forEach((bookFromSearch, index) => {
      correctedBooksFromSearch[index].shelf = 'none'; // default
      for (let i = 0; i < shelfBooks.length; i += 1) { // find (if any) top level book that matches
        if (shelfBooks[i].id === bookFromSearch.id) {
          correctedBooksFromSearch[index].shelf = shelfBooks[i].shelf;
          break; // book found, stop search and continue to next book in search
        }
      }
    });
    return correctedBooksFromSearch;
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
    this.updateQuery = this.updateQuery.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const correctedShelfBooks =
      SearchBooksPage.checkCorrectShelf(this.state.searchResultBooks, nextProps.shelfBooks);
    this.setState({
      updateInProgress: false,
      searchResultBooks: correctedShelfBooks });
  }

  updateQuery(query) {
    const trimmedQuery = query.target.value.trim();
    this.setState({ query: trimmedQuery });
    if (trimmedQuery.length > 0) {
      this.setState({ queryInProgress: true });
      BooksAPI.search(trimmedQuery, 10).then((searchResultBooks) => {
        if (searchResultBooks.length > 0) {
          const searchResultBooksCorrected =
            SearchBooksPage.checkCorrectShelf(searchResultBooks, this.props.shelfBooks);
          this.setState({
            searchResultBooks: searchResultBooksCorrected,
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
  }

  handleChange(id, selectOption, data) {
    this.setState({ updateInProgress: true });
    this.props.onSubmitChange(id, selectOption, data);
  }

  render() {
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
  shelfBooks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  onSubmitChange: PropTypes.func.isRequired,
};
