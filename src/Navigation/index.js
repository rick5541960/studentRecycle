import React, { Component } from 'react';
import Out from './OutNavBar';
import In from './InNavBar';
import firebase from '../FireBase';

class App extends Component {
  
    constructor(props){
        super(props);

        this.state={
            user: null
        };

        this.signOut=this.signOut.bind(this);
        this.checkUserStatus=this.checkUserStatus.bind(this);
    }

    // call database to check whether user is loged in 

    componentDidMount(){
      this.checkUserStatus();
    }

    checkUserStatus(){
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({user});
        } else {
          this.setState({user});
          // No user is signed in.
        }
      });
    }
    
    signOut(){
      firebase.auth().signOut().then(() => {
       //this.checkUserStatus();
      }).catch(function(error) {
        // An error happened.
      });
    }

   render() {
    
	  return (
		  this.state.user?<In signOut={this.signOut} handleOnChange={this.props.handleOnChange}/>:<Out handleOnChange={this.props.handleOnChange}/>
	  ); // end of return 
	   
	  
  }	// end of render()
} // end of App class
export default App;
