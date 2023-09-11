import React from "react";
import { useState, useEffect } from "react";

  function DropdownHandler() {
    const[options, setOptions] = useState([]);

    useEffect(() => {
      const dropdown = async () => {
        const tradeSelect = document.getElementById("tradeSelect").value;
        const wallFloorSelect = document.getElementById("wallFloorSelect").value;
        const construction = document.getElementById("construction").value;
        const subcategorySelect =
          document.getElementById("subcategorySelect").value;
        const integrity = document.getElementById("integrity").value;
        const insulation = document.getElementById("insulation").value;
        const thickness = document.getElementById("thickness").value;
        try {
          const res = await fetch(
            `/api/guidedDropdown`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                tradeSelect: tradeSelect,
                wallFloorSelect: wallFloorSelect,
                construction: construction,
                subcategorySelect: subcategorySelect,
                integrity: integrity,
                insulation: insulation,
                thickness: thickness
              }),
            }
          );
          const data = await res.json();
          setOptions(data.message);     //Save the fetched details into the 'options' use state
        } catch (err) {
          console.log(err);
        }
      };
      dropdown();
    }, []);

    const filteredOptions = options.filter((option) => {
      for (const key in option) {
        if (option[key] === "") {
            return false;
        }
    }
    return true;
  });

  const uniqueOptionsServiceType = [
    ...new Set(filteredOptions.map((item) => item.electrical_service_type)),
  ];
  const uniqueOptionsServiceDetail = [
    ...new Set(filteredOptions.map((item) => item.electrical_service_detail)),
  ];
  const uniqueOptionsPipeTypeH = [
    ...new Set(filteredOptions.map((item) => item.hvac_pipe_type)),
  ];
  const uniqueOptionsPipeMaterial = [
    ...new Set(filteredOptions.map((item) => item.hvac_pipe_material)),
  ];
  const uniqueOptionsPipeSize = [
    ...new Set(filteredOptions.map((item) => item.plumbing_pipe_size)),
  ];
  const uniqueOptionsPenSize = [
    ...new Set(filteredOptions.map((item) => item.plumbing_pen_size)),
  ];
  const uniqueOptionsPipeTypeP = [
    ...new Set(filteredOptions.map((item) => item.plumbing_pipe_type)),
  ];

  return {
    uniqueOptionsServiceType,
    uniqueOptionsServiceDetail,
    uniqueOptionsPipeTypeH,
    uniqueOptionsPipeMaterial,
    uniqueOptionsPipeSize,
    uniqueOptionsPenSize,
    uniqueOptionsPipeTypeP
  };
  }

export function Electrical(){
  const [selected, setSelected] = useState();
  const [selectCable, setSelectedCable] = useState();
  const [selectCableDetail, setCableDetail] = useState();
  const [selectConduit, setSelectedConduit] = useState();
  const [values, setValues] = useState({
    diameter: '',
  });

  const dropdownHandlerResult = DropdownHandler();
  const {uniqueOptionsServiceType, uniqueOptionsServiceDetail} = dropdownHandlerResult;

  const handleCableDetailOnChange = (e) => {
    setCableDetail(e.target.value);
  }

  const handleDiameterOnChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      diameter: event.target.value,
    }));
  };

  const handleConduitOnChange = (e) => {
    setSelectedConduit(e.target.value);
  };

  const handleOnChange = (e) =>{
    setSelected(e.target.value);
  };

  const loadCableDetail = () => {
    return(
      <div>
          <select className="form-select" id="cableDetail" name="cableDetail" value={selectCableDetail} onChange={handleCableDetailOnChange}>
            <option selected>Cable Detail</option>
            {uniqueOptionsServiceDetail.map((option, index) => (
              <option key={index}>{option}</option>
            ))}
          </select>
    </div>
    )  
  }

    return(
        <div className="container">
          
        <div className="card" style={{ width: '25rem' }}>
            <div className="card-body">
                <h3>Electrical</h3>
                <fieldset className="form-group">
                <legend class="mt-4">Penetration Type</legend>
                <select className="form-select" id="electrical_service_type" value={selected} onChange={handleOnChange}>
                    <option value="null" selected>Electrical Service Type</option>
                    {uniqueOptionsServiceType.map((option, index) => (
                      <option key={index}>{option}</option>
                    ))}
                  </select>
                </fieldset>
                </div> 
                {
                   selected === "Bundle" ? (
                  <div className="card" style={{ width: '25rem' }}>
                  <div className="card-body">
                  <h3>Services</h3>
                  <div className="input-group mb-3">
                    {loadCableDetail()}
                    </div>
                    <div className="input-group mb-3">
                    <input type="text" className="form-control" id="diameter" placeholder="Bundle Diameter (mm)" name="diameter" value={values.diameter} onChange={handleDiameterOnChange}/>
                  </div>
                  </div>
                  </div>
              ) :
            selected === "Conduit" ?
              (
                <div className="card" style={{ width: '25rem' }}>
                  <div className="card-body">
                  <h3>Services</h3>
                  <div className="input-group mb-3">
                    <select className="form-select" id="conduitType" name="conduitType" value={selectConduit} onChange={handleConduitOnChange}>
                      <option value="null" selected>Conduit</option>
                      {uniqueOptionsServiceDetail.map((option, index) => (
                      <option key={index}>{option}</option>
                      ))}
                    </select>
                    </div>
                  </div>
                  </div>
              ) : selected === "Cable" ? (
                <div className="card" style={{ width: '25rem' }}>
                  <div className="card-body">
                  <h3>Services</h3>
                  <div className="input-group mb-3">
                    {loadCableDetail(selectCable)}
                    </div>
                  </div>
                  </div>
              ) : selected === 'Tray' ? (
                <div className="card" style={{ width: '25rem' }}>
                  <div className="card-body">
                  <h3>Services</h3>
                  <div className="input-group mb-3">
                    {loadCableDetail(selectCable)}
                    </div>
                  </div>
                  </div>
              )
              : selected === 'Bus bar' ?(
                <div></div>
              ) : (<div></div>)}
            </div>
          </div>     
    );
}

