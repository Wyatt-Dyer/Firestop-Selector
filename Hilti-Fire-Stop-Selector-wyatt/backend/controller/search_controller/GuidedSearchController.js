const express = require("express");
const router = express.Router();
const connection = require("../../index.js").connection;

router.post("/", async (req, res) => {
    try{
        let sql = ''
        console.log("Entering Guided Search Controller");
        const { tradeSelect, wallFloorSelect, thickness, construction, subcategorySelect, sAdequacy, integrity, insulation, electrical_service_type, cableDetail, 
            hvac_pipe_type , hvac_pipe_material, plumbing_pen_type, plumbing_pipe_type, plumbing_pipe_size} = req.body;
        console.log(tradeSelect, wallFloorSelect, thickness, construction, subcategorySelect, sAdequacy, integrity, insulation, electrical_service_type, cableDetail, 
            hvac_pipe_type, hvac_pipe_material, plumbing_pen_type, plumbing_pipe_type, plumbing_pipe_size);
        var application_type,application_construction_type,application_subcategory  = null;
        // if(subcategorySelect === undefined){
        //     subcategorySelect = null
        // }
        // if(tradeSelect === 'elec'){
        //     application_type = 'e'
        // }
        // else if(tradeSelect === 'hvac'){
        //     application_type = 'h'
        // }
        // else if(tradeSelect === 'plumb'){
        //     application_type ='p'
        // }
        // if(construction === 'rigid'){
        //     application_construction_type = 'Rigid'
        // }
        // else if(construction === 'flexible'){
        //     application_construction_type = 'Flexible'
        // }
        
        // if(subcategorySelect === 'conc'){
        //     application_subcategory = 'Concrete'
        // }
        // else if(subcategorySelect === 'speedpanel'){
        //     application_subcategory = 'Speedpanel'
        // }
        // else if(subcategorySelect === 'stud'){
        //     application_subcategory = 'Double Stud'
        // }
        // else if(subcategorySelect === 'afs'){
        //     application_subcategory = 'AFS Logicwall'
        // }
        // else if(subcategorySelect === 'hebel'){
        //     application_subcategory = 'Hebel'
        // }
        // else if(subcategorySelect === 'spanel'){
        //     application_subcategory = 'Sandwich Panel'
        // }
        // else if(subcategorySelect === 'dincel'){
        //     application_subcategory = 'Dincel'
        // }
        // else if(subcategorySelect === 'slplaster'){
        //     application_subcategory = 'Single Layer Plasterboard'
        // }
        // else if(subcategorySelect === 'dlplaster'){
        //     application_subcategory = 'Double Layer Plasterboard'
        // }
        // else if(subcategorySelect === 'usg'){
        //     application_subcategory = 'USG Plasterboard'
        // }
        // if(flexCheckChecked && singleType && conduitType && diameter !== null){
        // sql = `SELECT application_name, application_hyper, approval_number, approval_table, approval_page, approval_hyper, approval_figure, application_hyper, application_sub_comp FROM application_t 
        // inner join approval_t on application_t.application_id = approval_t.app_id WHERE application_integrity = '${integrity}' 
        // AND application_insulation = '${insulation}' 
        // application_wallfloor = '${wallFloorSelect}' AND application_construction_type = '${construction}' AND application_subcategory = '${subcategorySelect}' AND
        // application_thickness = '${thickness}'`;
        // }
        // else if(hvac_pipe_type && hvac_pipe_material !== null){
        //     sql = `SELECT * FROM application_t 
        //     INNER JOIN approval_t ON application_t.application_id = approval_t.app_id INNER JOIN hvac_t ON application_t.application_id = hvac_t.hvac_id WHERE application_integrity = '${integrity}' 
        //     AND application_insulation = '${insulation}' AND 
        //     application_wallfloor = '${wallFloorSelect}' AND application_construction_type = '${construction}' AND application_subcategory = '${subcategorySelect}' AND
        //     application_thickness = '${thickness}' AND  hvac_pipe_type = '${hvac_pipe_type}' AND hvac_pipe_material = '${hvac_pipe_material}'`;
        // }
        // else if(plumbing_pen_type && plumbing_pipe_type && plumbing_pipe_size !== null){
        //     sql = `SELECT * FROM application_t 
        //     INNER JOIN approval_t ON application_t.application_id = approval_t.app_id INNER JOIN hvac_t ON application_t.application_id = hvac_t.hvac_id WHERE application_integrity = '${integrity}' 
        //     AND application_insulation = '${insulation}' AND 
        //     application_wallfloor = '${wallFloorSelect}' AND application_construction_type = '${construction}' AND application_subcategory = '${subcategorySelect}' AND
        //     application_thickness = '${thickness}' AND  plumbing_pen_type = '${plumbing_pen_type}' AND plumbing_pipe_type = '${plumbing_pipe_typel}' AND plumbing_pipe_size = '${plumbing_pipe_size}'`;
        // }

        connection.query(uniqueFieldsGuidedSearch(tradeSelect, wallFloorSelect, thickness, construction, subcategorySelect, integrity, insulation, electrical_service_type, cableDetail, 
            hvac_pipe_type , hvac_pipe_material, plumbing_pen_type, plumbing_pipe_type, plumbing_pipe_size), async (err, result) => {
            console.log(sql)
            if(err){
                console.log(err);
                return res.status(400).json({
                    status: false,
                    message: err
                });
            }
            else{
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
                            application_desc: result.rows[i].application_desc,
                            application_max_pipe_size: result.rows[i].application_max_pipe_size,
                            application_additional_info1: result.rows[i].application_additional_info1,
                            application_additional_info2: result.rows[i].application_additional_info2,
                            application_type: result.rows[i].application_type,
                            application_integrity: result.rows[i].application_integrity,
                            application_insulation: result.rows[i].application_insulation,
                            application_wallfloor: result.rows[i].application_wallfloor,
                            application_construction_type: result.rows[i].application_construction_type,
                            application_thickness: result.rows[i].application_thickness,
                            application_subcategory: result.rows[i].application_subcategory,
                            application_additional_info1: result.rows[i].application_additional_info1,
                            application_additional_info2: result.rows[i].application_additional_info2,
                            application_id: result.rows[i].application_id,
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


const baseGuidedSearch = (tradeSelect) => {
    let baseSqlCommand = ''
    if(tradeSelect === 'Electrical'){
        baseSqlCommand = `SELECT * FROM application_t 
        INNER JOIN approval_t ON application_t.application_id = approval_t.app_id 
        INNER JOIN electrical_t ON application_t.application_id = electrical_t.electrical_id`
    }
    else if(tradeSelect === 'HVAC'){
        baseSqlCommand = `SELECT * FROM application_t 
        INNER JOIN approval_t ON application_t.application_id = approval_t.app_id 
        INNER JOIN hvac_t ON application_t.application_id = hvac_t.hvac_id`
    }
    else if(tradeSelect === 'Plumbing'){
        baseSqlCommand = `SELECT * FROM application_t 
        INNER JOIN approval_t ON application_t.application_id = approval_t.app_id 
        INNER JOIN plumbing_t ON application_t.application_id = plumbing_t.plumbing_id`
    }

    return baseSqlCommand;
}

const commonFieldsGuidedSearch = (tradeSelect, wallFloorSelect, thickness, construction, subcategorySelect, integrity, insulation) => {
    let base = baseGuidedSearch(tradeSelect)
    let commonFields = []
    let count = 0
    commonFields.push(wallFloorSelect)
    commonFields.push(thickness)
    commonFields.push(construction)
    commonFields.push(subcategorySelect)
    commonFields.push(integrity)
    commonFields.push(insulation)
    for (let i = 0; i < commonFields.length; i++){
        if(commonFields[i] && commonFields[i] !== 'null'){
            count++;
        }
    }
    if(count === 0){
        // console.log(base)
        return base
    }
    else{
        // console.log(count)
        commonFields.forEach(e => {
            console.log(e)
        });
        base += ' WHERE '
        if(wallFloorSelect && wallFloorSelect != 'null'){
            base += `application_wallfloor = '${wallFloorSelect}' AND `
        }
        if(thickness && thickness != 'null'){
            base += `application_thickness = '${thickness}' AND `
         }
         if(construction && construction != 'null'){
            base += `application_construction_type = '${construction}' AND `
         }
         if(subcategorySelect && subcategorySelect != 'null'){
            base += `application_subcategory = '${subcategorySelect}' AND `
         }
         if(integrity && integrity != 'null'){
            base += `application_integrity = '${integrity}' AND `
         }
         if(insulation && insulation != 'null'){
            base += `application_insulation = '${insulation}' AND `
         }
         base.trim()
        //  console.log(base.lastIndexOf(" AND"))
         base = base.slice(0, base.lastIndexOf(" AND"))
        //  console.log(base)
         return base
    }
}


const uniqueFieldsGuidedSearch = (tradeSelect, wallFloorSelect, thickness, construction, subcategorySelect, integrity, insulation, electrical_service_type, cableDetail, 
    hvac_pipe_type , hvac_pipe_material, plumbing_pen_type, plumbing_pipe_type, plumbing_pipe_size) => {
    let base = commonFieldsGuidedSearch(tradeSelect, wallFloorSelect, thickness, construction, subcategorySelect, integrity, insulation)
    let uniqueFields = []
    let count = 0
    uniqueFields.push(electrical_service_type)
    uniqueFields.push(cableDetail)
    uniqueFields.push(hvac_pipe_type)
    uniqueFields.push(hvac_pipe_material)
    uniqueFields.push(plumbing_pen_type)
    uniqueFields.push(plumbing_pipe_type)
    uniqueFields.push(plumbing_pipe_size)
    for (let i = 0; i < uniqueFields.length; i++){
        if(uniqueFields[i] && uniqueFields[i] !== 'null'){
            count++;
        }
    }
    if(count === 0){
        console.log(base)
        return base
    }
    else{
        console.log(count)
        uniqueFields.forEach(e => {
            console.log(e)
        });
        base += ' AND '
        if(electrical_service_type != 'null' && electrical_service_type){
            base += `electrical_service_type = '${electrical_service_type}' AND `
        }
        if(cableDetail != 'null' && cableDetail){
            base += `electrical_service_detail = '${cableDetail}' AND `
        }
        if(hvac_pipe_type != 'null' && hvac_pipe_type){
            base += `hvac_pipe_type = '${hvac_pipe_type}' AND `
        }
        if(hvac_pipe_material != 'null' && hvac_pipe_material){
            base += `hvac_pipe_material = '${hvac_pipe_material}' AND `
         }
         if(plumbing_pen_type != 'null' && plumbing_pen_type){
            base += `plumbing_pen_type = '${plumbing_pen_type}' AND `
         }
         if(plumbing_pipe_type != 'null' && plumbing_pipe_type){
            base += `plumbing_pipe_type = '${plumbing_pipe_type}' AND `
         }
         if(plumbing_pipe_size != 'null' && plumbing_pipe_size){
            base += `plumbing_pipe_size = '${plumbing_pipe_size}' AND `
         }
         base.trim()
        //  console.log(base.lastIndexOf(" AND"))
         base = base.slice(0, base.lastIndexOf(" AND"))
         console.log(base)
         return base
    }
}
// hvac_pipe_type = '${hvac_pipe_type}' AND hvac_pipe_material = '${hvac_pipe_material}'`;
// plumbing_pen_type = '${plumbing_pen_type}' AND plumbing_pipe_type = '${plumbing_pipe_type}' AND plumbing_pipe_size = '${plumbing_pipe_size}'`;