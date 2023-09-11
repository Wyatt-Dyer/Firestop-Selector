import { React, useState, useEffect } from "react";
import  './style/custom.css';
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, Table } from 'react-bootstrap';
import { getAccountID } from '../../App';


export const DirectSearch = () => {
    const [results, setResults] = useState([]);
    const [values, setValues] = useState({
        directInput: '',
      });

    const [accountID, setAccountID] = useState();

    const navigate = useNavigate();
    const navigateSearch = () => {
    navigate('/guidedsearch');
    }

    useEffect(() => {
        try{
            getAccountID().then(res => setAccountID(res));
        }catch(error){
            console.log(error);
        }
    }, [accountID]);

    //Fetch the data from the backend based off the users search input
    const submit = async () => {
        const searchInput = document.getElementById("SearchBar").value;
        console.log(searchInput);
        try{
        const res = await fetch("/api/directSearch",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                searchInput: searchInput
            })
    })    
    const data = await res.json();
        console.log(data.message)
        setResults(data.message) //Save the fetched details into the 'results' use state
        }catch(err){
            console.log(err)
        }
    }

    const handleOnChange = (event) => {
        event.persist();
        setValues((values) => ({
          ...values,
          directInput: event.target.value,
        })); 
      };

      const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            submit();
        }
      }

    return(
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <h1><b>Search a Product</b></h1>
                        <Row>
                            <input className="form-control me-sm-2" id="SearchBar" placeholder="Search" onChange={handleOnChange} onKeyDown={handleKeyDown}/>
                        <Col>
                            <button className="btn btn-primary" onClick={ () => { submit(); }}>Search</button>
                            <button className="btn btn-primary" onClick={ navigateSearch } style={{marginLeft: "2%"}}>Guided Search</button>
                        </Col>
                    </Row>
                </div>
                <div className="card">
                    <div className="card-body">
                        <h2>Displaying "{results.length}" Results</h2>
                    </div>
                    <div className="card-body">
                        {/*Render the results onto the page*/}
                        <Results data={results} />
                    </div>
                </div>
            </div>
        </div>
    );
}

//Function to render the returned products onto the page

function Results({ data }) {

    const addToSub = (result) => {
        const currentData = JSON.parse(window.localStorage.getItem("products_data")) || [];
        currentData.push(result)
        window.localStorage.setItem("products_data", JSON.stringify(currentData));
      }     

    return (
        <div>
        {data.map((result, index) => (
            <div className="card">
              <div className="card-body" key={index}>
              <b>{result.application_name}</b>
                <Table striped bordered hover size="sm" responsive='sm'>
                  <tbody>
                    <tr>
                    <td><b>Trade</b></td>
                          <td>{result.application_type}</td>
                          <td><b>Approval</b></td>
                          <td><a href={result.approval_hyper} target="_blank">{result.approval_number}</a></td>   
                        </tr>
                        <tr>
                          <td><b>Separating Element</b></td>
                          <td>{result.application_wallfloor}</td>
                          <td><b>Page</b></td>
                          <td>{result.approval_page}</td>
                        </tr>
                        <tr>
                          <td><b>Construction Type</b></td>
                          <td>{result.application_construction_type}</td>
                          <td><b>Figure</b></td>
                          <td>{result.approval_figure}</td>
                        </tr>
                        <tr>
                          <td><b>Sub-Category</b></td>
                          <td>{result.application_subcategory}</td>
                          <td><b>Thickness</b></td>
                          <td>{result.application_thickness}</td>
                        </tr>
                        <tr>
                          <td><b>Max. Pipe Size</b></td>
                          <td>{result.application_max_pipe_size}</td>
                          <td><b>FRL</b></td>
                          <td>-/{result.application_integrity}/{result.application_insulation}</td>
                        </tr>
                        <tr>
                          <td><b>Description</b></td>
                          <td colSpan={4}>{result.application_desc}</td>
                        </tr>    
                  </tbody>  
                </Table>
                <Button href={result.application_hyper} target="_blank" style={{margin: "0.15%", paddingTop: "1%"}}>View</Button>
                <Button style={{margin: "0.15%"}}onClick={() => addToSub(result) }>Add to Submittal</Button>        
              </div>
            </div>
          ))}
        </div>
    );
  }