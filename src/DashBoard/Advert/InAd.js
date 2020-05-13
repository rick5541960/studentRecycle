import React, { Component } from 'react';
import firebase from '../../FireBase';

class AdBlock extends Component {

	constructor(props) {
    	super(props);
		
		this.state = {
			item: '',
			price: '',
			img: '',
			msg: '',
			contact: '',
			user: null,
			ID: ''
		};

		this.addToWatchList=this.addToWatchList.bind(this);
		this.getProps = this.getProps.bind(this);
	}	

	// access props to fill out content

	getProps(){
		this.setState({
			item: this.props.item,
			price: this.props.price,
			img: this.props.image,
			msg: this.props.msg,
			contact: this.props.contact,
			ID: this.props.ID
		});
	}

	addToWatchList(){
		firebase.firestore().collection('users').doc(this.state.user.uid).get()
			.then(async(doc) => {
				if(!doc.exists){
					let userData = {
						email: this.state.user.email,
						posts: [],
						watchList: [this.state.ID]
					};
					firebase.firestore().collection('users').doc(this.state.user.uid).set(userData);
				}else{
					let tempwatchlist = doc.data().watchList;
					if(!tempwatchlist.includes(this.state.ID)){
						tempwatchlist.push(this.state.ID);
						await firebase.firestore().collection('users').doc(this.state.user.uid).update({watchList: tempwatchlist});
					}
				}
				
			})	
	}
  
	componentDidMount(){
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({ user });
			} else {
				this.setState({ user });
			}
		});
		this.getProps();
	}
  
   render() {
	  return (
	  <div className="App">
			<p style={{display: "inline-block"}}><b>{this.state.item} €{this.state.price}</b></p> <button type="button" class="btn btn-secondary btn-sm" onClick={this.addToWatchList}>WatchList</button>
			<img src = {this.state.img} alt = "Image Not Yet Available" height="200" width="300" style={{display: "block"}}></img> {/* assign style */}
			<p>{this.state.msg}</p>
			{this.state.contact}
	  </div>
	  ); // end of return 
	   
	  
  }	// end of render()
} // end of App class
export default AdBlock;
