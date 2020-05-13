import React, { Component } from 'react';

class AdBlock extends Component {

	constructor(props) {
    	super(props);
		
		this.state = {
			item: '',
			price: '',
			img: '',
			msg: '',
			contact: ''
		};

		
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
  
   render() {
	  return (
	  <div className="App">
			<p><b>{this.state.item} €{this.state.price}</b></p>
			<img src = {this.state.img} alt = "Not Yet Available" height="200" width="300"></img> {/* assign style */}
			<p>{this.state.msg}</p>
			{this.state.contact}
	  </div>
	  ); // end of return 
	   
	  
  }	// end of render()
} // end of App class
export default AdBlock;
