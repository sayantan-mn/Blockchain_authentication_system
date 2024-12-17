const CryptoJS = require("crypto-js");

const Encryption = async (f_name, dob, place, sec_key) => {
    try{
    var enc = CryptoJS.AES.encrypt(f_name+'|'+dob+'|'+place,sec_key).toString();
    // console.log("Encrypted data: ", enc);
    return enc;
    }
    catch(err){
        console.log(err);
    }
    
}
export default Encryption;