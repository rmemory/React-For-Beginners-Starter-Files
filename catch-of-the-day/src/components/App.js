import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import fishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

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

	// Lifecycle method which fires when the component is mounted 
	componentDidMount() {
		// Load data from local storage
		const localStorageRef = localStorage.getItem(this.props.match.params.storeId);
		if (localStorageRef) {
			// The opposite of JSON.stringify is JSON.parse
			this.setState({
				order: JSON.parse(localStorageRef)
			});
		}
		
		this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
			context: this,
			state: 'fishes' // the use of 'fishes' here refers to the state var above
		});
	}

	// Clear out the database
	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	/* As soon as user modifies their order (aka, as soon as React performs 
	   an update) this will run. Usage of JSON.stringify is needed because
	   localStorage expects a string */
	componentDidUpdate() {
		localStorage.setItem(this.props.match.params.storeId, 
							 JSON.stringify(this.state.order));
	}

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

	updateFish = (key, updatedFish) => {
		const copyOfFishes = { ...this.state.fishes };
		copyOfFishes[key] = updatedFish;
		this.setState({
			fishes: copyOfFishes
		})
	}

	// A state function to populate the fishes with default data
	loadSampleFishes = () => {
		this.setState({fishes: fishes});
	};

	// A state function to modify the order state
	/* To manually call this (or any other method) to test it, you
	 * can use the chrome tools. First, in the React tab, select 
	 * in this case the App component, which initializes the $r
	 * to point at the App. Next, in the console, you can type this:
	 * 
	 * $r.addToOrder('fish1');
	 * $r.addToOrder('fish1');
	 * $r.addToOrder('fish4');
	 * 
	 * Switch back the React tab, and in the order state var of App, you
	 * will see fish1 has a value of 2 (because we added fish1 twice above)
	 * and fish4 has a value of 1.
	 */ 
	addToOrder = (key) => {
		// 1. Copy order state
		const copyOfOrder = { ...this.state.order };

		// 2. Either add to the order, or update the number in our order
		copyOfOrder[key] = copyOfOrder[key] + 1 || 1; // if the order[key] value doesn't already 
										  // exist, then initialize its value to 1, 
										  // otherwise increment the order[key] by 1.

		// 3. Call setState to update our order state object
		this.setState({
			order: copyOfOrder
		});
	}

	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					{/* Note that tagline is a custom tag and just becomes
						a Prop which is passed to children, in this case
						Header */}
					<Header tagline="Fresh Seafood Market"/>
					<ul className="fishes">
						{/* We have to use a map operation here because React
							doesn't provide any looping or conditional logic */}
						{/* React wants us to apply a key= here in order to make 
							each Fish be unique (so that it makes things nice and
							performant), and we just assign a value to key of {key}
							because the {key} is already guaranteed to be unique. */}
						{/* props: details, addToOrder function, keyForAddToOrder */}
						{Object.keys(this.state.fishes).map(key => (
							<Fish 
								key={key} 
								details={this.state.fishes[key]} 
								addToOrder={this.addToOrder} 
								keyForAddToOrder={key}/>
							)
						)}
					</ul>
				</div>
				{/* This is the best way */}
				<Order fishes={this.state.fishes} order={this.state.order}/>

				{/* This is lazy, and might involve passing more props than is necessary,
					plus it kinda breaks the modularity of the Order component by not
					specifying each prop that gets passed
				<Order {...this.state}/> */}
				<Inventory 
					addFish={this.addFish} 
					updateFish={this.updateFish}
					loadSampleFishes={this.loadSampleFishes}
					fishes={this.state.fishes}/>
			</div>
		)
	}
}

export default App;