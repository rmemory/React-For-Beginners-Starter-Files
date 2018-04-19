import React from 'react';

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

export default Header;