import React from 'react';
import PropTypes from "prop-types";

class AddFishForm extends React.Component {
	static propTypes = {
		addFish: PropTypes.func.isRequired,
	};

	// Used to get inputs from form into createFish callback
	nameRef = React.createRef();
	priceRef = React.createRef();
	statusRef = React.createRef();
	descRef = React.createRef();
	imageRef = React.createRef();

	constructor() {
		super();
		this.createFish = this.createFish.bind(this);
	}

	createFish(event) {
		// 1. Stop form from submitting
		event.preventDefault();

		// 2. Pull the values from the input, using Refs
		// This will be pushed into a state object in App,
		// so that everyone has access to it.
		const fish = {
			name: this.nameRef.value.value,
			price: parseFloat(this.priceRef.value.value),
			status: this.statusRef.value.value,
			desc: this.descRef.value.value,
			image: this.imageRef.value.value,
		}
		// Calling addFish in App to add the new fish object into state, 
		// passed via Inventory
		this.props.addFish(fish);

		// Reset the form
		event.currentTarget.reset();
	}

	render() {
		return (
			/* Remember, ref's are how we get input values into the createFish callback */
			<form className="fish-edit" onSubmit={this.createFish}>
				<input name="name" ref={this.nameRef} type="text" placeholder="Name" />
				<input name="price" ref={this.priceRef} type="text" placeholder="Price" />
				<select name="status" ref={this.statusRef}>
					<option value="available">Fresh!</option>
					<option value="unavailable">Sold out!</option>
				</select>
				<textarea name="desc" ref={this.descRef} placeholder="Desc"/>
				<input name="image" ref={this.imageRef} type="text" placeholder="Image" />
				<button type="submit">+ Add Fish</button>
			</form>
		);
	}
}

export default AddFishForm;