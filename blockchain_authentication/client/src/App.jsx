import React, { Component } from 'react';
import Web3 from 'web3';
import Header from './components/Header';
import Home from './components/Home';
import NewUser from './components/NewUser';
import AuthSol from './contracts/Authentication.json';
import './App.css';
import Login from './components/Login';

class App extends Component{
  state = {loaded : false, page_toLoad: 0};
  //0 -> Home page(default), 1-> NewUser, 2-> Sign In

  componentDidMount = async () => {
    
    try {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      console.log("Current Accnt num: ",account);

      const netID = await web3.eth.net.getId();
      this.AuthSol = new web3.eth.Contract(AuthSol.abi, AuthSol.networks[netID].address);
      //console.log("NetID: ", netID);
      this.setState({loaded: true});

    } catch (error) {
      alert("Failed to load web3");
      console.error("Here is error", error);
    }
    
  };

  home_click = () => {
    this.setState({page_toLoad: 0 });
  }
  newUser_click = () =>{
    this.setState({page_toLoad: 1 });
    // alert("Go to New User page");
  }

  login_click = async() =>{
      this.setState({page_toLoad: 2 });
      // alert("Go to Login page");
  }


  render() {
    if(!this.state.loaded){
      return <div> <h3>Loading Web3, accounts, and contract...</h3> </div>
    }
    return (
      <div className="Auth_app">

          <div className='navigation_bar'>
            <div className='nav_butt'>
            <button id='homeB' onClick={this.home_click}> Home </button> 
            <p id='title'> Blockchain Authentication Application</p>
            <button id='signUpB' onClick={this.newUser_click}> Sign Up</button> 
            <button id='loginB' onClick={this.login_click}> Login </button>
            </div>
          </div>
          
          {
            this.state.page_toLoad === 0 ? <Home />  :
            this.state.page_toLoad === 1 ? <NewUser />:<Login />
          }


          
      </div>
    );
  }
}

export default App;
