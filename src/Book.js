import React, {Component} from 'react'
import * as Globals from './Globals'

export class Book extends Component {
	handleSubmit = (e) => {
		let shelf = e.target.value;
		if (shelf === Globals.CURRENTLY_READING) shelf = Globals.CURRENTLY_READING_CAMELCASE;
		else if (shelf === Globals.WANT_TO_READ) shelf = Globals.WANT_TO_READ_CAMELCASE;
		else if (shelf === Globals.READ) shelf = Globals.READ_CAMELCASE;
		this.props.onSubmit(this.props.id, shelf)
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
					<div className="book-shelf-changer">
						<select value={this.props.shelf} onChange={this.handleSubmit}>
							<option value="none" disabled>Move to...</option>
							<option value={Globals.CURRENTLY_READING}>{Globals.CURRENTLY_READING}</option>
							<option value={Globals.WANT_TO_READ}>{Globals.WANT_TO_READ}</option>
							<option value={Globals.READ}>{Globals.READ}</option>
						</select>
					</div>
				</div>
				<div className="book-title">{this.props.title}</div>
				<div className="book-authors">{this.props.author}</div>
			</div>
		)
	}
}