import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import fishes from '../sample-fishes';
import Fish from './Fish';

/*
 * Note that each component, such as Header, Order, Inventory, etc
 * internally are created by React as nothing more than JS objects
 */
class App extends React.Component {
	/*
	 * State is an object that lives in a component (in this case App),
	 * which itself or children need. We provide APIs in this component
	 * to modify state (don't modify state directly), and we pass those
	 * APIs to children as Props as needed.
	 * 
	 * See the addFish API below, and the usage of the addFish prop
	 */
	state = {
		// Set the empty states
		fishes: {},
		order: {}
	};

	/*
	 * Modify the fishes state variable; Never directly modify a 
	 * state variable without using this API.
	 * 
	 * It taks a fish object, which has a name, prices, status, 
	 * description, and image. All of which are passed via the 
	 * "fish" object.
	 * 
	 * This function is made available to children using props
	 */
	addFish = fish => {
		// 1. make a copy of the existing state
		//	  Here we are using the ... operator 
		//	  which spreads the object
		const copyOfFishes = { ...this.state.fishes };

		// 2. Add our new fish to the state copy
		//	  of fishes. In this case, we add a 
		//	  value of fish{TimeStampInMilliSecs}
		copyOfFishes[`fish${Date.now()}`] = fish; 

		// 3. Set the updated state copy of fishes to state
		// Note that we are only updating the "fishes" part of 
		// the state object and not the "order" part of state.
		this.setState({
			fishes: copyOfFishes
		});
	};

	loadSampleFishes = () => {
		this.setState({fishes: fishes});
	};

	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					{/* Note that tagline is a custom tag and just becomes
						a Prop which is passed to children, in this case
						Header */}
					<Header tagline="Fresh Seafood Market"/>
					<ul className="fishes">
						{Object.keys(this.state.fishes).map(key => <Fish key={key} details={this.state.fishes[key]} />)}
					</ul>
				</div>
				<Order />
				<Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes}/>
			</div>
		)
	}
}

export default App;