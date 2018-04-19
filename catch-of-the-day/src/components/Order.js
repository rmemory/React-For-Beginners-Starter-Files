import React from 'react';
import { formatPrice } from "../helpers";

class Order extends React.Component {
	renderOrder = key => {
		const fish = this.props.fishes[key];
		const count = this.props.order[key];
		const isAvailable = (fish.status === 'available');

		if (!isAvailable) {
			return (
			<li key={key}>
				{/* We check for a null fish here in case the fish has been
					deleted */}
				Sorry {fish ? fish.name : 'fish'} is no longer available
			</li>
			);
		} else {
			return (
				<li key={key}>
					{count} lbs {fish.name}
					{formatPrice(count * fish.price)}
				</li>
			);
		}
	};

	render() {
		const orderIds = Object.keys(this.props.order);
		const total = orderIds.reduce((prevTotal, key) => {
			const fish = this.props.fishes[key];
			const count = this.props.order[key];
			const isAvailable = (fish && (fish.status === 'available'));

			/* If the fish is available, update the running total, 
			   prevTotal */
			if (isAvailable) {
				return prevTotal + (count * fish.price);
			} else {
				/* If the fish is no longer available, we just skip over it
			 	 * and just return the unmodified prevTotal */
				return prevTotal;
			}
		}, 0);

		return (
			<div className="order-wrap">
				<h2>Order</h2>
				<ul className="order">
					{orderIds.map(this.renderOrder)}
				</ul>
				<div className="total">
					<strong>{formatPrice(total)}</strong>
				</div>
			</div>
		)
	}
}

export default Order;