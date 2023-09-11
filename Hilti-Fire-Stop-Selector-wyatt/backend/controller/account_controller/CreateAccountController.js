const express = require ("express");
const router = express.Router();
const connection = require("../../index.js").connection;

router.post("/", async (req, res) => {
    try{
        const { username, password, accountType} = req.body;
        console.log(username, password, accountType)
        if(await isExisted("first_name", String(username).toLowerCase())){
            return res.status(400).json({
                status: false,
                message: "Username already exists, please enter another username!"
            });
        }
        const user = await createAccount(username, accountType,  password);
        if(!user){
            return res.status(400).json({
                status: false,
                message: "Failed to create new user!"
            });
        }
        return res.status(200).json({
            status: true,
            user: user,
            message: "Successfully created new user!"
        });
    }
    catch(error){
        console.log(error);
        return res.status(400).json({
            status: false,
            message: error
        });
        }
});
module.exports = router;

const createAccount = async (username, accountType,  password) => {
    try{
        const accountID = await generateID(accountType);
        const account = {
            account_id: String(accountID).toUpperCase(),
            first_name: String(username),
            password: password,
            account_type: accountType,
        };
        const sql  = `INSERT INTO account_t VALUES ('${account.account_id}', '${account.first_name}','','${account.password}','${account.account_type}');`;
        return new Promise((resolve, reject) => {
            connection.query(sql, async (err, result) => {
                if(err){
                    console.log(err)
                    return reject("Error occurred in SQL");
                }else{
                    console.log(`Account: ${account.account_id} successfully created!`);
                    return resolve(account);
                }
            });
        });
    }catch(error){
        console.log(error);
    }
};
const generateID = async (accountType) => {
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    let accountID;
    do{
        if(accountType === 'e'){
            accountID =  '0' + numbers[randomNumber(10)] + numbers[randomNumber(10)] + numbers[randomNumber(10)] + numbers[randomNumber(10)];
        }
        else if(accountType === 'a'){
            accountID =  '1' + numbers[randomNumber(10)] + numbers[randomNumber(10)] + numbers[randomNumber(10)] + numbers[randomNumber(10)];
        }
        //account ID Format: NNNNN
        accountID = String(accountID).toUpperCase();
    }while(await isExisted("account_id", accountID));
    return accountID;
};
const isExisted = (field, data) => {
    const sql = `SELECT * FROM account_t WHERE ${field} = '${String(data)}';`;
    
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if(err){
                console.log(err);
                return reject(true);
            }else{
                return resolve(result.rows.length > 0);
            }
        });
    });
};
const randomNumber = (n) => {
    return Math.floor(Math.random() * n);
};