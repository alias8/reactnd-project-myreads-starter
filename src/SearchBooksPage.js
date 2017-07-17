import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

export class SearchBooksPage extends Component {
	state = {
		query: ''
	}
	
	updateQuery = (query) => {
		this.setState({query: query.target.value.trim()})
	}
	
	
	
	render() {
		const { query } = this.state
		
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link to='/' className="close-search">Close</Link>
					<div className="search-books-input-wrapper">
						<input type="text"
							   placeholder="Search by title or author"
							   value={query}
							   onChange={this.updateQuery}
						/>
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid"></ol>
				</div>
			</div>
		)
	}
}