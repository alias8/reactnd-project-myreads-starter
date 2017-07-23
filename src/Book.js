import React from "react";
import * as Globals from "./Globals";

export const Book = (props) => {
    const handleSubmitCategoryChange = (e) => {
        let shelf = e.target.value;
        if (shelf === Globals.CURRENTLY_READING) shelf = Globals.CURRENTLY_READING_CAMELCASE;
        else if (shelf === Globals.WANT_TO_READ) shelf = Globals.WANT_TO_READ_CAMELCASE;
        else if (shelf === Globals.READ) shelf = Globals.READ_CAMELCASE;
        props.onSubmitCategoryChange(props.id, shelf)
    };

    const handleSubmitRatingChange = (e) => {
        const rating = e.target.value;
        props.onSubmitRatingsChange(props.id, rating)
    };


    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{
                    width: 128,
                    height: 193,
                    backgroundImage: `url(${props.imgUrl})`
                }}/>
                <div className="book-shelf-changer-right">
                    <select value={props.shelf} onChange={handleSubmitCategoryChange}>
                        <option value="none" disabled>Move to...</option>
                        <option value={Globals.CURRENTLY_READING}>{Globals.CURRENTLY_READING}</option>
                        <option value={Globals.WANT_TO_READ}>{Globals.WANT_TO_READ}</option>
                        <option value={Globals.READ}>{Globals.READ}</option>
                    </select>
                </div>
                <div className="book-shelf-changer-left">
                    <select onChange={handleSubmitRatingChange}>
                        <option value={props.title} disabled>Rate this book</option>
                        {[1, 2, 3, 4, 5].map(rating => (
                            <option key={rating} value={rating}>{rating}</option>
                        ))}
                    </select>
                </div>

            </div>
            <div className="book-title">{props.title}</div>
            <div className="book-authors">{props.author}</div>
            <div className="book-title">Your rating: {props.rating}</div>
        </div>
    )
};

