// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract Authentication {
    uint256 public nbOfUsers;

    struct User {
        string signatureHash; //stores hash of signed data
        address userAddress; //user account address
        string name;
        string dob;
        string addr;
        string cipher;
    }

    mapping(address => User) private user;
    
    constructor() {
        nbOfUsers = 0;
    }

    function register(string memory _signature, string memory f_name, string memory dob, string memory addrss, string memory cipher) public { // returns(uint)
        require(
            //user[msg.sender].userAddress == address();
            user[msg.sender].userAddress == address(0x0000000000000000000000000000000000000000),
            "User Already registered"
        );

        user[msg.sender].signatureHash = _signature;
        user[msg.sender].userAddress = msg.sender;
        user[msg.sender].name = f_name;
        user[msg.sender].dob = dob;
        user[msg.sender].addr = addrss;
        user[msg.sender].cipher = cipher;
        nbOfUsers++;
        

        //return nbOfUsers;
    }

    function getSignatureHash() public view returns (string memory) {
        require(msg.sender == user[msg.sender].userAddress, "Operation Not allowed");

        return user[msg.sender].signatureHash;
    }

    function getUserAddress() public view returns (address) {
        return user[msg.sender].userAddress;
    }


    function getUserDetails() public view  returns (User memory){ //Sends the details of the user asked for
        return user[msg.sender];
    }
}