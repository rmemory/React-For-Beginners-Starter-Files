import React from 'react';
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";
import { TransitionGroup, CSSTransition } from "react-transition-group"

class Order extends React.Component {
	static propTypes = {
		removeFromOrder: PropTypes.func.isRequired,
		order: PropTypes.object.isRequired,
		fishes: PropTypes.object.isRequired
	};

	renderOrder = key => {
		const fish = this.props.fishes[key];
		const count = this.props.order[key];
		const isAvailable = (fish && (fish.status === 'available'));

		// We add this because the sync from firebase means on a 
		// page refresh, initially we are still waiting for the fish
		// information from firebase to populate the fishes state in App
		// and while this is occuring, it means until that sync happens
		// the order key might be empty
		if (!fish) return null;

		if (!isAvailable) {
			return (
				<CSSTransition 
					classNames="order" 
					key={key} 
					timeout={{ enter:250, exit: 250 }}>
					<li key={key}>
						{/* We check for a null fish here in case the fish has been
							deleted */}
						Sorry {fish ? fish.name : 'fish'} is no longer available
					</li>
				</CSSTransition>
			);
		} else {
			return (
				<CSSTransition 
				classNames="order" 
				key={key} 
				timeout={{ enter:250, exit: 250 }}>
					<li key={key}>
							<span>
								<TransitionGroup component="span" className="count">
									<CSSTransition 
										classNames="count" 
										key={count} 
										timeout={{enter:500, exit:500}}>
										<span>{count}</span>
									</CSSTransition>
								</TransitionGroup>
								lbs {fish.name}
								{formatPrice(count * fish.price)}
								<button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
							</span>
					</li>
				</CSSTransition>
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
				<TransitionGroup component="ul" className="order">
					{orderIds.map(this.renderOrder)}
				</TransitionGroup>
				<div className="total">
					<strong>{formatPrice(total)}</strong>
				</div>
			</div>
		)
	}
}

export default Order;