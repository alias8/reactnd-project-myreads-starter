import React from "react";
import * as Globals from "./Globals";

export const Book = (props) => {
    const handleChange = (e) => {
        let value = e.target.value;
        if (value === Globals.CURRENTLY_READING) value = Globals.CURRENTLY_READING_CAMELCASE;
        else if (value === Globals.WANT_TO_READ) value = Globals.WANT_TO_READ_CAMELCASE;
        else if (value === Globals.READ) value = Globals.READ_CAMELCASE;
        props.onSubmitChange(props.id, e.target.name, value)
    };

    const rating = () => {
        if(props.ratings) {
            const rating = props.ratings.filter(rating => rating.id === props.id);
            if(rating.length === 1) return rating[0].rating;
            else return "unrated";
        } else {
            return "unrated"
        }
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
                    <select name="select shelf" value={props.shelf} onChange={handleChange}>
                        <option value="none" disabled>Move to...</option>
                        <option value={Globals.CURRENTLY_READING}>{Globals.CURRENTLY_READING}</option>
                        <option value={Globals.WANT_TO_READ}>{Globals.WANT_TO_READ}</option>
                        <option value={Globals.READ}>{Globals.READ}</option>
                    </select>
                </div>
                <div className="book-shelf-changer-left">
                    <select name="select rating" onChange={handleChange}>
                        <option value={props.title} disabled>Rate this book</option>
                        {[1, 2, 3, 4, 5].map(rating => (
                            <option key={rating} value={rating}>{rating}</option>
                        ))}
                    </select>
                </div>

            </div>
            <div className="book-title">{props.title}</div>
            <div className="book-authors">{props.author}</div>
            <div className="book-authors">{rating()}</div>
        </div>
    )
};

