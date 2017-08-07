import React, {Component} from "react";
import {Route} from "react-router-dom";
import "./App.css";
import {SearchBooksPage} from "./SearchBooksPage";
import {ListBooksPage} from "./ListBooksPage";
import * as BooksAPI from "./BooksAPI";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shelfBooks: []
        };
    }

    onSubmitChange = (id, selectOption, data) => {
        BooksAPI.update({id}, data).then(response => {
            this.update()
        });
    };

    componentDidMount() {
        //this.clearLocalStorage();
        this.update();
    }

    clearLocalStorage() {
        Object.keys(localStorage).forEach(key => {
            localStorage.removeItem(key)
        })
    }

    update() {
        BooksAPI.getAll().then(shelfBooks => {
            this.setState({shelfBooks});
        });
    }

    render() {
        return (
            <div className="app">
                <Route exact path='/search' render={()=> (
                    <SearchBooksPage
                        shelfBooks={this.state.shelfBooks}
                        onSubmitChange={this.onSubmitChange}/>)}/>
                <Route exact path="/" render={()=>(
                    <ListBooksPage
                        books={this.state.shelfBooks}
                        onSubmitChange={this.onSubmitChange}/>)}/>
            </div>
        )
    }
}





