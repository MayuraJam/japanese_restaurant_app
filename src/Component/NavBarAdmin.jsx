import React from "react";
import { Nav, Navbar, NavDropdown, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import AdminProfileModal from "../Admin/adminProfile";
import NotificationModal from "./notificationStaff";
const NavbarAdmin = ({staftID}) => {
  return (
    <div>
      <Container style={{ marginLeft: "180px", position: "fixed", top: 0,zIndex:1 }}>
        <Row>
          <Col xs={9} style={{ padding: 0 }}>
            <Navbar className="" style={{ backgroundColor: "#EB5B00" }}>
              <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-50">
                    {/*<button className="btn btn-outline-dark">
                      <i class="bi bi-pencil-square"> </i>แจ้งเตือน
                    </button>*/}
                    <NotificationModal role="ลูกค้า"/>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </Col>
          <Col xs={3} style={{ padding: 0 }}>
            <Navbar className="" style={{ backgroundColor: "#1A5276" }}>
              <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-50">
                    {/*<button className="btn btn-outline-warning">
                      ชื่อพนักงาน : xxxx
                    </button>*/}
                    <AdminProfileModal staftID={staftID}/>
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
export default NavbarAdmin;


