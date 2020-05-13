import React, { Component } from 'react';
import Register from './register';
import SignIn from './SignIn';
import firebase from '../../../FireBase';

class App extends Component {

	constructor(props) {
    	super(props);
    
		this.state = {
			accountOwner: true
		};

		this.handleClick=this.handleClick.bind(this);
	}	

	// check user sign in status

	handleClick(){

		this.setState({accountOwner: !this.state.accountOwner});
	}


   render() {
	
	  return (
		this.state.accountOwner? <SignIn handleClick={this.handleClick} /> :  <Register handleClick={this.handleClick} />
		
	  ); // end of return 
	   
	  
  }	// end of render()
} // end of App class
export default App;
