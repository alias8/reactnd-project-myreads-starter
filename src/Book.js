import React, {Component} from "react";
import * as Globals from "./Globals";

export class Book extends Component {
    state = {
        rating: ""
    };
    handleChange = (e) => {
        let value = e.target.value;
        value = Globals.MAP_NORMAL_TO_CAMELCASE[e.target.value];
        this.props.onSubmitChange(this.props.id, e.target.name, value)
    };
    handleRatingChange = (e) => {
        localStorage.setItem(`${localStorage.token} ${this.props.id}`, e.target.value);
        this.setState({rating: e.target.value})
    };

    componentDidMount() {
        this.setState({rating: this.rating()});
    }

    rating() {
        let value = localStorage.getItem(`${localStorage.token} ${this.props.id}`);
        if (!value) return "";
        else return value;
    };

    render() {
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${this.props.imgUrl})`
                    }}/>
                    <div className="book-shelf-changer-right">
                        <select name="select shelf" value={Globals.MAP_CAMELCASE_TO_NORMAL[this.props.shelf]}
                                onChange={this.handleChange}>
                            <option value="none" disabled>Move to...</option>
                            <option value={Globals.CURRENTLY_READING}>{Globals.CURRENTLY_READING}</option>
                            <option value={Globals.WANT_TO_READ}>{Globals.WANT_TO_READ}</option>
                            <option value={Globals.READ}>{Globals.READ}</option>
                        </select>
                    </div>
                    <div className="book-shelf-changer-left">
                        <select name="select rating" value={this.state.rating} onChange={this.handleRatingChange}>
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
        )
    }
}

