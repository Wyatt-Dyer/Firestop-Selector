// const { application } = require("express");
// const express = require("express");
// const router = express.Router();
// const connection = require("../../index.js").connection;

// router.post("/", async (req, res) => {
//     try{
//         console.log("Entering Create Application Controller");
//         const { application_name, tradeSelect, wallFloorSelect, thickness, construction, subcategorySelect, sAdequacy, integrity, insulation, flexCheckChecked, singleType, conduitType, diameter, subcomp } = req.body;
//         console.log(application_name, tradeSelect, wallFloorSelect, thickness, construction, subcategorySelect, sAdequacy, integrity, insulation, flexCheckChecked,singleType, conduitType, diameter, subcomp);
//         var application_type,application_construction_type,application_subcategory,application_id  = null;
//         if(tradeSelect === 'elec'){
//             application_type = 'e'
//         }
//         else if(tradeSelect === 'hvac'){
//             application_type = 'h'
//         }
//         else if(tradeSelect === 'plumb'){
//             application_type ='p'
//         }
//         if(construction === 'rigid'){
//             application_construction_type = 'Rigid'
//         }
//         else if(construction === 'flexible'){
//             application_construction_type = 'Flexible'
//         }
        
//         if(subcategorySelect === 'conc'){
//             application_subcategory = 'Concrete'
//         }
//         else if(subcategorySelect === 'speedpanel'){
//             application_subcategory = 'Speedpanel'
//         }
//         else if(subcategorySelect === 'stud'){
//             application_subcategory = 'Double Stud'
//         }
//         else if(subcategorySelect === 'afs'){
//             application_subcategory = 'AFS Logicwall'
//         }
//         else if(subcategorySelect === 'hebel'){
//             application_subcategory = 'Hebel'
//         }
//         else if(subcategorySelect === 'spanel'){
//             application_subcategory = 'Sandwich Panel'
//         }
//         else if(subcategorySelect === 'dincel'){
//             application_subcategory = 'Dincel'
//         }
//         else if(subcategorySelect === 'slplaster'){
//             application_subcategory = 'Single Layer Plasterboard'
//         }
//         else if(subcategorySelect === 'dlplaster'){
//             application_subcategory = 'Double Layer Plasterboard'
//         }
//         else if(subcategorySelect === 'usg'){
//             application_subcategory = 'USG Plasterboard'
//         }
//             const id = await checkMaxAppID(application_type)
//             application_id = id + 1
//             console.log(application_id)
//             // console.log(application_id)
//         // const sql = 'INSERT INTO application_t VALUES ('${account.account_id}', '${account.first_name}','','${account.password}','${account.account_type}')'
//             console.log(application_id, application_name, integrity,insulation,application_type,wallFloorSelect,application_construction_type, application_subcategory, thickness, subcomp )

//             const sql = `INSERT INTO application_t VALUES ('${application_id}', '${integrity}', '${insulation}', '${application_type}', '${wallFloorSelect}',
//              '${application_construction_type}', '${application_subcategory}', '${thickness}')`
//         // const sql = `SELECT DISTINCT application_name FROM application_t WHERE application_integrity = '${integrity}' AND application_insulation = '${insulation}' AND application_type = '${application_type}' AND 
//         // application_wallfloor = '${wallFloorSelect}' AND application_construction_type = '${application_construction_type}' AND application_subcategory = '${application_subcategory}' AND
//         //  application_thickness = '${thickness}'`;
//         console.log(sql)
//         connection.query(sql, async (err, result) => {
//             if(err){
//                 console.log(err);
//                 return res.status(400).json({
//                     status: false,
//                     message: err
//                 });
//             }
//             else{
//                 console.log(result.rows)
//                 const results = [];
//                 for (let i = 0; i < result.rows.length; i++){
//                     results.push(result.rows[i].application_name)  
//                 }
//                 console.log(results)
//                 return res.status(200).json({
//                     status: true,
//                     message: results
//                 })
//             }
//         })
        


//     } catch(error){
//         console.log(error);
//         return res.status(400).json({
//             status:false,
//             message:error.message
//         });
//     }
// });
// module.exports = router;


