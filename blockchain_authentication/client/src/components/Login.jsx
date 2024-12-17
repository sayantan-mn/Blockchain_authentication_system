import React, { Component } from 'react';
import Web3 from 'web3';
import AuthValid from '../validator/AuthValidation';
import "../App.css";
import AuthSol from '../contracts/Authentication.json';
import Decrypt from "../validator/Decryption";

class Login extends Component {
    state = {
        username: "",
        password: "",
        adh_id: "",
        userAddress: "",
        login_status: false,
        f_name: "",
        dob: "",
        addr: "",
    };

    logout_click = () => {
        if (this.state.login_status === true){
            this.setState({username: "",
                password: "",
                adh_id: "",
                userAddress: "",
                login_status: false, });
        }
      }

    LoginSubmit = async() => {

       
        if(this.state.username !== "" && this.state.password !== "" && this.state.adh_id !== ""){
            let uname = this.state.username.trim();
            let pass = this.state.password.trim();
            let adh = this.state.adh_id.trim();

            if(pass.length < 8){
                alert("Password length less than 8 chars");
                return;
            }
            else if(adh.length !==6){
                alert("Please put only last 6 digits of adhaar ID");
                return;
            }
            else {

                const web3 = new Web3(Web3.givenProvider || "ws://localhost:9545");
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const netID = await web3.eth.net.getId();
                const account = accounts[0];
                console.log("Web3", Web3.givenProvider);
                console.log("Contract ABI:", AuthSol.abi);
                console.log("Contract Address:", AuthSol.networks[netID].address);

                this.AuthSol = new web3.eth.Contract(AuthSol.abi, AuthSol.networks[netID].address); 

                if (!AuthSol.networks[netID]) {
                    console.error("No contract deployed on this network. Check your network ID.");
                    return;
                }
                
                try{
            
                    let userAddr = await this.AuthSol.methods.getUserAddress().call({ from: account }); 
                    
                    console.log("User Address: ", userAddr);


                    if (userAddr === "0x0000000000000000000000000000000000000000"){
                        console.log("User not registered, Please register first!!..");
                        alert("User not registered, Please register first!!..");
                        return
                    }
                    else{
                        let validated = await AuthValid(uname, account, pass, adh);
                        
                        if(validated){
                            console.log("Signin Successfull, User validated!!");
                            let details = await this.AuthSol.methods.getUserDetails().call({ from: account }); 
                            this.setState({ f_name: details.name,
                                dob: details.dob,
                                addr: details.addr, 
                                login_status: true, 
                                userAddress: userAddr
                             });
                            
                            console.log("Cipher text from SC:", details.cipher);
                            let dec = await Decrypt(details.cipher, adh);
                            console.log("Plain text: ", dec);
                            alert("User validated Successfully");
                            return;
                        }
                        else{
                            console.log("SignIN Unsuccessful");
                            this.setState({ login_status: false });
                            alert("Wrong SignIn details provided");

                            return;
                        }
                    }
                    
                    
        
                } catch(err){
                    console.log("Error in Login Page:", err);
                }

            }


        }
        else{
            alert("Please fill in the Login Values!");
            
        }
    }
    
    render(){
        return(
            <div className='login'>     

                {
                    this.state.login_status === false ?
                        <div className='login_container'>
                            <h1> Login Page </h1>
                        <form>
                                <label>Username: </label>
                                <input required type="text" name="username" value={this.state.username} onChange={x => this.setState({username: x.target.value})} />
                                <label>Password: </label>
                                <input type="password" name="password" value={this.state.password} onChange={x => this.setState({password: x.target.value})} />
                                <label>Adhaar ID: </label>
                                <input type="text" name="adh_id" placeholder="Last 6 digits" value={this.state.adh_id} onChange={x => this.setState({adh_id: x.target.value})} />
                                <button type='button' onClick={this.LoginSubmit}>Submit</button>
                            </form>
                        </div>
                            
                    
                    :
                    <div className='user_page'>
 
                        <h2>User details:</h2>
                        <label> User Name: {this.state.username}</label>
                        <label> Adhaar ID: {this.state.adh_id}</label>
                        <label> User Address: {this.state.userAddress}</label>
                        <label> Full name: {this.state.f_name}</label>
                        <label> Date of Birth: {this.state.dob}</label>
                        <label> Address: {this.state.addr}</label>
                        <button onClick={this.logout_click}> Logout </button>

                    </div>
                    
                }
                
            </div>
        );
    }

}

export default Login;


