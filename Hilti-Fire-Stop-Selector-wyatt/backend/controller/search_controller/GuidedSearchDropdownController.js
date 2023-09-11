const express = require("express");
const router = express.Router();
const connection = require("../../index.js").connection;

router.post("/", async (req, res) => {
    try{
        const { tradeSelect, wallFloorSelect, thickness, construction, subcategorySelect, sAdequacy, integrity, insulation, electrical_service_type, cableDetail, 
            hvac_pipe_type , hvac_pipe_material, plumbing_pen_type, plumbing_pipe_type, plumbing_pipe_size} = req.body;
        console.log(tradeSelect, wallFloorSelect, thickness, construction, subcategorySelect, sAdequacy, integrity, insulation, electrical_service_type, cableDetail, 
            hvac_pipe_type, hvac_pipe_material, plumbing_pen_type, plumbing_pipe_type, plumbing_pipe_size);
        var application_type,application_construction_type,application_subcategory  = null;

        const sql = `SELECT application_t.application_type, application_t.application_wallfloor, application_t.application_subcategory, application_t.application_construction_type, 
        application_t.application_integrity, application_t.application_insulation, application_t.application_thickness, 
        electrical_t.electrical_service_type, electrical_t.electrical_service_detail,
        hvac_t.hvac_pipe_type, hvac_t.hvac_pipe_material, 
        plumbing_t.plumbing_pen_type, plumbing_t.plumbing_pipe_type, plumbing_t.plumbing_pipe_size 
        FROM application_t
        FULL JOIN electrical_t ON application_t.application_id = electrical_t.electrical_id
        FULL JOIN hvac_t ON application_t.application_id = hvac_t.hvac_id
        FULL JOIN plumbing_t ON application_t.application_id = plumbing_t.plumbing_id`
        console.log(sql)
        
        connection.query(sql, async (err, result) => {
            if(err){
                console.log(err);
                return res.status(400).json({
                    status: false,
                    message: err
                });
            }
            else{
                // console.log(result.rows)
                const results = [];
                for (let i = 0; i < result.rows.length; i++){
                    results.push(
                        {
                            application_type: result.rows[i].application_type,
                            application_wallfloor: result.rows[i].application_wallfloor,
                            application_construction_type: result.rows[i].application_construction_type,
                            application_subcategory: result.rows[i].application_subcategory,
                            application_integrity: result.rows[i].application_integrity,
                            application_insulation: result.rows[i].application_insulation,
                            application_thickness: result.rows[i].application_thickness,
                            electrical_service_type: result.rows[i].electrical_service_type,
                            electrical_service_detail: result.rows[i].electrical_service_detail,
                            hvac_pipe_type: result.rows[i].hvac_pipe_type,
                            hvac_pipe_material: result.rows[i].hvac_pipe_material,
                            plumbing_pen_type: result.rows[i].plumbing_pen_type,
                            plumbing_pipe_type: result.rows[i].plumbing_pipe_type,
                            plumbing_pipe_size: result.rows[i].plumbing_pipe_size
                        }
                    )  
                }
                // console.log(results)
                return res.status(200).json({
                    status: true,
                    message: results
                })
            }
        })
        
    } catch(error){
        console.log(error);
        return res.status(400).json({
            status:false,
            message:error.message
        });
    }
});

module.exports = router;