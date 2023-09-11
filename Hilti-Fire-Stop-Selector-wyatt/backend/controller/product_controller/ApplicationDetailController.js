const express = require("express");
// const { addErrorLog } = require("../../index.js");
const router = express.Router();
const connection = require("../../index.js").connection;

router.post("/", async (req, res) => {
    console.log("Entering the application detail controller")
    const { id } = req.body
    console.log(id)
    let sql = ''
    try {
        if(id.indexOf('E') === 0)
        {
            sql = `select * from application_t inner join electrical_t on application_t.application_id = electrical_t.electrical_id inner join approval_t on application_t.application_id = approval_t.app_id where application_t.application_id = '${id}'`;
        }
        else if(id.indexOf('H') === 0)
        {
            sql = `select * from application_t inner join hvac_t on application_t.application_id = hvac_t.hvac_id inner join approval_t on application_t.application_id = approval_t.app_id where application_t.application_id = '${id}'`;
        }
        else if(id.indexOf('P') === 0){
            sql = `select * from application_t inner join plumbing_t on application_t.application_id = plumbing_t.plumbing_id inner join approval_t on application_t.application_id = approval_t.app_id where application_t.application_id = '${id}'`;
        }
        console.log(sql)
        connection.query(sql, async (err, result) => {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    status: false,
                    message: err.message
                });
            } else {
                if (result.rowCount > 0) {
                    console.log(result.rows)
                    return res.status(200).json({
                        status: true,
                        data: result.rows[0]
                    });
                } else {
                    return res.status(400).json({
                        status: false,
                        message: 'No data found!'
                    });
                }

            }
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: false,
            message: error.message
        });
    }
});
module.exports = router;