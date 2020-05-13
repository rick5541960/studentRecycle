import React, { Component } from 'react';
import firebase from '../../FireBase';
import Auth from './Authentication';
import PlaceAd from './PlaceAd';


class App extends Component {

	constructor(props){
		super(props);

		this.state={
			user: null
		};
	}

	// will only see PlaceAd after Signing In
	// call database to check whether user is signed in

	componentDidMount(){
		
		firebase.auth().onAuthStateChanged((user) => {
		  if (user) {
			
			this.setState({user});
		  } else {
			// No user is signed in.
			
			this.setState({user});
			
		  }
		});
	}



   render() {
	
	  return (
		this.state.user?<PlaceAd handleSubmit={this.props.handleSubmit}/>:<Auth />
	  ); // end of return 
	   
	  
  }	// end of render()
} // end of App class
export default App;
