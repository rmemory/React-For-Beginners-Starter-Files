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
					{/* Make our own prop with, which we call
						tagline. Note that any prop that isn't
						a string must be surrounded by curly 
						brackets, like the value 500 */}
					<Header tagline="Fresh Seafood Market" age={500}/>
				</div>
				<Order />
				<Inventory />
			</div>
		)
	}
}

export default App;