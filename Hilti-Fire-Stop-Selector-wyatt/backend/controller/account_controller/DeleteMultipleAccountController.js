const express = require ("express");
const router = express.Router();
const connection = require("../../index.js").connection;

router.post("/", async (req, res) => {
    try{
        const {list} = req.body;
        for(let i = 0; i < list.length; i++)
        {
            const accountID = list[i].toLowerCase();
            let account = await getAccountData(accountID);
            console.log("Deleting... " + account[0])
            account = account[0];
            let affectedAccount = await deleteAccount(accountID);
            if(affectedAccount != 1){
                console.log("Error found during account deletion process!");
                return res.status(400).json({
                    status: false,
                    message: "Error found during account deletion process!"
                });
            }
            console.log(`Account ID: ${accountID} was successfully deleted!`);
        }
        return res.status(200).json({
            status: true,
            message: "Account successfully deleted!"
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

const getAccountData = (accountID) => {
    const sql = `SELECT * FROM account_t WHERE account_id = '${accountID}';`;
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if(err){
                console.log(err);
                return reject(null);
            }else{
                // console.log(result.rows);
                return resolve(result.rows);
            }
        });
    });
};

const deleteAccount = (accountID) => {
    const sql = `DELETE FROM account_t WHERE account_id = '${accountID}';`;
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if(err){
                console.log(err);
                return reject(null);
            }else{
                return resolve(result.rowCount);
            }
        });
    });
}
