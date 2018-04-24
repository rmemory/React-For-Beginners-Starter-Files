import React from 'react';
import PropTypes from "prop-types";

/* 
 * Stateless functional component 
 * 
 * Since only the render method is needed, we can eliminate it altogether,
 * an simply create a function, called Header
 */
const Header = (props) => (
		<header className="top">
			<h1>
				Catch 
					<span className="ofThe">
						<span className="of">Of</span>
						<span className="the">The</span>
					</span>
				Day
			</h1>
			<h3 className="tagline">
				{/* The string for props.tagline comes from App.js */}
				<span>{props.tagline}</span>
			</h3>
		</header>
	);

	/* 
	 * Informs parent components that a prop of type string is
	 * required. If not supplied, it will cause a warning to 
	 * be printed at the console .... warnings don't make it
	 * into production. Note for stateless functional components,
	 * like this one, the propType must come after the definition
	 * of the component.
	 * 
	 * This propType is for the tagline, which is a string
	 */
	Header.propTypes = {
		tagline: PropTypes.string.isRequired
	};

export default Header;