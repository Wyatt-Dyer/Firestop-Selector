import React from 'react';
import logo from "../../asset/hilti.png";
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../App';

export const Admin = () => {
  const navigate = useNavigate();

  const navigateDatabase = () => {
    navigate('/database');
  }

  const navigateEditUsers = () => {
    navigate('/accountlist');
  }

  return(
    <div className='main'>
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
      style={
        {display: "flex", 
        textAlign: "center",
        width: "90vw",
        height: "auto",
        minHeight: "78vh",
        padding: "2% 2% 0 2%",
        justifyContent: "center",
        borderRadius: "20px 20px 0 0",
        margin: "0 5% 0 5%",
        position: "relative",
        } }>
                
        <div className='inner'
             style={
              {backgroundColor: "rgb(122, 109, 109)",
              borderRadius: "20px 20px 0 0",
              width: "100%",
              height: "auto",
              minHeight: "20vh",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              position: "relative"}
              }>
                <h1 style={{color: "white", fontSize: "2vw"}}>Administration Commands</h1>
                <div className='wrapper-u'></div>
            <Container fluid>
              <div style={{
                backgroundColor: "black",
                borderColor: "grey",
                borderRadius: "20px",
                width: "25%",
                minWidth: "fit-content",
                height: "77%",
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                left: "38%",
                top: "15%",
                position: "absolute",
                marginTop: "1.8%"
              }}>
                <Row>
                  <Col>
                    <h1 style={{color: "white", fontSize: "2.5vw", textAlign: "left"}}>Hello, <br />Admin!</h1>
                    <>
        <nav>
          <Container>
            <Row>
              <Button onClick={navigateDatabase} style={{
                fontSize: "1.5vw",
                color: "white",
                width: "fit-content",
                whiteSpace: "nowrap",
                paddingTop: "1%"
                }}>
                Applications
              </Button>
            </Row>
            <Row>
              <Button onClick={navigateEditUsers} style={{
                fontSize: "1.5vw",
                color: "white",
                width: "fit-content",
                whiteSpace: "nowrap",
                margin: "5% 3% 2% 0",
                }}>
                Users
              </Button>
            </Row>
          </Container>
        </nav>
        </>
                    <Button style={{
                      float: "left",
                      margin: "5% 3% 2% 0",
                      fontSize: "1vw",
                      }} onClick = {() => {logOut(); navigate("/");}} >
                      Logout</Button>
                  </Col>
                </Row>
              </div>
              </Container>
              </div>
      </div>
    </div>
  );
}