import React from 'react';
import PropTypes from "prop-types";

class EditFishForm extends React.Component {
	static propTypes = {
		keyForUpdateFish: PropTypes.string.isRequired,
		updateFish: PropTypes.func.isRequired,
		fish: PropTypes.shape({ 
			image: PropTypes.string, 
			name: PropTypes.string, 
			desc: PropTypes.string, 
			status: PropTypes.string,
			price: PropTypes.number 
		}).isRequired
	};

	handleChange = (event) => {
		// Update the fish being edited
		// Note that event.currentTarget.name will be whatever
		// part of the input is being updated, name, price, status, etc
		const updatedFish = {
			...this.props.fish,
			[event.currentTarget.name]: event.currentTarget.value
		 };
		 
		 this.props.updateFish(this.props.keyForUpdateFish, updatedFish);
	};

	render () {
		return (
			<div className="fish-edit">
				<input type="text" name="name" onChange={this.handleChange} value={this.props.fish.name}/> 
				<input type="text" name="price" onChange={this.handleChange} value={this.props.fish.image}/>
				<select type="text" name="status" onChange={this.handleChange} value={this.props.fish.image}> 
					<option value="available">Fresh!</option>
					<option value="unavailable">Sold out!</option>
				</select>
				<textarea name="desc" onChange={this.handleChange} value={this.props.fish.desc}/>
				<input type="text" name="image" onChange={this.handleChange} value={this.props.fish.image}/>
				<button onClick={() => this.props.deleteFish(this.props.keyForUpdateFish)}>Delete Fish</button>
			</div>
		);
	}
}

export default EditFishForm;