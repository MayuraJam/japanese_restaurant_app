import React from "react";
import SideBarAdmin from "../Component/sideNavigationAdmin";
import "../Component/sideNavigation.css";
import "../Customer/selectMenu.css";
import NavbarAdmin from "../Component/NavBarAdmin";
import { Nav, Navbar, NavDropdown, Container, Row, Col,Card } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useParams } from "react-router-dom";

const TablePage = () => {
  const { staftID } = useParams();
  return (
    <div>
      <SideBarAdmin />
      <NavbarAdmin />
      <div
        className="mainMenu border border-info "
        style={{ height: "calc(100vh - 50px)" }}
      >
        <h4 className="my-3">รายการโต๊ะ id: {staftID}</h4>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(480px,480px))",
            gap: "10px",
            marginLeft: "20px",
          }}
        >
          <div className="border border-dark p-2 rounded-3 bg-white">
            โต๊ะที่ยังไม่จอง
            <hr className="text-secondary" />
            <div
              className=" p-2"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(12rem,12rem))",
                gap: "10px",
                height: "380px",
                overflowY: "auto",
              }}
            >
            <Card border="primary" bg='secondary' text='warning' style={{ width: "12rem" }}>
                <Card.Header style={{fontSize:'1rem'}}>รหัสโต๊ะ</Card.Header>
                <Card.Body>
                  <Card.Title>สถานะของโต๊ะ</Card.Title>
                  <hr className="text-warning" />
                  <Card.Text style={{fontSize:'1rem'}}>
                  รายละเอียดโต๊ะ
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card border="primary" bg='secondary' text='warning' style={{ width: "12rem" }}>
                <Card.Header style={{fontSize:'1rem'}}>รหัสโต๊ะ</Card.Header>
                <Card.Body>
                  <Card.Title>สถานะของโต๊ะ</Card.Title>
                  <hr className="text-warning" />
                  <Card.Text style={{fontSize:'1rem'}}>
                  รายละเอียดโต๊ะ
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card border="primary" bg='secondary' text='warning' style={{ width: "12rem" }}>
                <Card.Header style={{fontSize:'1rem'}}>รหัสโต๊ะ</Card.Header>
                <Card.Body>
                  <Card.Title>สถานะของโต๊ะ</Card.Title>
                  <hr className="text-warning" />
                  <Card.Text style={{fontSize:'1rem'}}>
                  รายละเอียดโต๊ะ
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card border="primary" bg='secondary' text='warning' style={{ width: "12rem" }}>
                <Card.Header style={{fontSize:'1rem'}}>รหัสโต๊ะ</Card.Header>
                <Card.Body>
                  <Card.Title>สถานะของโต๊ะ</Card.Title>
                  <hr className="text-warning" />
                  <Card.Text style={{fontSize:'1rem'}}>
                  รายละเอียดโต๊ะ
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card border="primary" bg='secondary' text='warning' style={{ width: "12rem" }}>
                <Card.Header style={{fontSize:'1rem'}}>รหัสโต๊ะ</Card.Header>
                <Card.Body>
                  <Card.Title>สถานะของโต๊ะ</Card.Title>
                  <hr className="text-warning" />
                  <Card.Text style={{fontSize:'1rem'}}>
                  รายละเอียดโต๊ะ
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card border="primary" bg='secondary' text='warning' style={{ width: "12rem" }}>
                <Card.Header style={{fontSize:'1rem'}}>รหัสโต๊ะ</Card.Header>
                <Card.Body>
                  <Card.Title>สถานะของโต๊ะ</Card.Title>
                  <hr className="text-warning" />
                  <Card.Text style={{fontSize:'1rem'}}>
                  รายละเอียดโต๊ะ
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
          <div className="border border-dark p-2 rounded-3 bg-white">
            โต๊ะที่จองแล้ว
            <hr className="text-secondary" />
            <div
              className=" p-2"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(12rem,12rem))",
                gap: "10px",
                height: "380px",
                overflowY: "auto",
              }}
            >
              <Card border="primary" bg='warning' style={{ width: "12rem" }}>
                <Card.Header style={{fontSize:'1rem'}}>รหัสโต๊ะ</Card.Header>
                <Card.Body>
                  <Card.Title>สถานะของโต๊ะ</Card.Title>
                  <hr className="text-secondary" />
                  <Card.Text style={{fontSize:'1rem'}}>
                  รายละเอียดโต๊ะ
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card border="primary" bg='warning'style={{ width: "12rem" }}>
                <Card.Header style={{fontSize:'1rem'}}>รหัสโต๊ะ</Card.Header>
                <Card.Body>
                  <Card.Title>สถานะของโต๊ะ</Card.Title>
                  <hr className="text-secondary" />
                  <Card.Text style={{fontSize:'1rem'}}>
                  รายละเอียดโต๊ะ
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card border="primary" bg='warning'style={{ width: "12rem" }}>
                <Card.Header style={{fontSize:'1rem'}}>รหัสโต๊ะ</Card.Header>
                <Card.Body>
                  <Card.Title>สถานะของโต๊ะ</Card.Title>
                  <hr className="text-secondary" />
                  <Card.Text style={{fontSize:'1rem'}}>
                  รายละเอียดโต๊ะ
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card border="primary"bg='warning' style={{ width: "12rem" }}>
                <Card.Header style={{fontSize:'1rem'}}>รหัสโต๊ะ</Card.Header>
                <Card.Body>
                  <Card.Title>สถานะของโต๊ะ</Card.Title>
                  <hr className="text-secondary" />
                  <Card.Text style={{fontSize:'1rem'}}>
                  รายละเอียดโต๊ะ
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TablePage;
