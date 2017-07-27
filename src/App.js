import React, {Component} from "react";
import {Route} from "react-router-dom";
import "./App.css";
import {SearchBooksPage} from "./SearchBooksPage";
import {ListBooksPage} from "./ListBooksPage";
import * as BooksAPI from "./BooksAPI";
import * as Globals from "./Globals";

export default class BooksApp extends Component {
	constructor(props) {
		super(props);
	}
	
	state = {
		books: []
	};
	
	componentDidMount() {
		this.update();
		//this.clearLocalStorage()
	}
	
	clearLocalStorage() {
		Object.keys(localStorage).forEach(key => {
			localStorage.removeItem(key)
		})
	}
	
	update() {
		BooksAPI.getAll().then(books => {
			this.setState({books});
		});
		
	}
	
	onSubmitChange = (id, selectOption, data) => {
		BooksAPI.update({id}, data).then(response => {
			this.update()
		});
	};
	
	render() {
		return (
			<div className="app">
				<Route exact path='/search' render={() => (
					<SearchBooksPage onSubmitChange={this.onSubmitChange}/>
				)}/>
				<Route exact path="/" render={() => (
					<ListBooksPage
						books={this.state.books}
						onSubmitChange={this.onSubmitChange}/>
				)}/>
			</div>
		)
	}
}



