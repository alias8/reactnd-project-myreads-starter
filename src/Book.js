import React, {Component} from 'react'

export class Book extends Component {
    handleSubmit = (e) => {
        this.props.onSubmit(this.props.id, e)
    }

    render() {
        let currentlyReading = this.props.shelf === "Currently Reading" ? "selected" : "";
		let wanttoRead = this.props.shelf === "Want to Read" ? "selected" : "";
		let read = this.props.shelf === "Read" ? "selected" : "";
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${this.props.imgUrl})`
                    }}/>
                    <div className="book-shelf-changer">
                        <select onChange={e => this.handleSubmit(e.target.value)}>
                            <option value="none" disabled>Move to...</option>
                            <option value="Currently Reading" selected={currentlyReading}>Currently Reading</option>
                            <option value="Want To Read" selected={wanttoRead}>Want to Read</option>
                            <option value="Read" selected={read}>Read</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.title}</div>
                <div className="book-authors">{this.props.author}</div>
            </div>
        )
    }
}