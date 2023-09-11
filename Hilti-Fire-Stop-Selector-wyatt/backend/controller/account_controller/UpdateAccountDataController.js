const express = require ("express");
const router = express.Router();
const connection = require("../../index.js").connection;

router.post("/", async (req, res) => {
    const { account_id, first_name,password,account_type } =  req.body
    try{  
    const affectedUser = await updateAccountData(account_id, password, first_name, account_type);      
    console.log(`User data for id: ${account_id} successfully updated!`);
    return res.status(200).json({
        status: true,
        message: "Profile successfully updated!",
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


const getAccountData = (account_id) => {
    const sql = `SELECT * FROM account_t WHERE account_id = '${account_id}';`;
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if(err){
                console.log(err);
                return reject(null);
            }else{
                return resolve(result.rows);
            }
        });
    });
};

const updateAccountData = (account_id, password, firstName, account_type) => {
    const sql = `UPDATE account_t set password = '${password}', first_name = '${firstName}', last_name = '', account_type ='${account_type}' WHERE account_id = '${account_id}';`;
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if(err){
                console.log(err);
                return reject(true);
            }else{
                return resolve(result.rowCount);
            }
        });
    });
};