import React from 'react';

/*
 * We could have done this:
 * import React, {Fragment} from 'react';
 */

class StorePicker extends React.Component {
	// All React.Components must implement render
	render() {
		/* We could return this, 
		 * 
		 * React.createElement('p', { className: 'store-selector'}, 'heyyooo');
		 * But don't use React.createElement.
		 */

		return (
			<form className="store-selector">
			{/* This is a comment */}
				<h2>Please Enter A Store</h2>
			</form>
		)

		/* 
		 * Note, a render method can only return a single root HTML element. But, new in React 16.2, we can do this:
		 * 
		 *	render() {
			return (
			<React.Fragment>
				<p>Fish!</p>
				<form className="store-selector">
					<h2>Please Enter a store</h2>
				</form>
			</React.Fragment>
			)
			}
		 */
	}
}

export default StorePicker;