const express = require ("express");
const router = express.Router();
const connection = require("../../index.js").connection;

router.post("/", async (req, res) => {
    const {application_id, approval_id, application_name, application_integrity, application_insulation, application_type, application_wallfloor, application_construction_type, application_subcategory, application_thickness,
         application_sub_comp, application_hyper,application_desc,application_max_pipe_size, application_additional_info1, application_additional_info2, approval_number,approval_page, approval_table, approval_figure, approval_hyper, electrical_service_type, electrical_service_detail, 
         hvac_pipe_type, hvac_pipe_material, hvac_pipe_speci, plumbing_pipe_type, plumbing_pipe_size, plumbing_pen_type} =  req.body
         console.log("ID Input:", application_id, approval_id, "\nApplication Input: ", application_name, application_integrity, application_insulation, application_type, application_wallfloor, application_construction_type, application_subcategory, application_thickness,
         application_sub_comp, application_hyper,application_desc,application_max_pipe_size, application_additional_info1, application_additional_info2, "\nApproval Input: ", approval_number,approval_page, approval_table, approval_figure, approval_hyper, "\nEletrical Input: ", electrical_service_type, electrical_service_detail, 
         "\nHvac Input: ", hvac_pipe_type, hvac_pipe_material, hvac_pipe_speci,"\nPlumbing Input: ", plumbing_pipe_type, plumbing_pipe_size, plumbing_pen_type)
    try{
    const appid = await checkMaxAppID(application_type)
    let new_application_id,new_approval_id
    new_application_id = parseInt(appid.slice(1)) + 1 
    if(new_application_id <= 999)
    {
            new_application_id = '00' + String(new_application_id)
    }
    else if(new_application_id <= 9999 && new_application_id >= 1000)
    {
            new_application_id = '0' + String(new_application_id)
    }
    else if(new_application_id <= 99999 && new_application_id >= 10000)
    {
            new_application_id = String(new_application_id)
    }
    if(application_type === 'Electrical')
    {
    new_application_id = 'E' + new_application_id   
    }
    else if(application_type === 'HVAC')
    {
    new_application_id = 'H' + new_application_id   
    }
    else if(application_type === 'Plumbing')
    {
    new_application_id = 'P' + new_application_id   
    }
    console.log(new_application_id)

    const approvalid = await checkMaxApprovalID()
    new_approval_id = parseInt(approvalid.slice(2)) + 1 
    if(new_approval_id <= 999)
    {
        new_approval_id = '00' + String(new_approval_id)
    }
    else if(new_approval_id <= 9999 && new_approval_id >= 1000)
    {
        new_approval_id = '0' + String(new_approval_id)
    }
    else if(new_approval_id <= 99999 && new_approval_id >= 10000)
    {
        new_approval_id = String(new_approval_id)
    }
    new_approval_id = 'AP' + new_approval_id
    console.log(new_approval_id)

    const affectedApplication = await createApplicationData(new_application_id, application_name, application_integrity, application_insulation, application_type, application_wallfloor, 
        application_construction_type, application_subcategory, application_thickness,
        application_sub_comp, application_hyper,application_desc,application_max_pipe_size, application_additional_info1, application_additional_info2);
        const affectedUniqueAppDetail = await createUniqueApplicationDetail(new_application_id,application_type, electrical_service_type, electrical_service_detail, 
            hvac_pipe_type, hvac_pipe_material, hvac_pipe_speci, plumbing_pipe_type, plumbing_pipe_size, plumbing_pen_type)   
        const affectedApproval = await createRIRApproval(new_application_id,new_approval_id,approval_number,approval_page, approval_table, approval_figure, approval_hyper)
    console.log("CREATING STATUS(1 means SUCESS)", affectedApplication, affectedApproval, affectedUniqueAppDetail)
    console.log(`Application data for id: ${new_application_id} successfully created!`);
    return res.status(200).json({
        status: true,
        message: "Application successfully created!",
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


const createApplicationData = (new_application_id, application_name, application_integrity, application_insulation, application_type, application_wallfloor, 
    application_construction_type, application_subcategory, application_thickness,
    application_sub_comp, application_hyper,application_desc,application_max_pipe_size, application_additional_info1, application_additional_info2) => {
    const sql = `INSERT INTO application_t
     VALUES ('${new_application_id}', '${application_name}', '${application_integrity}',  '${application_insulation}', 
    '${application_type}', '${application_wallfloor}', '${application_construction_type}',
    '${application_subcategory}', '${application_thickness}', 
    '${application_sub_comp}', '${application_hyper}','${application_desc}','${application_max_pipe_size}', '${application_additional_info1}', 
    '${application_additional_info2}');`;
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

const createUniqueApplicationDetail = (new_application_id,application_type, electrical_service_type, electrical_service_detail, 
    hvac_pipe_type, hvac_pipe_material, hvac_pipe_speci, plumbing_pipe_type, plumbing_pipe_size, plumbing_pen_type) => {
    let sql = ''
    if((electrical_service_type || electrical_service_detail) && application_type === 'Electrical'){
        sql = `INSERT INTO electrical_t VALUES ('${new_application_id}', '${electrical_service_type}', '${electrical_service_detail}');`;
    }
    else if((hvac_pipe_type || hvac_pipe_material || hvac_pipe_speci) && application_type === 'HVAC'){
        sql = `INSERT INTO hvac_t VALUES ('${new_application_id}', '${hvac_pipe_type}', '${hvac_pipe_material}', '${hvac_pipe_speci}' );`;
    }
    else if((plumbing_pipe_type || plumbing_pipe_size || plumbing_pen_type) && application_type === 'Plumbing'){
        sql = `INSERT INTO plumbing_t VALUES ('${new_application_id}', '${plumbing_pipe_type}', '${plumbing_pipe_size}', '${plumbing_pen_type}');`;
    }
    console.log(sql)
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if(err){
                console.log(err);
                return reject(true);
            }else{
                console.log(result.rows)
                return resolve(result.rowCount);
            }
        });
    });
};

const createRIRApproval= (new_application_id, approval_id, approval_number,approval_page, approval_table, approval_figure, approval_hyper) => {
    const sql = `INSERT INTO approval_t VALUES ('${approval_id}',  '${approval_page}', '${approval_table}', '${approval_number}', 
    '${new_application_id}', '${approval_figure}', '${approval_hyper}')`;
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


const checkMaxAppID = (application_type) => {
    const appType = application_type.toUpperCase().charAt(0);
    console.log(appType)
    const sql =  `SELECT Max(application_id) FROM application_t WHERE application_id LIKE '${appType}%'`
    return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
        if(err){
            console.log(err);
            return reject("err");
        }else{
            const maxID = String(result.rows[0].max);
            console.log(maxID)
            return resolve(maxID);
        }
    })
})
}

