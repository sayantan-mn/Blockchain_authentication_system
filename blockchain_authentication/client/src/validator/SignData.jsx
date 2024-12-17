import Web3 from 'web3';

const SignData = async (username, accntAddr) => { 
    const web3 = new Web3(Web3.givenProvider || "http://localhost:9545");
    console.log("In SignData");
    let signedData;
    try{
        const signature = await web3.eth.personal.sign(username, accntAddr, '');

        signedData = web3.eth.accounts.hashMessage(signature); 
        console.log("Signed Data:", signedData);
        return signedData;
    } catch(err){
        console.error("Error signing data:", err);
        return err;
    }
}

export default SignData;