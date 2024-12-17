import SignData from "./SignData";
import Web3 from 'web3';


const AuthHash = async (username, accntAddr, password, adh) => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:9545");
    console.log("In AuthHash");
    let passAdhHash = web3.eth.accounts.hashMessage(password+adh); 
    
    console.log("Auth hash", passAdhHash);
    let signedMssg = await SignData(username, accntAddr);
    console.log("Back to Auth hash:", signedMssg);
    return web3.eth.accounts.hashMessage(signedMssg+passAdhHash); 
}

export default AuthHash;