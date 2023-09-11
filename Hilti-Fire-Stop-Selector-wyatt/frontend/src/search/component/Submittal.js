import React from "react";
import './style/custom.css';
import { useState, useEffect,useRef } from 'react';
import { Button, Table } from 'react-bootstrap';
import Stack from '@mui/material/Stack';
import ReactToPrint from "react-to-print";
import { useLocation } from "react-router-dom";

export function Submittal(){

  const componentRef = useRef();
  
  const location = useLocation();
  
  const [products, setProducts] = useState([]);
    
  useEffect(() => {
    const dataS = window.localStorage.getItem("products_data");
    if(dataS!==null){
      setProducts(JSON.parse(dataS));
    }
  },[])

  const addSubmittal = (product) => {
    setProducts([...products, product]);
    window.localStorage.setItem("products_data", JSON.stringify(products));
  }
  
if (location.state) {
  addSubmittal(location.state);
}

const DeleteEntry = (product) => {
  let myArray = JSON.parse(localStorage.getItem("products_data"));
  let index = myArray.findIndex(x => x.id === product.application_id);
  myArray.splice(index, 1);
  localStorage.setItem("products_data", JSON.stringify(myArray));
  setProducts(myArray);
}

const ClearSubmittal =() => {
  let myArray = JSON.parse(localStorage.getItem("products_data"));
  myArray.splice(0, myArray.length);
  localStorage.setItem("products_data", JSON.stringify(myArray));
  setProducts(myArray);
}

return (
<div className="container"> 
<div  style={{display: 'flex', justifyContent: 'space-between'}}>
  <Button className="btn btn-secondary" onClick={()=> ClearSubmittal()} style={{float: "right", marginBottom: "10px"}} >Clear Submittal</Button>
</div>    
  <div ref={componentRef}>
    <div className='card' style={{position: "sticky"}}>
    <div className='card-body'>
    {products.map((product)=> (
      <div className="card">
        <div className="card-body">
        {/* <p>Product Details</p> */}
      <Table striped bordered hover size="sm">
        <tbody>
            <tr className="table-primary">   
              <td><b>RIR Number</b></td>
              <td><b>Name</b></td> 
              <td><b>Application Description</b></td>
              <td><b>Table</b></td>
              <td><b>Figure</b></td>    
              <td><b>HOL Page</b></td>    
            </tr>
            <tr className="table-dark" key={product.application_id}>
              <td><a href={product.approval_hyper} target="_blank">{product.approval_number}</a></td>
              <td>{product.application_name}</td>
              <td>{product.application_desc}</td>
              <td>{product.approval_table}</td>
              <td>{product.approval_figure}</td> 
              <td><a href={product.application_hyper} target="_blank">Product HOL</a></td>  
            </tr>
            <tr className="table-primary">
              <td><b>Trade</b></td>
              <td><b>Separating Element</b></td>
              <td><b>Construction Type</b></td>
              <td><b>Thickness</b></td>
              <td><b>Sub-category</b></td>
              <td><b>FRL</b></td>
            </tr>
            <tr className="table-dark" key={product.application_id}>
              <td>{product.application_type}</td>
              <td>{product.application_wallfloor}</td>
              <td>{product.application_construction_type}</td>
              <td>{product.application_thickness}</td>
              <td>{product.application_subcategory}</td>
              <td>-/{product.application_integrity}/{product.application_insulation}</td> 
            </tr>
            <tr className="table-primary">
              <td><b>Service Type</b></td>
              <td><b>Service Detail</b></td>
              <td><b>Additional Product</b></td>
              <td><b>Additional Information</b></td>
              <td><b>Additional Information</b></td>
                <td>
              <div className="hide-on-print">
                <b>Remove</b>
              </div>
              </td>
            </tr>
            <tr className="table-dark" key={product.application_id}>
              <td>{product.electrical_service_type}{product.hvac_pipe_type}{product.plumbing_pen_type}</td>
              <td>{product.electrical_service_detail}
                  {product.hvac_pipe_material}
                  {product.plumbing_pipe_type}  <br/> {product.plumbing_pipe_size}
              </td>
              <td>{product.application_sub_comp}</td>
              <td>{product.application_additional_info1}</td>
              <td>{product.application_additioanl_info2}</td>
              <td>
                <div className="hide-on-print">
                      <button 
                        type="button" 
                        className="btn btn-primary btn-sm" 
                        style={{height: 45, width:45}}
                        fdprocessedid="4sgam" 
                        onClick={() => DeleteEntry(product)}>—</button>   
                </div>
              </td>
            </tr>
          </tbody>
          </Table>
          </div>
        </div>
        ))}
    </div>
    </div>
    </div>
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
    <a href ="/guidedsearch">
          <Button className="btn btn-secondary" style={{float: "left"}}>New Search</Button>
    </a>
    <Stack>
    <ReactToPrint
    trigger={() => <Button>Print</Button>}
    content={() => componentRef.current}
    />
    </Stack>
    </div>
    </div>
  );
}