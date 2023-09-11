import React from "react";
import "./style/custom.css";
import { useState, useEffect } from "react";
import { Electrical, Hvac, Plumbing } from "./SecGuidedSearch";
import { Col, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const GuidedSearch = (props) => {
  const [selected, setSelected] = useState("selectTrade");
  const [selectElement, setSelectElement] = useState("selectedElement");
  const [construction, setConstruction] = useState("selectConst");
  const [subcategorySelect, setSubSelect] = useState("selectedSubCat");
  const [integrity, setIntegrity] = useState("integrity");
  const [insulation, setInsulation] = useState("insulation");
  const [thickness, setThickness] = useState("thickness");
  const [options, setOptions] = useState([]);

  const [values, setValues] = useState({
    thickness: "",
  });

  const navigate = useNavigate();

  //useStates for conditional rendering of the additional option boxes based off the selected trade
  const [elecContentVisible, setElecContentVisible] = useState(false);
  const [hvacContentVisible, setHvacContentVisible] = useState(false);
  const [plumbContentVisible, setPlumbContentVisible] = useState(false);

  //Conditions required for aditional option boxes
  useEffect(() => {
    selected === "Electrical"
      ? setElecContentVisible(true)
      : setElecContentVisible(false);
    selected === "HVAC"
      ? setHvacContentVisible(true)
      : setHvacContentVisible(false);
    selected === "Plumbing"
      ? setPlumbContentVisible(true)
      : setPlumbContentVisible(false);
  }, [selected]);

  const handleOnChange = (e) => {
    setSelected(e.target.value);
  };

  const handleElementOnChange = (e) => {
    setSelectElement(e.target.value);
  };

  const handleThicknessOnChange = (e) => {
    setThickness(e.target.value)
  };

  const handleConstructionOnChange = (e) => {
    setConstruction(e.target.value);
  };

  const handleSubcatOnChange = (e) => {
    setSubSelect(e.target.value);
  };

  const handleSAdequacyOnChange = (event) => {
    
  };

  const handleIntegrityOnChange = (e) => {
    setIntegrity(e.target.value);
  };

  const handleInsulationOnChange = (e) => {
    setInsulation(e.target.value);
  };

  //Fetch the data from the backend based on user input on the Guided Search page
  const submit = () => {
    const tradeSelect = document.getElementById("tradeSelect").value;
    const wallFloorSelect = document.getElementById("wallFloorSelect").value;
    const thickness = document.getElementById("thickness").value;
    const construction = document.getElementById("construction").value;
    const subcategorySelect =
      document.getElementById("subcategorySelect").value;
    const sAdequacy = document.getElementById("sAdequacy").value;
    const integrity = document.getElementById("integrity").value;
    const insulation = document.getElementById("insulation").value;
    if (document.getElementById("electrical_service_type") !== null) {
      var electrical_service_type = document.getElementById("electrical_service_type").value;
    }
    if (document.getElementById("cableDetail") !== null) {
      var cableDetail = document.getElementById("cableDetail").value;
    }
    // if (document.getElementById("singleType") !== null) {
    //   var singleType = document.getElementById("singleType").value;
    // }
    // if (document.getElementById("conduitType") !== null) {
    //   var conduitType = document.getElementById("conduitType").value;
    // }
    // if (document.getElementById("diameter") !== null) {
    //   var diameter = document.getElementById("diameter").value;
    // }
    if(document.getElementById("hvac_pipe_type") !== null){
      var hvac_pipe_type = document.getElementById("hvac_pipe_type").value
    }
    if(document.getElementById("hvac_pipe_material") !== null){
      var hvac_pipe_material = document.getElementById("hvac_pipe_material").value
    }

    if(document.getElementById("plumbing_pen_type") !== null){
      var plumbing_pen_type = document.getElementById("plumbing_pen_type").value
    }
    if(document.getElementById("plumbing_pipe_type") !== null){
      var plumbing_pipe_type = document.getElementById("plumbing_pipe_type").value
    }
    if(document.getElementById("plumbing_pipe_size") !== null){
      var plumbing_pipe_size = document.getElementById("plumbing_pipe_size").value
    }
    if((tradeSelect || wallFloorSelect || thickness || construction || subcategorySelect ||
      sAdequacy || integrity || insulation) === null){
        alert("Please enter all the required fields!");
    }
    
    else{
    fetch("/api/guidedSearch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tradeSelect: tradeSelect,
        wallFloorSelect: wallFloorSelect,
        thickness: thickness,
        construction: construction,
        subcategorySelect: subcategorySelect,
        sAdequacy: sAdequacy,
        integrity: integrity,
        insulation: insulation,
        electrical_service_type: electrical_service_type,
        cableDetail: cableDetail,
        // singleType: singleType,
        // conduitType: conduitType,
        // diameter: diameter,
        hvac_pipe_type: hvac_pipe_type,
        hvac_pipe_material: hvac_pipe_material,
        plumbing_pipe_type: plumbing_pipe_type,
        plumbing_pipe_size: plumbing_pipe_size,
        plumbing_pen_type: plumbing_pen_type
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        navigate("/results", { state: data.message }); //Navigate to the results page after saving the data returned from the backend and passing it to that page, where it will be rendered
        if (data.status) {
          // closeForm()
        }
        // setSubmitting(false)
      });
    }
  };

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

  //Filter out any null values present in the database to prevent clogging of the dropdown menus and use the trim() method to remove white space
  const filteredOptions = options.filter((option) => {
    for (const key in option) {
        if (option[key] === "") {
            return false;
        }
    }
    return true;
});

  //Using a Set on the filtered values to prevent the dropdowns from displaying more than one of the same value
  const uniqueOptionsTrade = [
    ...new Set(filteredOptions.map((item) => item.application_type)),
  ];
  const uniqueOptionsWallFloor = [
    ...new Set(filteredOptions.map((item) => item.application_wallfloor)),
  ];
  const uniqueOptionsConstruction = [
    ...new Set(filteredOptions.map((item) => item.application_construction_type)),
  ];
  const uniqueOptionsSubcat = [
    ...new Set(filteredOptions.map((item) => item.application_subcategory)),
  ];
  const uniqueOptionsIntegrity = [
    ...new Set(filteredOptions.map((item) => item.application_integrity)),
  ];
  const uniqueOptionsInsulation = [
    ...new Set(filteredOptions.map((item) => item.application_insulation)),
  ];
  const uniqueOptionsThickness = [
    ...new Set(filteredOptions.map((item) => item.application_thickness)),
  ];

  let value = values.sAdequacy ? values.sAdequacy : "-";
  value += integrity ? `/${integrity}` : "";
  value += insulation ? `/${insulation}` : "";

  return (
    <div className="container">
      <h1>Guided Search</h1>
      <Row>
        <Col>
          <form onSubmit={submit}>
            <div className="card" style={{ width: "25rem" }}>
              <div className="card-body">
                <h3>Trade</h3>
                <div className="input-group mb-3">
                  <select
                    className="form-select"
                    id="tradeSelect"
                    value={selected}
                    onChange={handleOnChange}
                  >
                    <option value="null">
                      Trade
                    </option>
                    {uniqueOptionsTrade.map((option, index) => (
                      <option key={index}>{option}</option>
                    ))}
                  </select>
                </div>

                <h3>Separating Element</h3>
                <div className="input-group mb-3">
                  <select
                    className="form-select"
                    id="wallFloorSelect"
                    value={selectElement}
                    onChange={handleElementOnChange}
                  >
                    <option value="null">
                      Wall/Floor
                    </option>
                    {uniqueOptionsWallFloor.map((option, index) => (
                      <option key={index}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Thickness*/}
                <div className="input-group mb-3">
                  <select
                    className="form-select"
                    id="thickness"
                    value={thickness}
                    onChange={handleThicknessOnChange}
                  >
                    <option value="null">
                      Thickness (mm)
                    </option>
                    {uniqueOptionsThickness.map((option, index) => (
                      <option key={index}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                {/* <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="thickness"
                    placeholder="Thickness (mm)"
                    name="thickness"
                    value={values.thickness}
                    onChange={handleThicknessOnChange}
                  /> 
                  
                </div> */}

                {/* Construction Type*/}
                <div className="input-group mb-3">
                  <select
                    className="form-select"
                    id="construction"
                    name="construction"
                    value={construction}
                    onChange={handleConstructionOnChange}
                  >
                    <option value="null">Construction Type</option>
                    {uniqueOptionsConstruction.map((option, index) => (
                      <option key={index}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sub-Category*/}
                <div className="input-group mb-3">
                  <select
                    className="form-select"
                    id="subcategorySelect"
                    value={subcategorySelect}
                    onChange={handleSubcatOnChange}
                  >
                    <option value="null">Sub-Category</option>
                    {uniqueOptionsSubcat.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <h3>Fire Resistance Level</h3>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="sAdequacy"
                    placeholder="Structural Adequacy"
                    name="sAdequacy"
                    value={values.sAdequacy}
                    onChange={handleSAdequacyOnChange}
                    disabled
                  />
                </div>
                <div className="input-group mb-3">
                  <select
                    className="form-select"
                    id="integrity"
                    value={integrity}
                    onChange={handleIntegrityOnChange}>
                      <option value="null">Integrity</option>
                    {uniqueOptionsIntegrity.map((option, index) => (
                      
                      <option key={index}>
                        {option}
                        
                      </option>
                    ))}
                    </select> 
                </div>
                <div className="input-group mb-3">
                  {/* <input
                    type="text"
                    className="form-control"
                    id="insulation"
                    placeholder="Insulation"
                    name="insulation"
                    value={values.insulation}
                    onChange={handleInsulationOnChange}
                  /> */}
                  <select
                    className="form-select"
                    id="insulation"
                    value={insulation}
                    onChange={handleInsulationOnChange}>
                      <option value="null" defaultChecked>Insulation</option>
                    {uniqueOptionsInsulation.map((option, index) => (
                      <option key={index}>
                        {option}
                      </option>
                    ))}
                    </select>
                </div>
                <div>
                  <p>{value}</p>
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
      <Button
        style={{ float: "right" }}
        onClick={() => {
          submit();
        }}
      >
        Search
      </Button>
    </div>
  );
};
