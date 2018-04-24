import React from 'react';
import PropTypes from "prop-types";

const Login = (props) => (
	<nav className="login">
		<h2>Inventory Login</h2>
		<p>Sign in to manage your store's inventory</p>
		{/* Since this is a stateless functional component, meaning Login is just
		 * a function and not a class, it means "this" has no meaning here and
		 * thus its just props.authenticate and not this.props.authenticate. And
		 * additionally, we pass props in as an argument to the function.
		 */}
		<button className="github" onClick={() => props.authenticateProp('Github')}>
			Log in with GitHub
		</button>
		<button className="facebook" onClick={() => props.authenticateProp('Facebook')}>
			Log in with Facebook
		</button>
	</nav>
);

/* propTypes has to be declared here for stateless components like this one */
Login.propTypes = {
	authenticateProp: PropTypes.func.isRequired
};

export default Login;