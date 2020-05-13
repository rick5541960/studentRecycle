import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { findDOMNode } from 'react-dom';

class InNav extends Component {


	constructor(props){
		super(props);

		this.handleOnChange=this.handleOnChange.bind(this);
	}

	handleOnChange(event){
		event.preventDefault();
		this.props.handleOnChange(findDOMNode(this.refs.search)[0].value);
	}


   render() {
	 	
	  return (
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
			<Link to="/" class="navbar-brand">StudentRecycle</Link>
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
			<div class="collapse navbar-collapse" id="navbarNavDropdown">
				<ul class="navbar-nav">

					 {/* <li class="nav-item active">
						<a class="nav-link" href="#">Home<span class="sr-only">(current)</span></a>
					</li>  */}

					<li class="nav-item">
						<Link to="/profile" class="nav-link" >Profile</Link>
						{/* <a class="nav-link" href="#">Profile</a> */}
					</li>
					<li class="nav-item">
						<Link to="/aboutus" class="nav-link" >About Us</Link>
						{/* <a class="nav-link" href="#">About Us</a> */}
					</li>
					
					
				</ul>
				
			</div>
			
			<form ref="search" onSubmit={this.handleOnChange}>
				<input type = "text" />
				<input type="submit" value="search" />
			</form>

			<button class="nav-link btn btn-light" onClick={this.props.signOut}>Sign Out</button>

			<svg width="38" height="38">
				<Link to="/profile">
				<circle cx="19" cy="19" r="16" stroke-width="0" fill="black" />
				<text fill="#ffffff" fontSize="12" x="7" y="24">User</text>
				</Link>
			</svg>
			
		</nav>		

	  
	  ); 
	   
	  
  }
} 
export default InNav;
