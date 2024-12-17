const CryptoJS = require("crypto-js");

const Decryption = async (cypher, sec_key) => {
   try{
    var dec = CryptoJS.AES.decrypt(cypher, sec_key);
    var decText = dec.toString(CryptoJS.enc.Utf8);
    // console.log("Decrypted data: ", decText);
    return decText;
   }catch(err){
    console.log(err);
   }
}

export default Decryption;