export function Plumbing(){
  const [selected, setSelected] = useState();
  const [selectMetal, setSelectMetal] = useState("type");

  const handleMetalOnChange = (e) => {
    setSelectMetal(e.target.value);
  };

  const handleOnChange = (e) =>{
      setSelected(e.target.value);
  };

  const dropdownHandlerResult = DropdownHandler();
  const {uniqueOptionsPipeTypeP, uniqueOptionsPenSize, uniqueOptionsPipeSize} = dropdownHandlerResult;

  return(
    <div className="container">
        <div className="card" style={{ width: '25rem' }}>
            <div className="card-body">
                <h3>Plumbing</h3>
                <fieldset className="form-group">
                <legend class="mt-4">Penetration Type</legend>
                <select className="form-select" id="plumbing_pen_type" value={selected} onChange={handleOnChange}>
                    <option value="null" selected>Plumbing Service Type</option>
                    {uniqueOptionsPenSize.map((option, index) => (
                      <option key={index}>{option}</option>
                    ))}
                  </select>
                </fieldset>
                </div>

                {/* METAL OPTIONS */}
                <div className="card" style={{ width: '25rem' }}>
                  <div className="card-body">
                    <h3>Pipe Type</h3>
                  <div className="input-group mb-3">
                    <select className="form-select" id="plumbing_pipe_type" name="metalType" value={selectMetal} onChange={handleMetalOnChange}>
                      <option value="null" selected>Type</option>
                      {uniqueOptionsPipeTypeP.map((option, index) => (
                      <option key={index}>{option}</option>
                    ))}
                    </select>
                  </div>
                  <div className="input-group mb-3">
                  <select className="form-select" id="plumbing_pipe_type" name="metalType" value={selectMetal} onChange={handleMetalOnChange}>
                    <option value="null" selected>Type</option>
                    {uniqueOptionsPipeSize.map((option, index) => (
                    <option key={index}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export function Hvac(){

  const [selected, setSelected] = useState();
  const [selectNonCombust, setSelectNonCombust] = useState();
  const [selectCombust, setSelectCombust] = useState();

  const handleOnChange = (e) => {
    setSelected(e.target.value);
  };

  const handleNonCombustOnChange = (e) => {
    setSelectNonCombust(e.target.value);
  };

  const handleCombustOnChange = (e) => {
    setSelectCombust(e.target.value);
  };

  const dropdownHandlerResult = DropdownHandler();
  const {uniqueOptionsPipeTypeH, uniqueOptionsPipeMaterial} = dropdownHandlerResult;


  return(
    <div className="container">
        <div className="card" style={{ width: '25rem' }}>
          <div className="card-body">
            <h3>HVAC</h3>  
                <div className="input-group mb-3">
                  <select className="form-select" id="hvac_pipe_type" value={selected} onChange={handleOnChange}>
                    <option value="null" selected>Pipe Type</option>
                    {uniqueOptionsPipeTypeH.map((option, index) => (
                      <option key={index}>{option}</option>
                    ))}
                  </select>
                </div>

                {/* METAL OPTIONS */}
              { selected === 'Non combustible (metal) pipes' ?
              (
                <div className="input-group mb-3">
                  <select className="form-select" id="hvac_pipe_material" name="noncombust" value={selectNonCombust} onChange={handleNonCombustOnChange} >
                    <option value="null" selected>Pipe Material</option>
                    {uniqueOptionsPipeMaterial.map((option, index) => (
                      <option key={index}>{option}</option>
                    ))}
                  </select>
                </div>

                // PLASTIC OPTIONS
              ) : selected === 'Combustible standard (plastic) pipes' ? 
              (
                <div className="input-group mb-3">
                  <select className="form-select" id="hvac_pipe_material" name="combust" value={selectCombust} onChange={handleCombustOnChange}>
                    <option value="null" selected>Pipe Material</option>
                    {uniqueOptionsPipeMaterial.map((option, index) => (
                      <option key={index}>{option}</option>
                    ))}
                  </select>
                </div>
                
              ) : (
                <div></div>
              )}
        </div>
      </div>
    </div>
  )
}
