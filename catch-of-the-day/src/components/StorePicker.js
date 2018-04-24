import React from 'react';
import PropTypes from "prop-types";
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
	static propTypes = {
		history: PropTypes.object.isRequired,
	};

	/* The constructor is needed to bind "this" to the goToStore
	   or other custom methods in this class */
	constructor() {
		super();

		this.goToStore = this.goToStore.bind(this);
	}
	myInput = React.createRef();

	goToStore(event) {
		/* By default, a event will send the event info to the 
			same page its currently on, in this case the page
			showing the StorePicker. Thus we stop the form from
			refreshing the current page, because we want to change
			the page to the real store they have selected. */
		event.preventDefault();

		/* Get the text from the input, but don't use the DOM, use
		   react components, thus no document.querySelector, and no
		   usage of jQuery. Instead we use a Ref. See the usage of
		   myInput in this file. */
		const storeName = this.myInput.value.value;

		/* change the page to /store/whatever-they-entered.
		   We can gain access to the Router component via 
		   Props.history.push. Note that in this case, the Router
		   is a parent of StorePicker because Router is the top 
		   level object mounted into index.js. Also note, this is 
		   how we modify the "push state", which is how we change
		   a route, and when the route is modified, it causes
		   whatever new endpoint is specified to be rendered 
		   (in this case, App.js).*/
		this.props.history.push(`/store/${storeName}`);
	}

	/* An alternative to using constructor to bind this to
	   goToStore 
	goToStore = event => {
		event.preventDefault();
		console.log(this);
	} 
	*/

	render() {
		/* All built in methods that come with React, like render(),
		   componentDidMount(), etc, etc all have direct access to 
		   "this". However, "custom" methods, such as goToStore above
		   be default do not. There are two ways to handle this. 
		   Either with a constructor, using bind, or causing 
		   goToStore to become a property as a function. */
		
		return (
			/* Note that goToStore doesn't include "()" because
				if we did, it would cause goToStore to be called
				on page load */
			<form className="store-selector" onSubmit={this.goToStore}>
				<h2>Please Enter A Store</h2>
				{/* The usage of "()" on getFunName() means the function
					will be called on page load, which is what we want to
					happen here. */}
				{/* have ot use defaultValue and not value */}
				<input 
					type="text"
					ref={this.myInput} 
					required 
					placeholder="Store Name" 
					defaultValue={getFunName()}/>
				<button type="submit">Visit Store →</button>
			</form>
		)
	}
}

export default StorePicker;