import React from 'react';
import { formatPrice } from "../helpers";

class Fish extends React.Component {
	handleClick = (event) => {
		this.props.addToOrder(this.props.keyForAddToOrder);
	};

	render () {
		// A nice way to initialize variables coming from the same source,
		// in this case this.props.details.
		const { image, name, price, desc, status } = this.props.details;
		const isAvailable = (status === 'available');
		return (
			<li className="menu-fish">
				<img src={image} alt={name}/>
				<h3 className="fish-name">
					{name}
					<span className="price">{formatPrice(price)}</span>
				</h3>
				<p>{desc}</p>
				<button disabled={!isAvailable} onClick={this.handleClick}>
					{isAvailable ? 'Add to cart' : 'Sold out!'}
				</button>
			</li>
		);
	}
}

export default Fish;