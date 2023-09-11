const { application } = require("express");
const express = require ("express");
const router = express.Router();
const connection = require("../../index.js").connection;

router.post("/", async (req, res) => {
    try{
        const {list} = req.body;
        console.log(list)
        for(let i = 0; i < list.length; i++)
        {
            const applicationID = list[i];
            console.log(applicationID)
            let application = await getApplicationData(applicationID);
            console.log(application)
            application = application[0];
            console.log(application)
            console.log("The application that waits to be deleted is " + application.application_id)
            let affectedApplication = await deleteApplication(applicationID);
            if(affectedApplication != 1){
                console.log("Error found during application deletion process!");
                return res.status(400).json({
                    status: false,
                    message: "Error found during application deletion process!"
                });
            }
            console.log(`Application id: ${applicationID} successfully deleted!`);
        }
        return res.status(200).json({
            status: true,
            message: "Application successfully deleted!"
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

const getApplicationData = (applicationID) => {
    const sql = `SELECT * FROM application_t WHERE application_id = '${applicationID}';`;
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

const deleteApplication = (applicationID) => {
    const sql = `DELETE FROM application_t WHERE application_id = '${applicationID}';`;
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