import React from "react";
import { Nav, Navbar, NavDropdown, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

const NavbarMain=()=>{
  const tableID = "T008";
    return(
     <>
      <Container style={{ position: "fixed", top: 0,zIndex:1,right:0,left:0 }}>
        <Row>
          <Col xs={10} style={{ padding: 0}}>
            <Navbar className="" style={{ backgroundColor: "#000000" ,height:'50px'}}>
              <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-50">
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </Col>
          <Col xs={2} style={{ padding: 0 }}>
            <Navbar className="" style={{ backgroundColor: "#1A5276",height:'50px' }}>
              <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-50">
                    <button className="btn btn-outline-warning">
                      โต๊ะที่ : {tableID}
                    </button>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </Col>
        </Row>
      </Container>
     </>
    );
  }
  export default NavbarMain;