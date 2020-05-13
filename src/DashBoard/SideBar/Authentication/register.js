import React, { Component } from 'react';
import firebase from '../../../FireBase';

class App extends Component {

	constructor(props) {
    	super(props);
    
		this.state = {
			email: '',
			password: '',
			confirmPassword: '',
			error: '',
			complexity: false
		};
		this.register=this.register.bind(this);
		this.requirement=this.requirement.bind(this);
	}	
  
	// register new user

	register(event){
		event.preventDefault();
		if(this.state.complexity){
			const{email,password} = this.state;
			firebase.auth()
			.createUserWithEmailAndPassword(email, password)
			.then( () => {
					//window.location= "/profile";
					console.log('successful registration');
				}
			).catch( err => {
				this.setState({error: err.message});
			});
		}
		
	}

	// password complexity check

	async requirement(event){
		await this.setState({
			[event.target.id]: event.target.value
		});
		if(this.state.password.length<10){
			this.setState({
				error: 'MUST BE AT LEAST 10 DIGITS LONG',
				complexity: false
			});
		}else{
			if(this.state.password===this.state.confirmPassword){
				this.setState({
					error: '',
					complexity: true
				});
			}else{
				this.setState({
					error: 'PASSWORDS DO NOT MATCH',
					complexity: false
				});
			}
		}	
	}


   render() {
	 	
	  return (
	  <div className = "App">
		<form onSubmit={this.register}>
  			<div class="form-group">
				<label for="email">Email address</label>
				<input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" required onChange={this.requirement}/>
				<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  			</div>
			<div class="form-group">
				<label for="password">Password</label>
				<input type="password" class="form-control" id="password" placeholder="Password" required onChange={this.requirement}/>
				<small>{this.state.error}</small>
			</div>
			<div class="form-group">
				<label for="confirmPassword">Confirm Password</label>
				<input type="password" class="form-control" id="confirmPassword" placeholder="Confirm Password" required onChange={this.requirement}/>
	  			<small>{this.state.error}</small>
			</div>
			{/* <div class="form-check">
				<input type="checkbox" class="form-check-input" id="exampleCheck1" />
				<label class="form-check-label" for="exampleCheck1" required>I've read and agreed to the terms and conditions</label>
			</div> */}
			<label onClick={this.props.handleClick} class="btn-light">already have an account?</label>&nbsp;&nbsp;
  			<button type="submit" class="btn btn-secondary">Register</button>
		</form>
	  </div>

	  
	  ); // end of return 
	   
	  
  }	// end of render()
} // end of App class
export default App;
