import React from 'react';
import PropTypes from "prop-types";
import firebase from 'firebase';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, { firebaseApp } from "../base";

class Inventory extends React.Component {
	static propTypes = {
		updateFish: PropTypes.func.isRequired,
		deleteFish: PropTypes.func.isRequired,
		addFish: PropTypes.func.isRequired,
		loadSampleFishes: PropTypes.func.isRequired,
		fishes: PropTypes.object.isRequired,
		storeId: PropTypes.string.isRequired
	};

	/*
	 * Note that this state is local to Inventory, and is not sync'd
	 * to firebase or even local storage.
	 */
	state = {
		uid: null,
		owner: null
	};

	// This guy is here to check to see if we are logged in on a page refresh
	componentDidMount() {
		// onAuthStateChanged will presumably be called every time the authentication
		// state in firebase changes ... and calls authHandler, which assumes the user
		// here is indeed THE OWNER, or that the store.owner field is already set!
		// Everything centers around making sure that store.owner field ain't null. 
		firebase.auth().onAuthStateChanged(user => {
			// A user will only be supplied by onAuthStateChanged IF somebody is
			// logged in. Otherwise, user will be null here.
			if (user) {
				this.authHandler({user});
			}
		})
	}

	// async allows us to handle promises
	// authData is a payload of data about the user who is signed in. Such as
	// displayName, email address, etc, etc.
	authHandler = async (authData) => {
		// 1. Look up the current store in the firebase database
		// Note the fetch operation returns a promise, hence the usage of 'await'
		// The {context: this} somehow contains information about "how to best
		// fetch it". Note that "store" here is just the usual inventory information
		// which has been added to the firebase database. We're just controlling
		// who gets to see it.
		const store = await base.fetch(this.props.storeId, { context: this });
		
		// 2. Check to see if there is an "owner" property from the store, 
		//    if not, it implies noboby has logged in as owner, thus claim it if 
		//    there is no owner. This seems rather dodgy to say the least, and 
		//    sort of implies the owner must always be logged in?? Or at least
		//    has logged in before anyone else. Stated differently, the store.owner
		//    property had darn well better be properly set, otherwise this whole
		//    thing falls apart.
		if (!store.owner) {
			// Save it as our own. Meaning, we are pushing data to firebase using
			// a post operation.
			await base.post(`${this.props.storeId}/owner`, {
				/* could use email address here too, but uid is probably
				   a better choice. */
				data: authData.user.uid
			});
		}

		// 3. Set the state (local) of the inventory component to reflect the 
		// current user. 
		this.setState({
			uid: authData.user.uid,
			owner: store.owner || authData.user.uid
		})
	};

	authenticate = (provider) => {
		/*
		 * Firebase can do all kinds of providers, like email, google account,
		 * facebook, github, etc. Just click on the "Sign-in Method" link in the
		 * Firebase database, to see the various "sign-in providers". In this case,
		 * we are allowing the client (Login.js) to specify which provider to use
		 * by passing, "Github", "Facebook", etc. 
		 * 
		 * Note that each supported sign-in provider must be configured in the 
		 * firebase database, which requires client-ids, secret-ids from each
		 * provider, and providing each the callback url from the firebase
		 * database.
		 * 
		 * Stated differently, the authProvider contains the info the user wishes
		 * to use to sign in with.
		 */
		const authProvider = new firebase.auth[`${provider}AuthProvider`]();
		
		// The authHandler takes care of once some one is signed in, then what 
		// do we do next (ie. authHandler is responsible to sort this out).
		firebaseApp
			.auth()

			// Sign in happens here, using the authProvider created above
			.signInWithPopup(authProvider)
			
			 //If we reach this point, the user is signed in.
			.then(this.authHandler);
	};

	// async which allows us to await inside, and all because we want to wait 
	// for the signout to complete (via await)
	logout = async () => {
		await firebase.auth().signOut();
		this.setState({uid: null});
	}

	render() {
		const logout = <button onClick={this.logout}>Log Out</button>;

		// check if they are logged in
		if (!this.state.uid) {
			// In this case, we don't need the "logout" button
			return <Login authenticateProp={this.authenticate}/>;	
		} 
		
		// check if they are not the owner of the store
		if (this.state.uid !== this.state.owner) {
			return (
				<div>
					<p>Sorry, you are not the owner</p>
					{logout}
				</div>
			);
		} else {
			// Logged in user is assumed to be the owner (questionable logic
			// aside), and thus render the inventory.
			return (
				<div className="inventory">
					<h2>Inventory</h2>
					{logout}
					{
						Object.keys(this.props.fishes).map(
								key => <EditFishForm 
									key={key}
									keyForUpdateFish={key}
									fish={this.props.fishes[key]}
									updateFish={this.props.updateFish}
									deleteFish={this.props.deleteFish}
									/>
							)
					}
	
					{/* Passing the addFish method to AddFishForm */}
					<AddFishForm addFish={this.props.addFish}/>
					<button onClick={this.props.loadSampleFishes}>
						Load Sample Fishes
					</button>
				</div>
			)
		}
	}
}

export default Inventory;