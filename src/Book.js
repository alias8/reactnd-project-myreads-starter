import React, {Component} from "react";
import * as Globals from "./Globals";

export class Book extends Component {
    handleSubmitCategoryChange = (e) => {
        let shelf = e.target.value;
        if (shelf === Globals.CURRENTLY_READING) shelf = Globals.CURRENTLY_READING_CAMELCASE;
        else if (shelf === Globals.WANT_TO_READ) shelf = Globals.WANT_TO_READ_CAMELCASE;
        else if (shelf === Globals.READ) shelf = Globals.READ_CAMELCASE;
        this.props.onSubmitCategoryChange(this.props.id, shelf)
    };

    handleSubmitRatingChange = (e) => {
        const rating = e.target.value;
        this.props.onSubmitRatingsChange(this.props.id, rating)
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
                        <select value={this.props.shelf} onChange={this.handleSubmitCategoryChange}>
                            <option value="none" disabled>Move to...</option>
                            <option value={Globals.CURRENTLY_READING}>{Globals.CURRENTLY_READING}</option>
                            <option value={Globals.WANT_TO_READ}>{Globals.WANT_TO_READ}</option>
                            <option value={Globals.READ}>{Globals.READ}</option>
                        </select>
                    </div>
                    <div className="book-shelf-changer-left">
                        <select onChange={this.handleSubmitRatingChange}>
                            <option value={this.props.title} disabled>Rate this book</option>
                            {[1, 2, 3, 4, 5].map(rating => (
                                <option key={rating} value={rating}>{rating}</option>
                            ))}
                        </select>
                    </div>

                </div>
                <div className="book-title">{this.props.title}</div>
                <div className="book-authors">{this.props.author}</div>
                <div className="book-title">{this.props.rating}</div>
            </div>
        )
    }
}

