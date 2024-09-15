import React from "react";
import { Nav, Navbar, Container, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import QuestionModal from "./question";
import AddQuestion from "./addQuestion";
const NavbarCustomer = () => {
  const tableID = "T001";
  return (
    <div>
      <Container style={{ marginLeft: "180px", position: "fixed", top: 0 ,zIndex:1}}>
        <Row>
          <Col xs={9} style={{ padding: 0 }}>
            <Navbar className="" style={{ backgroundColor: "#EB5B00" }}>
              <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-50">
                    <AddQuestion/>
                    <QuestionModal />
                    {/* <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>*/}
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </Col>
          <Col xs={2} style={{ padding: 0 }}>
            <Navbar className="" style={{ backgroundColor: "#1A5276" }}>
              <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-50">
                    <button className="btn btn-outline-warning">
                      โต๊ะที่ : {tableID}
                    </button>
                    {/* <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>*/}
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default NavbarCustomer;
