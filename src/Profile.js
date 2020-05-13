import React, { Component } from 'react';
import firebase from './FireBase';
import UserAd from './DashBoard/Advert/userAd.js';
import WatchAd from './DashBoard/Advert/watchAd.js';

class App extends Component {
  
	constructor(props){
		super(props);

		this.state = {
			user: null,
			email: '',
			posts: [],
			watchList: [],
			userPosts: [],
			userWatchList: []
		};

		this.removeFromWatch=this.removeFromWatch.bind(this);
		this.deletePost=this.deletePost.bind(this);
		this.editPost=this.editPost.bind(this);
		this.getData=this.getData.bind(this);
	}

	/* 
		posts: user postIDs (only contains IDs)
		watchList: user watchList postIDs (only contains IDs)
		userPosts: actual posts (full information)
		userWatchList: actual posts (full information)
	*/

	async editPost(ID, item, price, description, phone){
		let postInfo = {
			item: item,
			price: price, 
			description: description, 
			phone: phone,
			postID: ID,
			date: Date.now()
		};

		await firebase.firestore().collection('posts').doc(ID).set(postInfo);
		
		// refresh page and state variables with new data
		this.getData();
	}

	async removeFromWatch(ID){
		let index = this.state.watchList.indexOf(ID);
		let tempwatchlist = this.state.watchList;
		tempwatchlist.splice(index,1);

		this.setState({
			watchList: tempwatchlist,
			userWatchList: []
		});
		// delete postID from user.watchlist collection
		await firebase.firestore().collection('users').doc(this.state.user.uid).update({watchList: tempwatchlist});

		this.getData();
	}


	async deletePost(ID){
		// delete from firestore and storage, post info and image
		await firebase.firestore().collection('posts').doc(ID).delete();
		await firebase.storage().ref().child('posts/'+ID).delete();

		// refresh page and states with new data
		this.getData();
	}

	// call firebase to get user information
	// if not logged in, display SignIn panel

	componentDidMount(){
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				firebase.firestore().collection('users').doc(user.uid).get()
					.then((doc) => {
						let data = doc.data();
						this.setState({
							user: user,
							email: user.email,
							posts: data.posts,
							watchList: data.watchList
						});
					}).then(()=>{
						this.getData();
					}).catch( error => {
						console.log(error.message);
					});
			} else {
				this.setState({ user });
			}
		});
	}

	getData(){
		firebase.firestore().collection('posts').orderBy('date','desc').get()
			.then( async snapshot => {
				if (snapshot.empty) {
					console.log('posts pool empty!');
				}else{
					let tempUser = [];
					let tempWatch = [];
					let temp = [];
					snapshot.forEach(doc=>{
						temp.push(doc.data());
					});
					for(let i=0;i<temp.length;i++){
						let obj = temp[i];
						// if post is one of user's posts
						if(this.state.posts.includes(obj.postID)){
							await firebase.storage().ref().child('posts/'+obj.postID).getDownloadURL()
								.then( url =>{
									tempUser.push({	
										postID: obj.postID,
										item: obj.item,
										price: obj.price, 
										image: url, 
										description: obj.description, 
										phone: obj.phone
									});
									
								}).then(() => { 
									// update userPosts state
									this.setState({userPosts: tempUser});
								}).catch( err => {
									console.log(err.message);
								});
						}
						// if post is on user watch list
						if(this.state.watchList.includes(obj.postID)){
							await firebase.storage().ref().child('posts/'+obj.postID).getDownloadURL()
								.then( url =>{
									tempWatch.push({
										postID: obj.postID,
										item: obj.item,
										price: obj.price, 
										image: url, 
										description: obj.description, 
										phone: obj.phone
									});
									
								}).then(() => { 
									// update userWatchList state
									this.setState({userWatchList: tempWatch});
								}).catch( err => {
									console.log(err.message);
								});
						}
						
					}
				}
			})
			.catch(err => {
				console.log(err.message);
			});
	}




   render() {
	 	
	  return (
		<div class="container-fluid">
			
			<h1>User Information</h1>
			<p><b>E-mail: </b> {this.state.email}</p>
			
			<div class="row">
				<div class="col">
					<p><b>Watch List: </b></p> {this.state.userWatchList.map((post)=>{
						return <WatchAd key={post.postID} ID={post.postID} remove={this.removeFromWatch} item = {post.item} price = {post.price} image = {post.image} msg = {post.description} contact = {post.phone} />;
					})} 
				</div>
			<br/>
				<div class="col">
					<p><b>User's Posts: </b></p> {this.state.userPosts.map((post)=>{
						return <UserAd key={post.postID} ID={post.postID} delete={this.deletePost} edit={this.editPost} item = {post.item} price = {post.price} image = {post.image} msg = {post.description} contact = {post.phone} />;
					})} 
				</div>
			</div>

			
		</div>
	  ); // end of return 
	   
	  
  }	// end of render()
} // end of App class
export default App;
