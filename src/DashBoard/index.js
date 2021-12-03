import React, { Component } from 'react';
import SideBar from './SideBar';
import Advert from './Advert';
import firebase from '../FireBase';

class App extends Component {
  

	constructor(props) {
    	super(props);
    
		this.state = {
			items: [],
			user: null,
			search: '',
			filtered: []
		};

		this.handleSubmit=this.handleSubmit.bind(this);
		this.getData=this.getData.bind(this);
	}	


	static getDerivedStateFromProps(props, state){
		if(props.search!==state.search){
			/*
				access state variables or props variables like below:
				!!---state.search and props.search and state.items---!!
				
				set state variables like below:
				!!------------------------
				return({
					items: <something>,
					search: <something>
				})
				------------------------!!

			*/
			let filtered = state.items.filter( post => {
				if(post.item.includes(props.search)||post.description.includes(props.search)){
					return true;
				}
				return false;
			});
			
			return ({
				filtered: filtered,
				search: props.search
			});
		}
		return state;
	}

	
	// handles submit button click in PlaceAd
	// saves post info into firebase
	// image saved in storage, others saved in firestore
	async handleSubmit(item,price,phone,description,image){	
		const uuid = require('uuid/v4');
		let postID = uuid();
		let storageRef = firebase.storage().ref();
		let images = storageRef.child('posts/'+postID);
		// firebase storage, saves image
		images.put(image).then(()=>{
			// firebase firestore 
			let data = {
				item: item,
				price: price,
				phone: phone,
				description: description,
				postID: postID,
				date: Date.now()
			}; 
			// saves posts into posts doc (posts pool)
			firebase.firestore().collection('posts').doc(postID).set(data);
			// updates users profile (user's posts)
			const { user } = this.state;
			firebase.firestore().collection('users').doc(user.uid).get()
				.then((doc)=>{
					if(!doc.exists){
						let userData = {
							email: user.email,
							posts: [postID],
							watchList: []
						};
						firebase.firestore().collection('users').doc(user.uid).set(userData);
					}else{
						let userPosts = doc.data().posts
						userPosts.push(postID);
						firebase.firestore().collection('users').doc(user.uid).update({posts: userPosts});
					}
				}).catch((error)=>{console.log(error.message);});

		}).then(()=>{
			this.getData();
		});
	}

	// retrieves posts info from firebase (posts pool)
	getData(){
		firebase.firestore().collection('posts').orderBy('date', 'desc').get()
			.then( async (snapshot) => {
				if (snapshot.empty) {
					console.log('No matching documents.');
				}else{
					let temp = [];
					snapshot.forEach(doc => {
						temp.push(doc.data());
					});
					
					for(let i=0;i<temp.length;i++){
						let obj = temp[i];
						await firebase.storage().ref().child('posts/'+obj.postID).getDownloadURL()
							.then( url =>{
								obj = {
									item: obj.item,
									price: obj.price, 
									image: url, 
									description: obj.description, 
									phone: obj.phone,
									postID: obj.postID
								}
								// update image attribute
								temp[i] = obj;
							}).catch( err => {console.log(err.message);});
					}
					await this.setState({
						items: temp,
						filtered: temp
					});
					
				}
			})
			.catch(err => {
				console.log(err.message);
			});
		
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
		// get data from firebase posts
		this.getData();
	}

   render() {
	  return (
		<div class="container-fluid">
			<div class="row" style={{height: "calc(100vh - 72px)"}}>
				<div class="col-lg-7 h-100 border-right border-muted overflow-auto">
					<Advert items={this.state.filtered}/>     
				</div>

				<div class="col-lg-5 h-100 border-right border-muted overflow-hidden">           
					<SideBar handleSubmit={this.handleSubmit}/>
				</div>
			</div>
			
		</div>
	  ); // end of return 
	   
	  
  }	// end of render()
} // end of App class
export default App;
