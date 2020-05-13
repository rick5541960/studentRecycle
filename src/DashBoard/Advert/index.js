import React, { Component } from 'react';
import InAd from './InAd';
import OutAd from './OutAd';
import firebase from '../../FireBase';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			items: [],
			user: null
		}
	}

	static getDerivedStateFromProps(props, state){
		if(props.items!==state.items){
			return ({items: props.items});
		}
		return state;
	}

	componentDidMount(){
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
			  // user signed in
			  this.setState({user});
			} else {
			  // NO user signed in
			  this.setState({user});
			}
		});
	}

   render() {
	const{ items } = this.state;
	  return (
	  <div class="overflow-auto">
		  {/* 
		  	react elements are identified with key values,
		  	identical key values are assumed to be the same elements
			resulting in faulty re-render
			use postID as key values to ensure successful re-render
		  */}
		{items.map( obj => 
			<div class="ad">
				{this.state.user?<InAd key={obj.postID} ID = {obj.postID} item = {obj.item} price = {obj.price} image = {obj.image} msg = {obj.description} contact = {obj.phone} />
				:<OutAd key={obj.postID} item = {obj.item} price = {obj.price} image = {obj.image} msg = {obj.description} contact = {obj.phone} />}
			</div>
		)}

	  </div>
	  ); // end of return 
	   
	  
  }	// end of render()
} // end of App class
export default App;
