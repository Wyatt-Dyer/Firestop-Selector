const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const connection = require("../../index.js").connection;
require ("dotenv").config();

router.post("/", async (req, res) => {
    try{
        const token = req.body.token;
        console.log("token is ", token)
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, data) => {
            if(err){
                return res.status(403).json({
                    accountID: "none"
                });
            }
            console.log(data)
            const checkID = await isAccountExist(data.accountID);

            if(!checkID){
                return res.status(403).json({
                    accountID: "none"
                });
            }
            console.log(data.accountID + " login successfully")
            return res.status(200).json({
                accountID: data.accountID
            });
        });
    }catch(error){
        console.log(error);
        return res.status(403).json({
            accountID: "error"
        });
    }
});
module.exports = router;

const isAccountExist = (accountID) => {
    const sql = `SELECT * FROM account_t WHERE account_id = '${accountID}';`;
    
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if(err){
                console.log(err);
                return reject(null);
            }
            else{
                return resolve(result.rows);
            }
        });
    });
};