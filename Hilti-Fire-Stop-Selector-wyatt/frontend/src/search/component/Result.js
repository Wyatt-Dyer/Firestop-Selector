import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import './style/custom.css';

export function Results () {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  const navigate = useNavigate();

let location = useLocation();
let data = location.state;

const addToSub = (result) => {
  const currentData = JSON.parse(window.localStorage.getItem("products_data")) || [];
  currentData.push(result)
  window.localStorage.setItem("products_data", JSON.stringify(currentData));
}

    return (
      <div className='container'>
        <div className='card'>
          <div className='card-body'>
          <Button variant="light" style={{float: "left"}} onClick={() => navigate(-1)}>Back</Button>
            <h1 style={{marginRight: "10%"}}>Results</h1>
          </div>
          <div className='card-body'>
            <h2>Displaying "{data.length}" Results</h2>
          </div>
          <div className='card'>
            <div className='card-body'>
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
                          <td><b>Service Type</b></td>
                          <td>{result.electrical_service_type}{result.hvac_pipe_type}{result.plumbing_pen_type}</td>
                          <td><b>Service Detail</b></td>
                          <td>{result.electrical_service_detail}
                          {result.hvac_pipe_material}
                          {result.plumbing_pipe_type}  <br/> {result.plumbing_pipe_size}</td>
                        </tr> 
                        <tr>
                          <td><b>Description</b></td>
                          <td colSpan={4}>{result.application_desc}</td>
                        </tr>
                      </tbody>  
                    </Table>
                    <Button href={result.application_hyper} target="_blank" style={{
                      margin: "0.15%", paddingTop: "1%"}} >
                      View
                    </Button>
                    <Button style={{margin: "0.15%"}} ref={target} onClick={() => addToSub(result) && setShow(!show)}>Add to Submittal</Button>  
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
}