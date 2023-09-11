const express = require ("express");
const router = express.Router();
const connection = require("../../index.js").connection;

router.post("/", async (req, res) => {
    const {application_id, approval_id, application_name, application_integrity, application_insulation, application_wallfloor, application_construction_type, application_subcategory, application_thickness,
         application_sub_comp, application_hyper,approval_number,approval_page, approval_table, application_additional_info1, application_additional_info2, approval_figure, approval_hyper, electrical_service_type, electrical_service_detail, 
         hvac_pipe_type, hvac_pipe_material, hvac_pipe_speci, plumbing_pipe_type, plumbing_pipe_size, plumbing_pen_type} =  req.body
         console.log("ID Input:", application_id, approval_id, "\nApplication Input: ", application_name, application_integrity, application_insulation, application_wallfloor, application_construction_type, application_subcategory, application_thickness,
            application_sub_comp, application_hyper, application_additional_info1, application_additional_info2,  "\nApproval Input: ", approval_number,approval_page, approval_table, approval_figure, approval_hyper, "\nEletrical Input: ", electrical_service_type, electrical_service_detail, 
            "\nHvac Input: ", hvac_pipe_type, hvac_pipe_material, hvac_pipe_speci,"\nPlumbing Input: ", plumbing_pipe_type, plumbing_pipe_size, plumbing_pen_type)
    try{  
    const affectedApplication = await updateApplicationData(application_id, application_name, application_integrity, application_insulation, application_wallfloor, 
        application_construction_type, application_subcategory, application_thickness,
        application_sub_comp, application_hyper, application_additional_info1, application_additional_info2);
        const affectedUniqueAppDetail = await updateUniqueApplicationDetail(application_id, electrical_service_type, electrical_service_detail, 
            hvac_pipe_type, hvac_pipe_material, hvac_pipe_speci, plumbing_pipe_type, plumbing_pipe_size, plumbing_pen_type)   
        const affectedApproval = await updateRIRApproval(application_id,approval_id,approval_number,approval_page, approval_table, approval_figure, approval_hyper)
    console.log("UPDATEING STATUS(1 means SUCESS)", affectedApplication, affectedApproval, affectedUniqueAppDetail)
    console.log(`Application data for id: ${application_id} successfully updated!`);
    return res.status(200).json({
        status: true,
        message: "Application successfully updated!",
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


const updateApplicationData = (application_id, application_name, application_integrity, application_insulation, application_wallfloor, 
    application_construction_type, application_subcategory, application_thickness,
    application_sub_comp, application_hyper, application_additional_info1, application_additional_info2) => {
    const sql = `UPDATE application_t set application_name = '${application_name}', application_integrity = '${application_integrity}', application_insulation = '${application_insulation}', 
    application_wallfloor = '${application_wallfloor}', application_construction_type = '${application_construction_type}',
     application_subcategory = '${application_subcategory}', application_thickness = '${application_thickness}', 
     application_sub_comp = '${application_sub_comp}', application_hyper = '${application_hyper}', application_additional_info1 = '${application_additional_info1}',
     application_additional_info2 = '${application_additional_info2}' WHERE application_id = '${application_id}';`;
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if(err){
                console.log(err);
                return reject(true);
            }else{
                return resolve(result.rowCount);
            }
        });
    });
};

const updateUniqueApplicationDetail = (application_id, electrical_service_type, electrical_service_detail, 
    hvac_pipe_type, hvac_pipe_material, hvac_pipe_speci, plumbing_pipe_type, plumbing_pipe_size, plumbing_pen_type) => {
    let sql = ''
    if(electrical_service_type || electrical_service_detail !== undefined){
        sql = `UPDATE electrical_t set electrical_service_type = '${electrical_service_type}', electrical_service_detail = '${electrical_service_detail}' WHERE electrical_id = '${application_id}';`;
    }
    else if(hvac_pipe_type || hvac_pipe_material || hvac_pipe_speci !== undefined){
        sql = `UPDATE hvac_t set hvac_pipe_type = '${hvac_pipe_type}', hvac_pipe_material ='${hvac_pipe_material}', hvac_pipe_speci = '${hvac_pipe_speci}' WHERE hvac_id = '${application_id}';`;
    }
    else if(plumbing_pipe_type || plumbing_pipe_size || plumbing_pen_type !== undefined){
        sql = `UPDATE plumbing_t set plumbing_pipe_type = '${plumbing_pipe_type}', plumbing_pipe_size ='${plumbing_pipe_size}',plumbing_pen_type = '${plumbing_pen_type}' WHERE plumbing_id = '${application_id}';`;
    }
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if(err){
                console.log(err);
                return reject(err.message);
            }else{
                console.log(sql)
                return resolve(result.rowCount);
            }
        });
    });
};

const updateRIRApproval= (application_id, approval_id, approval_number,approval_page, approval_table, approval_figure, approval_hyper) => {
    const sql = `UPDATE approval_t set approval_number = '${approval_number}', approval_page = '${approval_page}', approval_table = '${approval_table}', 
    approval_figure = '${approval_figure}', approval_hyper = '${approval_hyper}' WHERE approval_id = '${approval_id}' AND app_id = '${application_id}';`;
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if(err){
                console.log(err);
                return reject(true);
            }else{
                return resolve(result.rowCount);
            }
        });
    });
};