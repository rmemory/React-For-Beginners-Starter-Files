import React from 'react';
/*
 * Any component that doesn't have any logic in it other than just
 * a single render method, which has a single return statement,
 * which only uses (at most) props such as the this.props.tagline
 * is known as "stateless" and can be implemented as a "stateless
 * functional component". See the possible ways this can be accomplished
 * below
 */

/* Here is the original
class Header extends React.Component {
	render() {
		return (
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
					<span>{this.props.tagline}</span>
				</h3>
			</header>
		)
	}
}
 */

/* Here is an ES5 version 

function Header (props) {
	return (
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
				<span>{props.tagline}</span>
			</h3>
		</header>
	)
}
*/

/* Here is an initial ES6 version using an arrow function
const Header = (props) => {
	return (
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
				<span>{props.tagline}</span>
			</h3>
		</header>
	)
}
*/

/* Here is the next iteration on the ES6 version, which uses
   an implicit return statement, because ES6 arrow functions 
   allow functions that return a single line to not have the 
   curly braces, and the return statement is implied
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
				<span>{props.tagline}</span>
			</h3>
		</header>
);
*/

/* Here is the next iteration on the ES6 version */
const Header = ({tagline, age}) => (
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
				{/* <span>{tagline} {age}</span> */}
				<span>{tagline}</span>
			</h3>
		</header>
	);

export default Header;