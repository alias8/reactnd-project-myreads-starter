import React, {Component} from "react";
import {Link} from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import {BookShelf} from "./BookShelf";
import {LoadingScreen} from "./LoadingScreen"

export class SearchBooksPage extends Component {
	state = {
		query: '',
		books: [],
		searchSuccessful: false,
		queryInProgress: false
	};
	
	updateQuery = (query) => {
		this.setState({query: query.target.value.trim()})
	};
	
	handleSubmit = (event) => {
		event.preventDefault();
		let query = this.state.query;
		this.setState({queryInProgress: true});
		BooksAPI.search(query, 10).then(books => {
			if (books.length > 0) {
				this.setState({books, queryInProgress: false, searchSuccessful: true})
			}
			else {
				this.setState({books: [], queryInProgress: false, searchSuccessful: false})
			}
		})
	};
	
	render() {
		const {query} = this.state.query;
		
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link to='/' className="close-search">Close</Link>
					<div className="search-books-input-wrapper">
						<form onSubmit={this.handleSubmit}>
							<input type="text"
								   placeholder="Search by title or author"
								   value={query}
								   onChange={this.updateQuery}
							/>
						</form>
					</div>
				</div>
				{this.state.queryInProgress &&
				<LoadingScreen/>}
				<div className="search-books-results">
					{this.state.searchSuccessful &&
					<BookShelf shelfTitle={"Search Results"}
							   books={this.state.books}
							   onSubmitChange={this.props.onSubmitChange}/>}
					{!this.state.searchSuccessful &&
					<BookShelf shelfTitle={"No Results to Display"}
							   books={this.state.books}
							   onSubmitChange={this.props.onSubmitChange}/>}
				</div>
			</div>
		)
	}
}