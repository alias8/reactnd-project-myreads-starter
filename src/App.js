import React, {Component} from 'react'
import {Link, Route} from 'react-router-dom'
import './App.css'
import {SearchBooksPage} from "./SearchBooksPage";
import {ListBooksPage} from "./ListBooksPage";
import * as BooksAPI from './BooksAPI'

class BooksApp extends Component {
	constructor(props) {
		super(props);
	}
	
	state = {
		books: []
	}
	
	componentDidMount() {
		BooksAPI.getAll().then((books) => {
			this.setState({books})
		})
	}
	
	onSubmit(id, shelf) {
		if (shelf === "Want to Read") shelf = "wantToRead";
		else if (shelf === "Currently Reading") shelf = "currentlyReading";
		else if (shelf === "Read") shelf = "read";
		BooksAPI.update({id}, shelf)
	}
	
	render() {
		return (
			<div className="app">
				<Route exact path='/search' render={() => (
					<SearchBooksPage/>
				)}/>
				<Route exact path="/" render={() => (
					<ListBooksPage books={this.state.books} onSubmit={this.onSubmit}/>
				)}/>
			</div>
		)
	}
}

export default BooksApp
