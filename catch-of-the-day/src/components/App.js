import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

/*
 * Note that each component, such as Header, Order, Inventory, etc
 * internally are created by React as nothing more than JS objects
 */
class App extends React.Component {
	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market"/>
				</div>
				<Order />
				<Inventory />
			</div>
		)
	}
}

export default App;