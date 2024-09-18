import React from "react";
import SideBarAdmin from "../Component/sideNavigationAdmin";
import "../Component/sideNavigation.css";
import "../Customer/selectMenu.css";
import NavbarAdmin from "../Component/NavBarAdmin";
import { Row, Col, Alert, Card, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import OrderConfirmCard from "../Component/orderDetailConfirm";

const OrderManagementPage = () => {
  return (
    <div>
      <SideBarAdmin />
      <NavbarAdmin />
      <div className="mainMenu border border-info">
        <p
          className="my-3 border border-dark bg-white p-2 rounded-5 d-flex justify-content-center"
          style={{ maxWidth: "220px" }}
        >
          รายการอาหาร
        </p>

        <Row
          className=" d-flex justify-content-start"
          style={{ marginLeft: "8px" }}
        >
          <Col
            lg={7}
            md={5}
            sm={4}
            className="border border-dark rounded-2 me-3 p-2 bg-white"
            style={{ minHeight: "440px" }}
          >
            <div className="d-flex justify-content-end  mb-3">
              <div
                className="search-container-box shadow-sm"
                style={{ width: 300 }}
              >
                <div className="input-group ">
                  <input
                    type="text"
                    id="search"
                    placeholder="ค้นหารายการสั่ง..."
                    name="search"
                    className="form-control "
                    /*value={"search"}
                            onChange={handleInputChange}
                            onKeyDown={handleSearch}*/
                  />
                  <div className="input-group-append">
                    <span className="input-group-text bg-white border-0" style={{cursor:"pointer"}}>
                      <i className="bi bi-search"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(12rem,17rem)",gap:"10px"}}>
            <Card  bg='white' text='dark' style={{ height:"11rem" }} className="shadow-sm">
                <Card.Header style={{fontSize:'1rem'}}>
                
                     รหัสการสั่งอาหาร : xxx
                
                </Card.Header>
                <Card.Body>
                  <div className="d-flex flex-row justify-content-between">
                  <Card.Title style={{fontSize:'1rem',lineHeight: "10px",}}>รหัสโต๊ะ : xxx</Card.Title>
                  <p className="bg-danger text-warning p-1 border rounded-3" style={{fontSize:"0.7rem"}}>NEW !</p>
                  </div>
                  <Card.Text style={{fontSize:'0.8rem',lineHeight: "8px"}} >
                  จำนวนรายการ : รายการ
                  </Card.Text>
                  <Button variant="outline-primary">
                    กดดูรายระเอียดเพื่อทำการยืนยัน
                    </Button>
                </Card.Body>
              </Card>
              <Card  bg='white' text='dark' style={{ height:"11rem" }} className="shadow-sm">
                <Card.Header style={{fontSize:'1rem'}}>รหัสการสั่งอาหาร : xxx</Card.Header>
                <Card.Body>
                  <Card.Title style={{fontSize:'1rem'}}>รหัสโต๊ะ : xxx</Card.Title>

                  <Card.Text style={{fontSize:'0.8rem'}}>
                  จำนวนรายการ : รายการ
                  </Card.Text>
                  <Button variant="outline-primary">
                    กดดูรายระเอียดเพื่อทำการยืนยัน
                    </Button>
                </Card.Body>
              </Card>
              <Card  bg='white' text='dark' style={{ height:"11rem" }} className="shadow-sm">
                <Card.Header style={{fontSize:'1rem'}}>รหัสการสั่งอาหาร : xxx</Card.Header>
                <Card.Body>
                  <Card.Title style={{fontSize:'1rem'}}>รหัสโต๊ะ : xxx</Card.Title>

                  <Card.Text style={{fontSize:'0.8rem'}}>
                  จำนวนรายการ : รายการ
                  </Card.Text>
                  <Button variant="outline-primary">
                    กดดูรายระเอียดเพื่อทำการยืนยัน
                    </Button>
                </Card.Body>
              </Card>
              <Card  bg='white' text='dark' style={{ height:"11rem" }} className="shadow-sm">
                <Card.Header style={{fontSize:'1rem'}}>รหัสการสั่งอาหาร : xxx</Card.Header>
                <Card.Body>
                  <Card.Title style={{fontSize:'1rem'}}>รหัสโต๊ะ : xxx</Card.Title>

                  <Card.Text style={{fontSize:'0.8rem'}}>
                  จำนวนรายการ : รายการ
                  </Card.Text>
                  <Button variant="outline-primary">
                    กดดูรายระเอียดเพื่อทำการยืนยัน
                    </Button>
                </Card.Body>
              </Card>
              <Card  bg='white' text='dark' style={{ height:"11rem" }} className="shadow-sm">
                <Card.Header style={{fontSize:'1rem'}}>รหัสการสั่งอาหาร : xxx</Card.Header>
                <Card.Body>
                  <Card.Title style={{fontSize:'1rem'}}>รหัสโต๊ะ : xxx</Card.Title>

                  <Card.Text style={{fontSize:'0.8rem'}}>
                  จำนวนรายการ : รายการ
                  </Card.Text>
                  <Button variant="outline-primary">
                    กดดูรายระเอียดเพื่อทำการยืนยัน
                    </Button>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col
            lg={4}
            md={3}
            sm={4}
            className="border border-dark p-2  rounded-2 bg-white"
            style={{
              position: "fixed",
              height: "490px",
              right: "10px",
              top: "80px",
              overflowY: "auto",
            }}
          >
            <OrderConfirmCard />
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default OrderManagementPage;
