import React, {useEffect, useState} from 'react';
import logo from "../../asset/hilti.png";
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row } from 'react-bootstrap';
import { logOut, getAccountID } from '../../App';
import { MainTable } from '../../figures/components/MainTable';
import { TableCell, TableRow, Checkbox, IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";
import { Edit } from "@mui/icons-material";



export const Database = () => {
  const navigate = useNavigate();
  const [accountID, setAccountID] = useState([]);
  const [applications, setApplications] = useState([]);
  

    useEffect(() => {
        try{
            getAccountID().then(res => setAccountID(res));
        }catch(error){
            console.log(error);
        }
    }, []);
    useEffect(() => {
        try{
            if(accountID != null && accountID !== "none") getApplications(accountID, setApplications);
        }catch(error){
            console.log(error);
        }
    }, [accountID]);

    // if(accountID === "none") {
    //   return navigate("/login");
    // }
    if(!accountID){
      return navigate("*");
    }
    else if(accountID === "none" || String(accountID).substring(0,1) === '0') {
      return navigate("*");
    }

    return(
        <section>
            {ApplicationsTable(applications, accountID, setApplications)}
        </section>
    );
};


const ApplicationsTable = (applications, accountID, setApplications) => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    data: [],
    input: {key: ''},
})



const handleChange = (e) => {
  const { id, value } = e.target;
  setState(prevState => ({
      ...prevState,
      input: {
          ...prevState.input,
          [id]: value
      }
  }))
}


  const columns = [
    {
        id: 'application_id',
        numeric: false,
        disablePadding: true,
        label: 'APPLICATION ID',
    },
    {
        id: 'application_name',
        numeric: false,
        disablePadding: false,
        label: 'APPLICATION NAME',
    },
    {
        id: 'application_integrity',
        numeric: false,
        disablePadding: false,
        label: 'APPLICATION INTEGRITY',
    },
    {
        id: 'application_insulation',
        numeric: false,
        disablePadding: false,
        label: 'APPLCIATION INSULATION',
    },
    {
        id: 'application_type',
        numeric: false,
        disablePadding: false,
        label: 'APPLICATION TYPE',
    },
    {
      id: 'application_wallfloor',
      numeric: false,
      disablePadding: false,
      label: 'APPLICATION WALL/FLOOR',
  },
    {
      id: 'application_construction_type',
      numeric: false,
      disablePadding: false,
      label: 'CONSTRUCTION TYPE',
  },
  {
    id: 'application_subcategory',
    numeric: false,
    disablePadding: false,
    label: 'APPLICATION SUBCATEGORY',
  },
  {
    id: 'application_thickness',
    numeric: false,
    disablePadding: false,
    label: 'APPLICATION THICKNESS',
  }
  ]

  const handleCreate = _ => {
    navigate(`/application/create`)
  };

  const deleteApplication = (selected) => {
    console.log(selected)
    const conf = window.confirm(`Are you sure you want to delete these application(s)?`);
    if(conf){
    try{
        fetch("/api/deletemultipleapplication", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                list: selected
            })
        })
            .then((res) => { return res.json(); } )
            .then((data) => {
                alert(data.message);
                window.location.reload()
                if(data.status){
                    getApplications(accountID, setApplications)
                }
            });
    }catch(error){
        console.log(error);
    }
  }
  };

  return(
    <div className='main'>
      <Container fluid>
        <img src={logo} alt='logo' className='logo'
          style={{
          maxWidth: "100%",
          width: "40vw",
          maxHeight: "130px",
          height: "auto",
          display: "flex",
          position: "relative",
          objectPosition: "center top",
          padding: "0 29px",
          marginLeft: "30%"
        }}/>
     
    <div className='sub-main' 
      style={{
      display: "flex",
      textAlign: "center",
      width: "90%",
      height: "741px",
      maxHeight: "80.4vh",
      padding: "2% 2% 0 2%",
      justifyContent: "center",
      borderRadius: "20px 20px 0 0",
      margin: "0 5% 0 5%",
      position: "relative",
    }}>
      <div className='inner' style={{
        backgroundColor: "rgb(122, 109, 109)",
        borderRadius: "20px 20px 0 0",
        width: "100%",
        justifyContent: "center",
        position: "relative"
        }}>
          <Row>
            <h1 className='top'>
              <Button className='back' onClick={() => navigate(-1)}>&lt; Back</Button> Administration Commands - DATABASE 
              <Button className='logout' variant='custom' onClick = {() => {logOut(); navigate("/");}}>Logout</Button></h1>
            <div className='wrapper-u'></div>
            </Row>
            <div className='edit-box'>
              {/* <Button className='add'>Add New Item</Button>
              <Button className='deets'>Edit Item</Button>
              <Button className='remove'>Delete Item</Button> */}
                  <div className="input-group">
                      <input id="key" value={state.input.key} className="form-control" onChange={handleChange} placeholder="Search application..." />
                      <span className="input-group-text"><Search /></span>
                  </div>
                  <div className="card-body">
                      {/* {console.log(state, applications)} */}
                      {console.log(applications.filter(application => application.application_name.includes(`${state.input.key}`)))}
                      {
                        //  applications
                        //       .filter((application => application.application_name.toLowerCase().indexOf(`${state.input.key}`.toLowerCase()) >= 0))
                        //       .map((val, key) =>{return <form><div>{val.application_id}<a href={`/application/detail/${val.application_id}`}>{val.application_name}</a></div></form>})
                              // .map((val, key) =>{return setApplications(val)})
                              // .map((val, key) => {
                              //     return <p>
                              //       {val.application_name}. 
                              //     <strong>
                              //       <a href={`/application/detail/${val.application_id}`}>{val.application_id}</a>
                              //     </strong>
                              //     </p>
                              // })

                      }
                  </div>
                  {/* {console.log(applications)} */}
              {MainTable(columns, applications.filter(application => application.application_name.toLowerCase().includes(`${state.input.key.toLowerCase()}`)), cellFormat, "APPLICATION DATABASE", "New Application", handleCreate,"Delete Application", deleteApplication)}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

const cellFormat = (handleClick, isSelected, index, row) => {
  const isItemSelected = isSelected(row.application_id);
  const labelId = `enhanced-table-checkbox-${index}`;
  return(
      <TableRow
          hover
          onClick={(event) => handleClick(event, row.application_id)}
          role="checkbox"
          aria-checked={isItemSelected}
          tabIndex={-1}
          key={row.application_id}
          selected={isItemSelected}
      >
          <TableCell className="table-cell" padding="checkbox">
              <Checkbox
                  color="primary"
                  checked={isItemSelected}
                  inputProps={{
                  'aria-labelledby': labelId,
                  }}
              />
          </TableCell>
          <TableCell
              className="table-cell" 
              component="th"
              id={labelId}
              scope="row"
              padding="none"
          >
          {row.application_id}
          </TableCell>
          <TableCell className="table-cell" align="center">{row.application_name}</TableCell>
          <TableCell className="table-cell" align="center">{row.application_integrity}</TableCell>
          <TableCell className="table-cell" align="center">{row.application_insulation}</TableCell>
          <TableCell className="table-cell" align="center">{row.application_type}</TableCell>
          <TableCell className="table-cell" align="center">{row.application_wallfloor}</TableCell>
          <TableCell className="table-cell" align="center">{row.application_construction_type}</TableCell>
          <TableCell className="table-cell" align="center">{row.application_subcategory}</TableCell>
          <TableCell className="table-cell" align="center">{row.application_thickness}</TableCell>
          <TableCell className="table-cell" align="center"><IconButton onClick={() => window.location.href = `/application/detail/${row.application_id}`}><Edit /></IconButton></TableCell>
      </TableRow>
  );
};


const getApplications = async (AccountID, setApplications) => {
  const res = await fetch("/api/getallproduct", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          AccountID: AccountID
      })
  });
  const data = await res.json();
  // console.log(data.applications)
  if(data.status){
      setApplications(data.applications);
  }
};