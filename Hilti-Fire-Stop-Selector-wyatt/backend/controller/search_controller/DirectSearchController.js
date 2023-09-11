const express = require("express");
const router = express.Router();
const connection = require("../../index.js").connection;

router.post("/", async (req, res) => {
    try{
        const {searchInput} = req.body;
        console.log(searchInput)
        sql = `SELECT DISTINCT application_name, application_hyper, approval_number, approval_table, approval_page, approval_hyper, approval_figure, application_hyper, 
        application_sub_comp, application_type, application_subcategory, application_construction_type, application_wallfloor, application_max_pipe_size,
        application_desc, application_integrity, application_insulation, application_thickness 
        FROM application_t inner join approval_t on application_t.application_id = approval_t.app_id where application_name ILIKE '%${searchInput}%'`
        connection.query(sql, async (err, result) => {
            if(err){
                console.log(err);
                return res.status(400).json({
                    status: false,
                    message: err
                });
            }
            else{
                console.log(result.rows)
                const results = [];
                for (let i = 0; i < result.rows.length; i++){
                    results.push(
                        {
                            application_name: result.rows[i].application_name,
                            application_hyper: result.rows[i].application_hyper,
                            approval_number: result.rows[i].approval_number,
                            approval_table: result.rows[i].approval_table,
                            approval_page: result.rows[i].approval_page,
                            approval_hyper: result.rows[i].approval_hyper,
                            approval_figure: result.rows[i].approval_figure,
                            application_hyper: result.rows[i].application_hyper,
                            application_sub_comp: result.rows[i].application_sub_comp,
                            application_type: result.rows[i].application_type,
                            application_wallfloor: result.rows[i].application_wallfloor,
                            application_construction_type: result.rows[i].application_construction_type,
                            application_subcategory: result.rows[i].application_subcategory,
                            application_max_pipe_size: result.rows[i].application_max_pipe_size,
                            application_desc: result.rows[i].application_desc,
                            application_integrity: result.rows[i].application_integrity,
                            application_insulation: result.rows[i].application_insulation,
                            application_thickness: result.rows[i].application_thickness
                        }
                    )  
                }
                console.log(results)
                return res.status(200).json({
                    status: true,
                    message: results
                })
            }
        })
    }catch(error){
        console.log(error);
        return res.status(400).json({
            status:false,
            message:error.message
        });
    }
});
module.exports = router;