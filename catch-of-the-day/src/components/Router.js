import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import StorePicker from './StorePicker';
import App from './App';
import NotFound from './NotFound';

const Router = () => (
	<BrowserRouter>
		<Switch>
			{/* The switch tries the routes in order until 
				it finds one that succeeds */}
			<Route exact path="/" component={StorePicker} />
			{/* Note that :storeId becomes a prop passed to App,
				via this.props.match.params.storeId */}
			<Route exact path="/store/:storeId" component={App} />
			<Route exact component={NotFound} />
		</Switch>
	</BrowserRouter>
)

export default Router;