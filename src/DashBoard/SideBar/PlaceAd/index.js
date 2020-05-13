import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

class App extends Component {

	constructor(props) {
    	super(props);

		this.handleSubmit=this.handleSubmit.bind(this);
	}	

	handleSubmit(event){
		event.preventDefault();
		
		let	item= findDOMNode(this.refs.adForm)[0].value;
		let	price= findDOMNode(this.refs.adForm)[1].value;
		let	phone= findDOMNode(this.refs.adForm)[2].value;
		let	description= findDOMNode(this.refs.adForm)[3].value;
		let	image= findDOMNode(this.refs.adForm)[4].files[0];
		
		this.props.handleSubmit(item ,price ,phone ,description ,image);
		findDOMNode(this.refs.adForm).reset();

	}

  
   render() {

	  return (
	  <div className="App">
		<form ref="adForm" onSubmit={this.handleSubmit}>
			
			<div class="form-group">
				<label for="item">Item: </label>
				<input type="text" class="form-control" id="item" placeholder="Frying Pan" />
				<small>NO MORE THAN 20 CHARACTERS</small>
			</div>

			<div class="form-group">
				<label for="price">Price: </label>
				<input type="text" class="form-control" id="price" placeholder="20" />
			</div>

			<div class="form-group">
				<label for="contact">Phone Number: </label>
				<input type="text" class="form-control" id="contact" placeholder="089-000-0000" />
			</div>
			
			<div class="form-group">
				<label for="description">Item Description: </label>
				<textarea class="form-control" id="description" rows="3"></textarea>
			</div>

			<div class="form-group">
				<label for="image">Images: </label>
				<input type="file" class="form-control-file" id="image" accept="image/*" />
			</div>

			<button type="submit" class="btn btn-secondary">Upload</button>
		</form>

	  </div>
	  ); // end of return 
	   
	  
  }	// end of render()
} // end of App class
export default App;
