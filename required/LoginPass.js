
const fs = require('fs');
const prompt = require('prompt-sync')();
const FileFunctions = require('./FileFunctions.js');

const special = ['!', '@', '#', '$', '%', '^', '&', '*'];
const nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
const chars = ['a', 'b', 'c', 'd', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];


//Creates an account, using functions from FileFunctions.js
async function createAccount() {
    let username;
    let password;
    while (true) {
        username = prompt('Enter your username');
        if (!FileFunctions.findIfUserExists(username)) {
            let choice = prompt('Enter 1 to create a password or 2 for a generated password');
            if (choice == 1) {
                password = prompt('Enter you password');
                if (checkPass(password)) {
                    console.log('Enter a strong password');
                    return createAccount();

                }
            }
            else if (choice == 2) {
                let charNum = parseInt(prompt('Enter number of alphabetical characters: '));
                let numNum = parseInt(prompt('Enter number of numbers: '));
                let specialNum = parseInt(prompt('Enter number of special characters: '));

                password = createPassword(charNum, numNum, specialNum);
                console.log(password);
                await new Promise(r => setTimeout(r, 2000));
            }

            break;
        }
        else {
            console.log('Username already exists!')
            let cont = prompt('Press 1 to leave or 2 to continue');
            if (cont == '1') {
                break;
            }
            console.clear();
        }

    }

    FileFunctions.addUser(username, password);
    console.log(`Your password is ${password}`);
}

//Checks if user exists and password is correct, if both are true the user will 'login'
const login = async () => {
    let username = prompt('Enter your username: ');
    let password = prompt('Enter your password');
    let correctPass = await FileFunctions.findPassword(username);
    if (!FileFunctions.findIfUserExists(username)) {
        console.clear();
        console.log("The username does not exist");
        let x = prompt('Try again? 1 yes 2 no')
        if (x == '2') {
            console.clear();
            return;
        }

        return login();

    }
    if (password == correctPass) {
        console.log('Welcome...');
    }
    else (
        console.log('The password is incorrect!')
    )
    if (username.toLowerCase() == 'admin' && password == correctPass) {
        let cont = prompt('Press 1 for all logins or 2 to exit');
        if (cont = '1') {
            console.clear();
            FileFunctions.readAllFiles();
        }
    }
    await new Promise(r => setTimeout(r, 5000));
    console.clear();
}


//Function to change password, uses the ChangePassWrite function
async function changePassword() {
    let username = prompt('Enter your username: ');
    let password = prompt('Enter your password');
    let correctPass = await FileFunctions.findPassword(username);
    if (!FileFunctions.findIfUserExists(username)) {
        console.clear();
        console.log("The username does not exist");
        let x = prompt('Try again? 1(yes) 2(no)');
        if (x == '2') {
            return;
        }

        return login();

    }
    else if (password == correctPass) {
        let newPass = prompt('Enter new password');
        changePassWrite(password, newPass);
        
    }
    else (
        console.log('The password is incorrect!')
    )
}

//Checks users.txt for the account name then updates the password accordingly
function changePassWrite(password, newPassword) {
    fs.readFile('required\\users.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        var result = data.replace(password, newPassword);

        fs.writeFile('required\\users.txt', result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    })
}


//Function to create a randomly generated password based on input from user
function createPassword( charNum, numNum, specialNum) {
    let pass = [];
    let choice = '';
    for (let i = 0; i<  charNum; i++){
        pass.push(chars[Math.floor(Math.random()*chars.length)]);
    }
    for (let i = 0; i<  numNum; i++){
        pass.push(nums[Math.floor(Math.random()*nums.length)]);
    }
    for (let i = 0; i<  specialNum; i++){
        pass.push(special[Math.floor(Math.random()*special.length)]);
    }
    
    pass = shuffle(pass)
    pass.forEach(character => {
        choice+=character;
    });

    return choice;
}


//Shuffles password to increase the 'randomness'
function shuffle(array) {

    var i = array.length;
    let newArr = []
    while (i--) {
         newArr.push(array.splice(Math.floor(Math.random() * (i+1)), 1)[0]);
    }
    return newArr;

}

//Checks if password is correct
function checkPass(password) {
    let isStrong = false;
    let correct = 0;
    if (password.length > 6) {
        correct += 1;
    }
    for (let i = 0; i < password.length; i++) {
        if (password.includes(chars[i].toUpperCase())) {
            correct += 1;
            break;
        }
    }
    for (let i = 0; i < password.length; i++) {
        if (password.includes(nums[i])) {
            correct += 1;
            break;
        }
    }
    for (let i = 0; i < password.length; i++) {
        if (password.includes(special[i])) {
            correct += 1;
            break;
        }
    }
    if (correct >= 4) {
        isStrong = true;
    }
    return isStrong;
}


module.exports = {login, createAccount, changePassword};