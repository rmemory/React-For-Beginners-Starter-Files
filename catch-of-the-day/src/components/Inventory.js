import React from 'react';
import PropTypes from "prop-types";
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';

class Inventory extends React.Component {
	static propTypes = {
		updateFish: PropTypes.func.isRequired,
		deleteFish: PropTypes.func.isRequired,
		addFish: PropTypes.func.isRequired,
		loadSampleFishes: PropTypes.func.isRequired,
		fishes: PropTypes.object.isRequired
	};

	render() {
		return (
			<div className="inventory">
				<h2>Inventory</h2>

				{
					Object.keys(this.props.fishes).map(
							key => <EditFishForm 
								key={key}
								keyForUpdateFish={key}
								fish={this.props.fishes[key]}
								updateFish={this.props.updateFish}
								deleteFish={this.props.deleteFish}
								/>
						)
				}

				{/* Passing the addFish method to AddFishForm */}
				<AddFishForm addFish={this.props.addFish}/>
				<button onClick={this.props.loadSampleFishes}>
					Load Sample Fishes
				</button>
			</div>
		)
	}
}

export default Inventory;