const checkMaxApprovalID = () => {
    const sql =  `SELECT Max(approval_id) FROM approval_t`
    return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
        if(err){
            console.log(err);
            return reject("err");
        }else{
            const maxID = String(result.rows[0].max);
            return resolve(maxID);
        }
    })
})
}

const checkMaxElectricalID = () => {
    const appType = application_type.toUpperCase();
    const sql =  `SELECT Max(electrical_id) FROM electrical_t`
    return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
        if(err){
            console.log(err);
            return reject("err");
        }else{
            const maxID = String(result.rows[0].max);
            return resolve(maxID);
        }
    })
})
}

const checkMaxHVACID = () => {
    const appType = application_type.toUpperCase();
    const sql =  `SELECT Max(hvac_id) FROM hvac_t`
    return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
        if(err){
            console.log(err);
            return reject("err");
        }else{
            const maxID = String(result.rows[0].max);
            return resolve(maxID);
        }
    })
})
}

const checkMaxPlumbingID = () => {
    const appType = application_type.toUpperCase();
    const sql =  `SELECT Max(plumbing_id) FROM plumbing_t`
    return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
        if(err){
            console.log(err);
            return reject("err");
        }else{
            const maxID = String(result.rows[0].max);
            return resolve(maxID);
        }
    })
})
}
