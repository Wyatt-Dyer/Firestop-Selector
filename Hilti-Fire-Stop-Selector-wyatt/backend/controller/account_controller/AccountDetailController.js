const express = require("express");
// const { addErrorLog } = require("../../index.js");
const router = express.Router();
const connection = require("../../index.js").connection;

router.post("/", async (req, res) => {
    console.log("Entering the account detail controller")
    const { id } = req.body
    console.log(id)
    try {
        const sql = `SELECT * FROM account_t where account_id = '${id}'`;
        connection.query(sql, async (err, result) => {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    status: false,
                    message: err.message
                });
            } else {
                if (result.rowCount > 0) {
                    // console.log(result.rows)
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