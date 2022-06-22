const fs = require('fs');
const prompt = require('prompt-sync')();




// Reads all files in the users.txt
function readAllFiles(){
    const allFiles = fs.readFileSync('required\\users.txt', 'utf-8');
    console.log(allFiles);
}

//Appends users.txt with new username and password
 const addUser = async (username, password) => {
    const userAndPass = `${username}  ${password}\n`;
    fs.appendFileSync('required\\users.txt', userAndPass);

    
}
//Finds password in users.txt, used for validating credentials 
 const findPassword = async (user) => {
    let pass;
    const allFileContents =fs.readFileSync('required\\users.txt', 'utf-8');
     allFileContents.split(/\r?\n/).forEach(line => {
        if (line.includes(user)) {
            line = line.substring(line.indexOf(' ') + 1);
            line = line.replace(' ', '');
            pass = line;
        }
    });
    return pass;

}
//Checks if the username is already stored in users.txt
 const findIfUserExists = (user) => {
    let found = false;
    const allFileContents = fs.readFileSync('required\\users.txt', 'utf-8');
    allFileContents.split(/\r?\n/).forEach(line => {
        let first = '';
        first = line.split(' ')[0]
        if (user == first){
            console.log(first)
            found =  true;
        }

    });
    return found;
}


module.exports = { findPassword, findIfUserExists, readAllFiles, addUser};