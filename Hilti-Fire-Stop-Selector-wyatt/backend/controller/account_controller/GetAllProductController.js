const express = require ("express");
const router = express.Router();
const connection = require("../../index.js").connection;

router.post("/", async (req, res) => {
    try{
        console.log("Entering GetAllProduct Controller");
        const {accountID} = req.body;
        const sql = `SELECT * FROM application_t;`;
        connection.query(sql, async (err, result) => {
            if(err){
                console.log(err);
                return res.status(400).json({
                    status: false,
                    message: err
                });
            }else{
                const applications = [];
                const readData = async (applications) => {
                    for(let i = 0; i < result.rows.length; ++i){
                        const data = result.rows[i];
                        const applicationID = String(data.application_id).toUpperCase();
                        const application = {
                            application_id: applicationID,
                            application_name: data.application_name,
                            application_integrity: data.application_integrity,
                            application_insulation: data.application_insulation,
                            // application_type: (String(data.application_type).toLowerCase() === 'Electrical') ? "Electrical" : (String(data.application_type).toLowerCase() === 'HVAC' ? "HVAC" : "Plumbing"),
                            application_type: data.application_type,
                            application_wallfloor: data.application_wallfloor,
                            application_construction_type: data.application_construction_type,
                            application_subcategory: data.application_subcategory,
                            application_thickness: data.application_thickness
                        };
                        applications.push(application);
                    }
                };
                await readData(applications);
                return res.status(200).json({
                    status: true,
                    applications: applications
                });
            }
        }
        );
        console.log(`Successfully get all applications data`)
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