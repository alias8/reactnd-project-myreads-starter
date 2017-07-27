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
		books: [],
		ratings: {}
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
		const keys = Object.keys(localStorage);
		let ratings = {};
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			if (key.includes(localStorage.token)) {
				const value = localStorage[key];
				const parseValue = JSON.parse(value);
				ratings[parseValue.id] = parseValue.rating;
			}
		}
		this.setState({ratings});
	}
	
	onSubmitChange = (id, selectOption, data) => {
		switch (selectOption) {
			case "select shelf":
				BooksAPI.update({id}, data).then(response => {
					this.update()
				});
				break;
			case "select rating":
				let obj = {id, rating: data};
				window.localStorage.setItem(`${localStorage.token} ${id}`, JSON.stringify(obj));
				this.update();
				break;
		}
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
						ratings={this.state.ratings}
						onSubmitChange={this.onSubmitChange}/>
				)}/>
			</div>
		)
	}
}



