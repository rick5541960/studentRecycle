import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import firebase from './../../FireBase';

class AdBlock extends Component {

	constructor(props) {
    	super(props);
		
		this.state = {
			item: '',
			price: '',
			img: '',
			msg: '',
			contact: '',
			edit: false
		};

		this.edit=this.edit.bind(this);
		this.delete=this.delete.bind(this);
		this.getProps = this.getProps.bind(this);
	}	

	// access props to fill out content

	getProps(){
		this.setState({
			item: this.props.item,
			price: this.props.price,
			img: this.props.image,
			msg: this.props.msg,
			contact: this.props.contact
		});
	}
  
	componentDidMount(){
		this.getProps();
	}

	delete(){
		this.props.delete(this.props.ID);
	}

	async edit(event){
		// get form data and pass into function from props
		event.preventDefault();
		let ID = this.props.ID;
		let	item = findDOMNode(this.refs.editForm)[0].value;
		let	price = findDOMNode(this.refs.editForm)[1].value;
		let	description = findDOMNode(this.refs.editForm)[2].value;
		let	phone = findDOMNode(this.refs.editForm)[3].value;
		let	img = findDOMNode(this.refs.editForm)[4].files[0];

		// clear form before form closes
		findDOMNode(this.refs.editForm).reset();


		await firebase.storage().ref().child('posts/'+ID).put(img);
		await firebase.storage().ref().child('posts/'+ID).getDownloadURL()
			.then( url => {
				this.setState({
					item: item,
					price: price,
					msg: description,
					contact: phone,
					img: url,
					edit: !this.state.edit
				});
			})

		this.props.edit(ID, item, price, description, phone);
	}
	
   render() {
	  return ( 
		  this.state.edit?
	  <div className="edit" class="container">
		  <button onClick={()=>this.setState({edit:!this.state.edit})}>cancel</button>
		  <button onClick={this.delete}>delete</button>
		  
		  <form ref="editForm">
		    <div class="form-group col-8">
				<label for="item">Item</label>
				<input type="text" class="form-control" id="item" placeholder={this.props.item}/>
			</div>
			<div class="form-group col-8">
				<label for="price">Price</label>
				<input type="text" class="form-control" id="price" placeholder={this.props.price} />
			</div>
			<div class="form-group col-8">
				<label for="description">Description</label>
				<textarea class="form-control" id="description" rows="3" placeholder={this.props.msg}></textarea>
			</div>
			<div class="form-group col-8">
				<label for="contact">Phone Number</label>
				<input type="text" class="form-control" id="contact" placeholder={this.props.contact} />
			</div>
			<div class="form-group">
				<label for="image">Images: </label>
				<input type="file" class="form-control-file" id="image" accept="image/*" />
			</div>
			<button type="submit" class="btn btn-primary" onClick={this.edit}>Submit</button>
		   </form>
	  </div>
		:
	  <div className="App"> 
		  	
			<p style={{display: "inline-block"}}><b>{this.state.item} €{this.state.price}</b></p> <button onClick={()=>this.setState({edit:!this.state.edit})}>edit</button>
			<img style={{display: "block"}} src = {this.state.img} alt = "Not Yet Available" height="200" width="300"></img> {/* assign style */}
			<p>{this.state.msg}</p>
			{this.state.contact}
	  </div>
	  
	  

	  ); // end of return 
	   
	  
  }	// end of render()
} // end of App class
export default AdBlock;
