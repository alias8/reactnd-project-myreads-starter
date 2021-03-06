import PropTypes from 'prop-types';
import React, { Component } from 'react';
import * as Globals from './Globals';

export default class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: this.rating(),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
  }

  handleChange(e) {
    let value = e.target.value;
    value = Globals.MAP_NORMAL_TO_CAMELCASE[e.target.value];
    this.props.onSubmitChange(this.props.id, e.target.name, value);
  }

  handleRatingChange(e) {
    localStorage.setItem(`${localStorage.token} ${this.props.id}`, e.target.value);
    this.setState({ rating: e.target.value });
  }

  rating() {
    const value = localStorage.getItem(`${localStorage.token} ${this.props.id}`);
    if (!value) return '';
    return value;
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${this.props.imgUrl})`,
            }}
          />
          <div className="book-shelf-changer-right">
            <select
              name="select shelf"
              value={Globals.MAP_CAMELCASE_TO_NORMAL[this.props.shelf]}
              onChange={this.handleChange}
            >
              <option value="none" disabled>Move to...</option>
              <option
                value={Globals.CURRENTLY_READING}
              >{Globals.CURRENTLY_READING}</option>
              <option value={Globals.WANT_TO_READ}>{Globals.WANT_TO_READ}</option>
              <option value={Globals.READ}>{Globals.READ}</option>
            </select>
          </div>
          <div className="book-shelf-changer-left">
            <select
              name="select rating"
              value={this.state.rating}
              onChange={this.handleRatingChange}
            >
              <option value={this.props.title} disabled>Rate this book</option>
              {[1, 2, 3, 4, 5].map(rating => (
                <option key={rating} value={rating}>{rating}</option>
              ))}
            </select>
          </div>

        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">{this.props.author}</div>
        <div className="book-authors">Your rating: {this.state.rating}</div>
      </div>
    );
  }
}

Book.propTypes = {
  id: PropTypes.string.isRequired,
  shelf: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  onSubmitChange: PropTypes.func.isRequired,
};
