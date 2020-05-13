import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from './Navigation';
import DashBoard from './DashBoard';
import AboutUs from './AboutUs';
import Profile from './Profile';
import icon from './recycleIcon.png';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      search: ''
    };

    this.handleOnChange=this.handleOnChange.bind(this);
  }


  handleOnChange(search_string){
    // this is the function that handles the on change event for the search bar
    // it should take in the user input value and update relavent state
    // please save the user input value in this.state.search, as it is passed down to child components
    // the code below doesn't actually work, it just sets the value to something, instead of user input

    this.setState({search: search_string});
  }


   render() {
	  return (
	  <div className="App">
      <div style = {{backgroundColor: "90EE90", border: "6px solid green"}}>
        <img src={icon} alt="the recycle icon" width="250px" height="140px" style={{display: 'inline-block'}}/>
        <Router>
        <div class="container">
          
          <NavBar handleOnChange={this.handleOnChange}/>

          <Switch>
            <Route exact path='/' render={(props)=><DashBoard {...props} search={this.state.search} />} />
            <Route path='/home' component={DashBoard} />
            <Route path='/aboutus' component={AboutUs} />
            <Route path='/profile' component={Profile} />
          </Switch>
          
            
          
        </div>
        
        </Router>
      </div>
	  </div>
	  ); // end of return 
	   
	  
  }	// end of render()
} // end of App class
export default App;
