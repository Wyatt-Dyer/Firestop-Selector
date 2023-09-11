const express = require ("express");
const router = express.Router();
const connection = require("../../index.js").connection;

router.post("/", async (req, res) => {
    try{
        const {accountID} = req.body;
        console.log(accountID + " has entered GetAllAccount Controller");
        const sql = `SELECT * FROM account_t WHERE account_id != '${accountID}';`;
        connection.query(sql, async (err, result) => {
            if(err){
                console.log(err);
                return res.status(400).json({
                    status: false,
                    message: err
                });
            }else{
                const accounts = [];
                const readData = async (accounts) => {
                    for(let i = 0; i < result.rows.length; ++i){
                        const data = result.rows[i];
                        const accountID = String(data.account_id).toUpperCase();
                        const account = {
                            account_id: accountID,
                            password: data.password,
                            first_name: data.first_name,
                            last_name: data.last_name,
                            account_type: (String(data.account_type).toLowerCase() === 'e') ? "Hilti Engineer" : (String(data.account_type).toLowerCase() === 'a' ? "Admin" : "None"),
                        };
                        accounts.push(account);
                    }
                };
                await readData(accounts);
                return res.status(200).json({
                    status: true,
                    accounts: accounts
                });
            }
        }
        );
        console.log(`Successfully get all accounts data`)
    }catch(error){
        console.log(error);
        return res.status(400).json({
            status: false,
            message: error
        });
    }
});
module.exports = router;

// const getAdminData = (userID) => {
//     const sql = `SELECT * FROM system_admin WHERE admin_id = '${userID}';`;
//     return new Promise((resolve, reject) => {
//         connection.query(sql, (err, result) => {
//             if(err){
//                 console.log(err);
//                 return reject(true);
//             }else{
//                 return resolve(result.rows[0]);
//             }
//         });
//     });
// };

// const getStaffData = (userID) => {
//     const sql = `SELECT * FROM staff WHERE staff_id = '${userID}';`;
//     return new Promise((resolve, reject) => {
//         connection.query(sql, (err, result) => {
//             if(err){
//                 console.log(err);
//                 return reject(true);
//             }else{
//                 return resolve(result.rows[0]);
//             }
//         });
//     });
// };

// const getStudentData = (userID) => {
//     const sql = `SELECT * FROM student WHERE student_id = '${userID}';`;
//     return new Promise((resolve, reject) => {
//         connection.query(sql, (err, result) => {
//             if(err){
//                 console.log(err);
//                 return reject(true);
//             }else{
//                 return resolve(result.rows[0]);
//             }
//         });
//     });
// };