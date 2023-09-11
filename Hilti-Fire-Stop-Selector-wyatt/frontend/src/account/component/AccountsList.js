import React from 'react';
import logo from "../../asset/hilti.png";
import { useNavigate } from 'react-router-dom';
import '../style/EditUsers.css';
import { Button, Container, Row } from 'react-bootstrap';
import { getAccountID, logOut } from '../../App';
import { useState,useEffect } from 'react';
import { TableCell, TableRow, Checkbox, IconButton } from "@mui/material";
import { MainTable } from '../../figures/components/MainTable';
import { Edit } from "@mui/icons-material";

export const AccountsList = () => {
  const navigate = useNavigate()
  const [accountID, setAccountID] = useState([]);
  const [accounts, setAccounts] = useState([]);


    useEffect(() => {
        try{
            getAccountID().then(res => setAccountID(res));
            console.log(accountID)
            console.log(String(accountID).substring(0,1))
        }catch(error){
            console.log(error);
        }
    }, [accountID]);
    useEffect(() => {
        try{
            if(accountID !== null && accountID !== "none") {
              getAccounts(accountID, setAccounts);
            }
        }catch(error){
            console.log(error);
        }
    }, [accountID]);
    if(!accountID){
      return navigate("*");
    }
    else if(accountID === "none" || String(accountID).substring(0,1) === '0') {
      return navigate("*");
    }


const AccountTable = (accounts, accountID, setAccounts) =>{
  // const navigate = useNavigate();
  const columns = [
    {
        id: 'account_id',
        numeric: false,
        disablePadding: true,
        label: 'ACCOUNT ID',
    },
    {
        id: 'account_type',
        numeric: false,
        disablePadding: false,
        label: 'ACCOUNT TYPE',
    },
    {
        id: 'first_name',
        numeric: false,
        disablePadding: false,
        label: 'FIRST NAME',
    },
    {
        id: 'last_name',
        numeric: false,
        disablePadding: false,
        label: 'LAST NAME',
    },
    {
        id: 'password',
        numeric: false,
        disablePadding: false,
        label: 'Password',
    },
]

const handleCreate = _ => {
  navigate(`/accountlist/create`)
};

const deleteAccount = (selected) => {
  console.log(selected)
  const conf = window.confirm(`Are you sure you want to delete these account(s)?`);
  if(conf){
    try{
        fetch("/api/deletemultipleaccount", {
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
                    getAccounts(accountID, setAccounts)
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
     
    <div className='sub-main' style={{
      display: "flex",
      textAlign: "center",
      width: "90%",
      height: "725px",
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
                <Button className='back' onClick={() => navigate(-1)}>&lt; Back</Button> Administration Commands - USERBASE 
                <Button className='logout' variant='custom' onClick = {() => {logOut(); navigate("/");}}>Logout</Button></h1>
                <div className='wrapper-u'></div>
                </Row>
                <div className='edit-box'>
                  {/* <Button className='add'>Add New User</Button>
                  <Button className='deets'>Edit User Details</Button>
                  <Button className='permissions'>Edit Permissions</Button>
                  <Button className='remove'>Remove User</Button> */}
                  
                  { MainTable(columns, accounts, cellFormat, "ACCOUNT DATABASE", "New User", handleCreate,"Delete User", deleteAccount)}
                </div>
                
          </div>
      </div>
      </Container>
    </div>
  );
};

const cellFormat = (handleClick, isSelected, index, row) => {
  const isItemSelected = isSelected(row.account_id);
  const labelId = `enhanced-table-checkbox-${index}`;
  return(
      <TableRow
          hover
          onClick={(event) => handleClick(event, row.account_id)}
          role="checkbox"
          aria-checked={isItemSelected}
          tabIndex={-1}
          key={row.account_id}
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
          {row.account_id}
          </TableCell>
          <TableCell className="table-cell" align="center">{row.account_type}</TableCell>
          <TableCell className="table-cell" align="center">{row.first_name}</TableCell>
          <TableCell className="table-cell" align="center">{row.last_name}</TableCell>
          <TableCell className="table-cell" align="center">{row.password}</TableCell>
          <TableCell className="table-cell" align="center"><IconButton onClick={() => navigate(`/accountlist/detail/${row.account_id}`)}><Edit /></IconButton></TableCell>
      </TableRow>
  );
};



const getAccounts = async (accountID, setAccounts) => {
  
  const res = await fetch("/api/getallaccount", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          accountID: accountID
      })
  });
  const data = await res.json();
  if(data.status){
      setAccounts(data.accounts);
  }
};


return(
  <section>
      {AccountTable(accounts, accountID, setAccounts)}
  </section>
);
};