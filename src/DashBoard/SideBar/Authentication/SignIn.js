import React, { Component } from 'react';
import firebase from '../../../FireBase';

class App extends Component {

	constructor(props) {
    	super(props);
    
		this.state = {
			email: '',
			password: '',
			error: ''
		};

		this.signIn=this.signIn.bind(this);
		this.requirement=this.requirement.bind(this);
	}

	// sign in user

	signIn(event){
		event.preventDefault();
		const{email,password} = this.state;
		firebase.auth()
		.signInWithEmailAndPassword(email, password)
		.then( () => {
			//window.location="/profile";
			
		}).catch( err => { 
			this.setState({error: err.message});
		});
	}
	
	async requirement(event){
		await this.setState({
			[event.target.id]: event.target.value
		});
	}


   render() {
	 	
	  return (
	  <div className = "App">
		<form onSubmit={this.signIn}>
  			<div class="form-group">
				<label for="email">Email address</label>
				<input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.requirement} />
				<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  			</div>
			<div class="form-group">
				<label for="password">Password</label>
				<input type="password" class="form-control" id="password" placeholder="Password" onChange={this.requirement} />
			</div>
	  		<p>{this.state.error}</p>
			<label onClick={this.props.handleClick} class="btn-light">create a new account?</label>&nbsp;&nbsp;
  			<button type="submit" class="btn btn-secondary">Log In</button>
		</form>
	  </div>

	  
	  ); // end of return 
	   
	  
  }	// end of render()
} // end of App class
export default App;
