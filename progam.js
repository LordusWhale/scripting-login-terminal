const fs = require('fs');
const prompt = require('prompt-sync')();
const loginCreate = require('./required/LoginPass.js')

/*
   Sam Sweeney 0/06/2022
   The purpose of this program is to provide a simple login application, storing usernames and passwords into a 
   text file, then reading them to cofirm that the login is correct
*/



// Main program
const program = async ()=>{
    while (true){
    console.log('Press 1 to create an account,  2 to login or 3 to update');
    const choice = prompt('');
    if (choice == '1'){
        await loginCreate.createAccount();
    }
    else if (choice == '2'){
        await loginCreate.login()
    }
    else if (choice == '3' ){
        await loginCreate.changePassword();
    }
}
    
}

program();
console.clear();