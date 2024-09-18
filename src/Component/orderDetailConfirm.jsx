import React from "react";
import "../Component/sideNavigation.css";
import "../Customer/selectMenu.css";
import {  Alert, Card,Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import Picture2 from "../image/restuarant.jpg";

const OrderConfirmCard = ()=>{
  return(
    <>
       <div className="d-flex flex-row justify-content-between p-2">
              <p style={{ fontSize: "0.8rem", fontWeight: "bold" }}>
                รายละเอียดการสั่ง
              </p>
              <p style={{ fontSize: "1rem" }}>รหัสการสั่งอาหาร : xxx</p>
            </div>

            <hr className="text-secondary" />
            <div className="d-flex flex-row justify-content-between">
              <p style={{ fontSize: "0.8rem" }}>เวลาการสั่งอาหาร : xxx</p>
              <p
                style={{ fontSize: "1rem" }}
                className="border border-primary p-1 rounded-4 text-primary"
              >
                โต๊ะที่ : xxx
              </p>
            </div>
            <div className="d-flex flex-row justify-content-between">
              <div className="d-flex flex-row" style={{ lineHeight: "10px" }}>
                <p style={{ fontSize: "0.8rem" }} className="me-2">
                  การอนุมัติรายการสั่ง :
                </p>
                <p
                  style={{ fontSize: "0.6rem" }}
                  className="border border-danger p-1 rounded-4 text-danger"
                >
                  ยังไม่อนุมัติ
                </p>
              </div>
              <p style={{ fontSize: "0.8rem" }}>จำนวนรายการรวม : xxx</p>
            </div>
            <hr className="text-secondary" />
            <Alert variant="warning" className="mb-3">
              <div className="d-flex flex-row justify-content-between">
                <div className="d-flex flex-row">
                  <img
                    src={Picture2}
                    className="border rounded-3 image-fluid me-3"
                    style={{
                      height: "60px",
                      width: "60px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="d-flex flex-column">
                    <p
                      style={{
                        fontSize: "1rem",
                        lineHeight: "10px",
                        fontWeight: "bold",
                      }}
                      className=" text-primary"
                    >
                      ชื่อเมนู
                    </p>
                    <p
                      style={{ fontSize: "0.8rem" }}
                      className="text-primary text-secondary"
                    >
                      รายละเอียดเมนู
                    </p>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <p
                    style={{
                      fontSize: "1rem",
                      lineHeight: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    x1
                  </p>
                  <p style={{ fontSize: "1rem" }}>ราคา</p>
                </div>
              </div>
            </Alert>
            <Alert variant="warning" className="mb-3">
              <div className="d-flex flex-row justify-content-between">
                <div className="d-flex flex-row">
                  <img
                    src={Picture2}
                    className="border rounded-3 image-fluid me-3"
                    style={{
                      height: "60px",
                      width: "60px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="d-flex flex-column">
                    <p
                      style={{
                        fontSize: "1rem",
                        lineHeight: "10px",
                        fontWeight: "bold",
                      }}
                      className=" text-primary"
                    >
                      ชื่อเมนู
                    </p>
                    <p
                      style={{ fontSize: "0.8rem" }}
                      className="text-primary text-secondary"
                    >
                      รายละเอียดเมนู
                    </p>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <p
                    style={{
                      fontSize: "1rem",
                      lineHeight: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    x1
                  </p>
                  <p style={{ fontSize: "1rem" }}>ราคา</p>
                </div>
              </div>
            </Alert>
            <Alert variant="warning" className="mb-3">
              <div className="d-flex flex-row justify-content-between">
                <div className="d-flex flex-row">
                  <img
                    src={Picture2}
                    className="border rounded-3 image-fluid me-3"
                    style={{
                      height: "60px",
                      width: "60px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="d-flex flex-column">
                    <p
                      style={{
                        fontSize: "1rem",
                        lineHeight: "10px",
                        fontWeight: "bold",
                      }}
                      className=" text-primary"
                    >
                      ชื่อเมนู
                    </p>
                    <p
                      style={{ fontSize: "0.8rem" }}
                      className="text-primary text-secondary"
                    >
                      รายละเอียดเมนู
                    </p>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <p
                    style={{
                      fontSize: "1rem",
                      lineHeight: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    x1
                  </p>
                  <p style={{ fontSize: "1rem" }}>ราคา</p>
                </div>
              </div>
            </Alert>
            <hr className="text-secondary" />
            <div className="d-flex justify-content-end">
              <Card border="secondary" style={{ width: "25rem" }}>
                <Card.Header>รายละเอียด</Card.Header>
                <Card.Body>
                  {/*<Card.Title>ราคารวม</Card.Title>*/}
                  <Card.Text>
                    <div className="d-flex flex-row justify-content-between">
                      <p style={{ fontSize: "1rem" }}>จำนวน () รายการ</p>
                      <p>ราคาสินค้า บาท</p>
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                      <p style={{ fontSize: "1rem" }}>ภาษีมุลค่าเพิ่ม (7%)</p>
                      <p style={{ fontSize: "1rem" }}>ภาษี บาท</p>
                    </div>
                    <hr variant="secondary" />
                    <div className="d-flex flex-row justify-content-between mb-2">
                      <p style={{ fontSize: "1.3rem" }}>ราคาสุทธิ</p>
                      <p style={{ fontSize: "1.3rem" }}>ราคาสุทธิ บาท</p>
                    </div>
                    <div className="d-flex flex-row justify-content-center">
                    <Button variant="outline-danger"  className="me-2">
                      <i class="bi bi-coin me-2"></i> ยกเลิกรายการสั่ง
                    </Button>
                    <Button variant="outline-primary">
                      <i class="bi bi-coin me-2"></i> ยืนยันรายการสั่ง
                    </Button>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
    </>
  );
}
export default OrderConfirmCard;