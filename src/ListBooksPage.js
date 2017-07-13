import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {BookShelf} from "./BookShelf";

export class ListBooksPage extends Component {
	render() {
        let currentlyReading = this.props.books.filter(book => book.shelf === "currentlyReading");
		let wantToRead = this.props.books.filter(book => book.shelf === "wantToRead");
		let read = this.props.books.filter(book => book.shelf === "read");

		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					<BookShelf shelfTitle={"Currently Reading"} books={currentlyReading} onSubmit={this.props.onSubmit}/>
					<BookShelf shelfTitle={"Want to Read"} books={wantToRead} onSubmit={this.props.onSubmit}/>
					<BookShelf shelfTitle={"Read"} books={read} onSubmit={this.props.onSubmit}/>
				</div>
				<div className="open-search">
					<Link to="/search">Add a book</Link>
				</div>
			</div>
		)
	}
}