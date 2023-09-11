const express = require("express");
const router = express.Router();
const connection = require("../../index.js").connection;
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/", async (req, res) => {
    console.log("Entering SignIn Controller");
    try{
        const {username, password, rememberMe} = req.body;
        let account = await getAccount(username);
        account = account[0];

        // Check username input
        if(!account){
            console.log("Invalid username!");
            return res.status(400).json({
                status: false,
                message: "Invalid username and/or password!"
            });
        }

        // Check password input
        if(String(account.password) !== String(password)){
            console.log("Invalid password");
            return res.status(400).json({
                status: false,
                message: "Invalid username and/or password!"
            });
        }

        // Generate token and save the token
        const accountID = account.account_id;
        let loginToken;
        if(rememberMe){
            loginToken = jwt.sign(JSON.parse(`{"accountID":"${accountID}"}`), process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' });
        }
        else{
            loginToken = jwt.sign(JSON.parse(`{"accountID":"${accountID}"}`), process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
        }
        console.log(`${account.account_id} successfully login to his/her account!`);
        return res.status(200).json({
            status: true,
            message: "Log In Successfull!",
            loginToken: loginToken,
            accountType: account.account_type
        });
    }catch(error){
        console.log(error);
        return res.status(400).json({
            status: false,
            message: error
        });
    }
});
module.exports = router;

const getAccount = (username) => {
    const sql = `SELECT * FROM account_t WHERE first_name = '${String(username).toLowerCase()}';`;
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if(err){
                console.log(err);
                return reject("Reject from getting account table");
            }else{
                return resolve(result.rows);
            }
        });
    });
};