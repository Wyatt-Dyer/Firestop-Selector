import React from "react";
// import "../../Navigation/custom.css";
import { useState,useEffect } from 'react';
import { Electrical, Hvac, Plumbing } from './SecGuidedSearch';
import { Col, Row, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

export const AdAppSearch = () => {
  const [selected, setSelected] = useState("selectTrade");
  const [selectElement, setSelectElement] = useState("selectedElement");
  const [construction, setConstruction] = useState("selectConst");
  const [subcategorySelect, setSubSelect] = useState ("selectedSubCat");

  document.title = "Create An Application"

  const [values, setValues] = useState({
    sAdequacy: '',
    integrity: '',
    insulation: '',
    thickness: '',
  });

  const navigate = useNavigate();
    const navigateSearch = () => {
    navigate('/results');
    }
  
  const[elecContentVisible, setElecContentVisible] = useState(false);
  const[hvacContentVisible, setHvacContentVisible] = useState(false);
  const[plumbContentVisible, setPlumbContentVisible] = useState(false);

  useEffect(() => {
    selected === "elec"
    ? setElecContentVisible(true)
    :setElecContentVisible(false);
    selected === "hvac"
    ? setHvacContentVisible(true)
    :setHvacContentVisible(false);
    selected === "plumb"
    ? setPlumbContentVisible(true)
    :setPlumbContentVisible(false);
  }, [selected]);

  

  const handleOnChange = (e) => {
    setSelected(e.target.value);
  };

  const handleElementOnChange = (e) => {
    setSelectElement(e.target.value);
  };

  const handleThicknessOnChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      thickness: event.target.value,
    }));
  };

  const handleConstructionOnChange = (e) => {
    setConstruction(e.target.value);
  };

  const handleSubcatOnChange = (e) => {
    setSubSelect(e.target.value);
  };

  const handleSAdequacyOnChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      sAdequacy: event.target.value,
    }));
  };

  const handleIntegrityOnChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      integrity: event.target.value,
    }));
  };

  const handleInsulationOnChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      insulation: event.target.value,
    }));
  };

  const submit = (e) =>{
    const application_name = document.getElementById("Application_name").value
    const tradeSelect = document.getElementById("tradeSelect").value
    const wallFloorSelect = document.getElementById("wallFloorSelect").value
    const thickness = document.getElementById("thickness").value
    const construction = document.getElementById("construction").value
    const subcategorySelect = document.getElementById("subcategorySelect").value
    const sAdequacy = document.getElementById("sAdequacy").value
    const integrity = document.getElementById("integrity").value
    const insulation = document.getElementById("insulation").value
    if(application_name|| tradeSelect || wallFloorSelect || thickness || construction || subcategorySelect || sAdequacy || integrity || insulation === null){
      alert("Please input every required fields!")
    }
    else{
      if(document.getElementById("flexCheckChecked") !== null){
        var flexCheckChecked = document.getElementById("flexCheckChecked").value
      }
      if(document.getElementById("singleType") !== null){
        var singleType = document.getElementById("singleType").value
      }
      if(document.getElementById("conduitType") !== null){
        var conduitType = document.getElementById("conduitType").value 
      }
      if(document.getElementById("diameter") !== null){
        var diameter = document.getElementById("diameter").value
      }
      if(document.getElementById("subcomp" !== null)){
        var subcomp = document.getElementById("subcomp").value
      }
    fetch("/api/createapplication",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          application_name: application_name,
          tradeSelect: tradeSelect,
          wallFloorSelect: wallFloorSelect,
          thickness: thickness,
          construction: construction,
          subcategorySelect: subcategorySelect,
          sAdequacy: sAdequacy,
          integrity: integrity,
          insulation: insulation,
          flexCheckChecked: flexCheckChecked,
          singleType: singleType,
          conduitType: conduitType,
          diameter: diameter,
          subcomp:subcomp 
        })
    })
        .then((res) => { return res.json(); })
        .then((data) => {
            alert(data.message);
            if (data.status) {
                alert("Successfully create the application")
                // closeForm()
            }
            // setSubmitting(false)
        });
  }
  }

    return(
      <div className="container">
        <h1>Create a new application</h1>
          <Row>
            <Col>
              <form onSubmit={submit}>
                <div className="card" style={{ width: '25rem' }}>
                    {/* <h3>Sub Component</h3>
                    <div>
                        <input type="text" className="form-control" id="thickness" placeholder="sub-component" name="sub" value={values.thickness} onChange={handleThicknessOnChange}/>
                    </div> */}
                  <div className="card-body">
                    <h3>Application Name</h3>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" id="Application_name" placeholder="Name of Applicaiton" value={values.application_name} onChange={handleOnChange} required/>
                    </div>
                    <h3>Trade</h3>
                      <div className="input-group mb-3">
                        <select className="form-select" id="tradeSelect" value={selected} onChange={handleOnChange} required>
                          <option value="">Trade</option>
                          <option value="elec">Electrical</option>
                          <option value="hvac">HVAC</option>
                          <option value="plumb">Plumbing</option>
                        </select>
                      </div>

                    <h3>Separating Element</h3>  
                      <div className="input-group mb-3">
                        <select className="form-select" id="wallFloorSelect" value = {selectElement} onChange={handleElementOnChange} required>
                          <option value="">Wall/Floor</option>
                          <option value = "Wall">Wall</option>
                          <option value = "Floor">Floor</option>
                        </select>
                      </div>
                    
                    {/* Thickness*/}
                    <div className="input-group mb-3">
                      <input type="text" className="form-control" id="thickness" placeholder="Thickness (mm)" name="thickness" value={values.thickness} onChange={handleThicknessOnChange} required/>
                    </div> 

                    {/* Construction Type*/} 
                    <div className="input-group mb-3">                
                      <select className= "form-select" id="construction" name="construction" value={construction} onChange={handleConstructionOnChange} required>
                       <option value="">Construction Type</option>
                        <option value="rigid">Rigid</option>
                        <option value="flexible">Flexible</option>
                        {/* <option value="spanel">Sandwich Panel</option> */}
                        <option value="timb">CLT Timber</option>
                      </select>
                      </div>
                    
                    {/* Sub-Category*/}
                    <div className="input-group mb-3">
                      { (selected === 'elec' && selectElement === 'Wall' && construction=== 'rigid') ?
                        (
                          <select className="form-select" id ="subcategorySelect">
                            <option selected value="">Sub-category</option>
                            <option value="conc">Concrete</option>
                            <option value="hebel">Hebel</option>
                            <option value="dincel">Dincel</option>
                            <option value="afs">AFS Logicwall</option>
                            <option value="spanel">Sandwich Panel</option>
                          </select>

                        ) : (selected === 'elec' && selectElement === 'Wall' && construction === 'flexible') ? 
                        (
                          <select className="form-select" id ="subcategorySelect">
                            <option selected value="">Sub-category</option>
                            <option value="slplaster">Single Layer Plasterboard</option>
                            <option value="dlplaster">Double Layer Plasterboard</option>
                            <option value="stud">Double Stud</option>
                            <option value="usg">USG Plasterboard</option>
                          </select>

                        ) : selected === 'elec' && selectElement === 'Floor' && construction=== 'rigid' ?
                        (
                          <select className="form-select" id ="subcategorySelect">
                            <option selected value="">Sub-category</option>
                            <option value="conc">Concrete</option>
                            <option value="hebel">Hebel</option>
                            <option value="dincel">Dincel</option>
                            <option value="afs">AFS Logicwall</option>
                          </select>

                        ) : selected === 'hvac' && (selectElement === 'Wall' || selectElement === 'Floor') && construction === 'rigid' ?
                        (
                          <select className="form-select" id ="subcategorySelect">
                            <option selected value="">Sub-category</option>
                            <option value="conc">Concrete</option>
                            <option value="speedpanel">Speedpanel</option>
                            <option value="hebel">Hebel</option>
                            <option value="walsc">Walsc</option>
                            <option value="afs">AFS Logicwall</option>
                            <option value="dincel">Dincel</option>
                          </select>

                        ) : (selected === 'hvac' && selectElement === 'Wall' && (construction === 'timb' || construction === 'spanel' || construction === 'flexible')) ? 
                        (
                          <select className="form-select" id ="subcategorySelect">
                            <option selected value="">Sub-category</option>
                            <option value="slplaster">Single Layer Plasterboard</option>
                            <option value="dlplaster">Double Layer Plasterboard</option>
                          </select>
      
                        ) : selected === 'plumb' && ((selectElement === 'Wall' || selectElement === 'Floor') && ((construction === 'timb') || (construction === 'spanel') || (construction === 'flexible'))) ?
                        (
                          <select className="form-select" id ="subcategorySelect">
                            <option selected value="">Sub-category</option>
                            <option value="slplaster">Single Layer Plasterboard</option>
                            <option value="dlplaster">Double Layer Plasterboard</option>
                          </select>
                        ) : selected === 'plumb' && (selectElement === 'Wall' || selectElement === "Floor" && (construction === 'rigid')) ? 
                        (
                          <select className="form-select" id ="subcategorySelect">
                            <option selected value="">Sub-category</option>
                            <option value="conc">Concrete</option>
                            <option value="speedpanel">Speedpanel</option>
                            <option value="hebel">Hebel</option>
                            <option value="dincel">Dincel</option>
                          </select>

                        ) : (
                          <select className="form-select" id ="subcategorySelect">
                            <option>Sub-Category</option>
                          </select>
                        )}
                      {/* 
                      <select className="form-select" id="subcategorySelect" name="subcategorySelect" value={subcategorySelect} onChange={handleSubcatOnChange}>
                        <option value="selectedSubCat">Sub-category</option>
                        <option value="conc">Concrete</option>
                        <option value="hebel">Hebel</option>
                        <option value="dincel">Dincel</option>
                        <option value="afs">AFS Logicwall</option>
                        <option value="slplaster">Single Layer Plasterboard</option>
                        <option value="dlplaster">Double Layer Plasterboard</option>
                        <option value="stud">Double Stud</option>
                        <option value="usg">USG Plasterboard</option>
                        <option value="speedpanel">Speedpanel</option>
                        <option value="walsc">Walsc</option>
                      </select>*/}
                    </div>
                    
                  <h3>Fire Resistance Level</h3>
                    <div className="input-group mb-3">
                      <input type="text"  className="form-control" id="sAdequacy" placeholder="Structural Adequacy" name="sAdequacy" value={values.sAdequacy} onChange={handleSAdequacyOnChange}/>
                    </div>
                    <div className="input-group mb-3">
                      <input type="text"  className="form-control" id="integrity" placeholder="Integrity" name="integrity" value={values.integrity} onChange={handleIntegrityOnChange} required/>
                    </div>
                    <div className="input-group mb-3">
                      <input type="text"  className="form-control" id="insulation" placeholder="Insulation" name="insulation" value={values.insulation} onChange={handleInsulationOnChange} required/>
                    </div>
                    <h3>RIR Approval</h3>
                    <div>
                        <input type="text" className="form-control" id="approval_number" placeholder="approval_name" name="approval_number" value={values.subcomp} onChange={handleOnChange}/>
                    </div>
                    <div>
                        <input type="text" className="form-control" id="subcomp" placeholder="sub component" name="subcomp" value={values.subcomp} onChange={handleOnChange}/>
                    </div>
                    <div>
                        <input type="text" className="form-control" id="subcomp" placeholder="sub component" name="subcomp" value={values.subcomp} onChange={handleOnChange}/>
                    </div>
                    <h3>Sub Component</h3>
                    <div>
                        <input type="text" className="form-control" id="subcomp" placeholder="sub component" name="subcomp" value={values.subcomp} onChange={handleOnChange}/>
                    </div>
                  </div>
                </div>
              </form>
            </Col>
            <Col>
              <div>
                {elecContentVisible && <Electrical />}
                {hvacContentVisible && <Hvac />}
                {plumbContentVisible && <Plumbing />}
              </div>
            </Col>
          </Row>
            {/* <Button style={{float: "right"}} onClick={() => {submit(); navigateSearch();} }>Search</Button> */}
            <Button style={{float: "right"}} onClick={() => {submit();} }>Create</Button>
        </div> 
    );
}

//   const closeForm = () => {
//     navigate("/")
// }