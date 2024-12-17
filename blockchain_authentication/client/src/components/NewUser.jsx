import React, { Component } from 'react';
import Web3 from 'web3';
import AuthHash from '../validator/AuthHash';
import "../App.css";
import AuthSol from '../contracts/Authentication.json';
import Encrypt from "../validator/Encryption";


class NewUser extends Component{

    state = {
        username: "",
        password: "",
        adh_id: "",
        user_acc: "",
        block_hash: "",
        f_name: "",
        dob: "",
        addr:"",
        cipher:"",
        signUp: false
    };
    

    handleSubmit = async () =>{
        const {username, password, adh_id, f_name, dob, addr} = this.state;
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:9545");
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const netID = await web3.eth.net.getId();
        const account = accounts[0];
        console.log("Useraccount:",account)
        this.AuthSol = new web3.eth.Contract(AuthSol.abi, AuthSol.networks[netID].address);

        //console.log(username, password, adh_id);

        if(this.state.username !== "" && this.state.password !== "" && this.state.adh_id !== ""){

            let pass = this.state.password.trim();
            let adh = this.state.adh_id.trim();

            if(pass.length < 8){
                alert("Password length less than 8 chars");
                return;
            }
            else if(adh.length !==6){
                alert("Please put last 6 digits of adhaar ID");
                return;
            }
            else{
                let userAddr = await this.AuthSol.methods.getUserAddress().call({ from: account });
                if (userAddr !== '0x0000000000000000000000000000000000000000'){
                    alert("Account already exist");
                    return;
                }
                else{
                    let hash = await AuthHash(username, account, pass, adh); 
                    console.log("Hash data in newuser", hash);
        
                    let enc = await Encrypt(f_name, dob, addr, adh_id); 
                    console.log("In NewUser, Cypher text: ", enc);

                    let result = await this.AuthSol.methods.register(hash, f_name, dob, addr, enc).send({ from: account }); //register user
                    let userAddr = await this.AuthSol.methods.getUserAddress().call({ from: account });
                    console.log("Registered User Address: ", userAddr);  
                    
                    this.setState({
                        username: username,
                        password: pass,
                        adh_id: adh,
                        user_acc: userAddr,
                        cipher: enc,
                        signUp: true
                    });

                    console.log("Number of users:", result);
                    console.log("ABI Contract: ", AuthSol.networks[netID].address);
                    await web3.eth.getBlock('latest').then((block) => {this.setState({ block_hash: block.hash })});
                    alert("SignUp Successful"); 
                    return;
                }
            }
        }

        else{
            alert("Please fill the values");
        }

    }
   
    render(){
        return(
            <div className='new_user'>
                <div className='det1'>
                <h1>
                Sign Up page
                </h1>
                <div className='details_container'>
                <h2> New User</h2>
                <div className='newuser_details'> 

                <div className='general_details'>
                <label>Full Name: </label>
                <input type="text" name="f_name" value={this.state.f_name} onChange={x => this.setState({f_name: x.target.value})}/> 
                <label>Date of birth: </label>
                <input type="date" name="dob" value={this.state.dob} onChange={x => this.setState({dob: x.target.value})}/>
                <label>Address: </label>
                <input type="text" name="Address" value={this.state.addr} onChange={x => this.setState({addr: x.target.value})}/> 
                </div>
                
                <div className='user_details'>
                <label>Username: </label>
                <input required type="text" name="username" value={this.state.username} onChange={x => this.setState({username: x.target.value})} />
                <label>Password: </label>
                <input type="password" name="password" value={this.state.password} onChange={x => this.setState({password: x.target.value})} />
                <label>Adhaar ID: </label>
                <input type="text" name="adh_id" placeholder="Last 6 digits" value={this.state.adh_id} onChange={x => this.setState({adh_id: x.target.value})} />
                </div>
                </div>
                

                
                {
                    !this.state.signUp ? console.log() : 
                    <div className='det2'>
                    <div className='detials_provided'>
                    <h3>Login Details (Please save these details) </h3>
                    <label>Username: {this.state.username } </label>
                    <label>Password: {this.state.password } </label>
                    <label>Aadhaar : {this.state.adh_id } </label>
                    <label>User Account Number: {this.state.user_acc} </label>
                    <label>Block Number: {this.state.block_hash}</label>
                    </div>
                    </div>
                }
               
                <button type='button' onClick={this.handleSubmit}>Submit</button>
            </div> 

            
            </div>
                
                
            </div>
        );
    }
}

export default NewUser;