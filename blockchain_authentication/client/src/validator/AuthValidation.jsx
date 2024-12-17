import SignData from './SignData';
import AuthSol from '../contracts/Authentication.json';
import Web3 from 'web3';

const AuthValidation = async (username, accntAddr, password, adh_id) => {

    console.log("In Auth Validation");
    const web3 = new Web3(Web3.givenProvider || "ws://localhost:9545");
    const netID = await web3.eth.net.getId();
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];

    console.log("Contract ABI in Auth Val:", AuthSol.abi);
    console.log("Contract Address in Auth Val:", AuthSol.networks[netID].address);
    console.log("UserAccount in Auth Val:", account);

    let AuthVar = new web3.eth.Contract(AuthSol.abi, AuthSol.networks[netID].address);
    let userAddr = await AuthVar.methods.getUserAddress().call({ from: accntAddr });

    if (userAddr.toLowerCase() !== accntAddr.toLowerCase()) {
        return false;

    } else {
        let signedData = await SignData(username, accntAddr);
        let passAdhIDHash = web3.eth.accounts.hashMessage(password + adh_id); 
        let hash = web3.eth.accounts.hashMessage(signedData + passAdhIDHash);
        let hashFromContract = await AuthVar.methods.getSignatureHash().call({ from: accntAddr });

        if (hash === hashFromContract) {
            return true;
        } else {
            return false;
        }
    }
}

export default AuthValidation;