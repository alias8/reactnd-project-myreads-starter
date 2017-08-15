import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import SearchBooksPage from './SearchBooksPage';
import ListBooksPage from './ListBooksPage';
import * as BooksAPI from './BooksAPI';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shelfBooks: [],
    };

    this.onSubmitChange = this.onSubmitChange.bind(this);
  }

  componentDidMount() {
    // BooksAPI.clearLocalStorage();
    this.update();
  }

  onSubmitChange(id, selectOption, data) {
    BooksAPI.update({ id }, data).then(() => {
      this.update();
    });
  }

  update() {
    BooksAPI.getAll().then((shelfBooks) => {
      this.setState({ shelfBooks });
    });
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/search"
          render={() => (
            <SearchBooksPage
              shelfBooks={this.state.shelfBooks}
              onSubmitChange={this.onSubmitChange}
            />)}
        />
        <Route
          exact
          path="/"
          render={() => (
            <ListBooksPage
              books={this.state.shelfBooks}
              onSubmitChange={this.onSubmitChange}
            />)}
        />
      </div>
    );
  }
}

