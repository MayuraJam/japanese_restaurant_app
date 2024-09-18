import { React, useEffect, useState } from "react";
import SideBarCustomer from "../Component/sideNavigationCustomer";
import "../Component/sideNavigation.css";
import "../Customer/selectMenu.css";
import NavbarMenu from "../Component/navBarCustomer";
import { Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import Picture2 from "../image/restuarant.jpg";
import "../Customer/PaymentOption.css";
import Swal from "sweetalert2";
const PaymentPage = () => {
  const [optionPay, setOptionPay] = useState("");

  const handleOpenBill = ()=>{
    Swal.fire({
      title: "เข้าสู่ระบบการสะสมคะแนนหรือไม่?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonColor: "#3085d6",
      cancelButtonText:"ไม่ต้องการเข้าสู่หน้าสะสมคะแนน",
      confirmButtonText: "เข้าสู่ระบบ",
    }).then((result) => {
      if (result.isConfirmed) {
        //ไปที่ conponent เข้าสู่ระบบ

      }else if(result.dismiss){
        //ไปที่หน้า component บิล
      }

    });
  }

  const handleClick = (value) => {
    setOptionPay(value);
  };
  return (
    <div>
      <SideBarCustomer />
      <NavbarMenu />
      <div className="mainMenu border border-info">
        <p className="my-3 p-2 fs-3">การชำระเงิน</p>
        <p style={{ fontSize: "1rem" }}>รหัสการสั่งอาหาร : xxx</p>
        <Row
          className=" d-flex justify-content-start"
          style={{ marginLeft: "8px" }}
        >
          <Col
            lg={7}
            md={5}
            sm={4}
            className="border border-dark rounded-2 me-3 p-3 bg-white"
            style={{ minHeight: "440px" }}
          >
            <table className="table table-striped border border-secondary">
              <thead>
                <tr>
                  <th>ภาพเมนู</th>
                  <th>ชื่อเมนู</th>
                  <th>จำนวน</th>
                  <th>ราคา</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>
                    <img
                      src={Picture2}
                      alt="ภาพเมนูอาหาร"
                      className="img-fluid border border-dark rounded-2 "
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  </th>
                  <th>
                    <div className="d-flex flex-column">
                      <p style={{ fontSize: "0.9rem" }}>ชื่อเมนู</p>
                      <p style={{ fontSize: "0.8rem", color: "gray" }}>
                        optionName
                      </p>
                    </div>
                  </th>
                  <th>จำนวน ชื้น</th>
                  <th>ราคา</th>
                </tr>
                <tr>
                  <th>
                    <img
                      src={Picture2}
                      alt="ภาพเมนูอาหาร"
                      className="img-fluid border border-dark rounded-2 "
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  </th>
                  <th>
                    <div className="d-flex flex-column">
                      <p style={{ fontSize: "0.9rem" }}>ชื่อเมนู</p>
                      <p style={{ fontSize: "0.8rem", color: "gray" }}>
                        optionName
                      </p>
                    </div>
                  </th>
                  <th>จำนวน ชื้น</th>
                  <th>ราคา</th>
                </tr>
                <tr>
                  <th>
                    <img
                      src={Picture2}
                      alt="ภาพเมนูอาหาร"
                      className="img-fluid border border-dark rounded-2 "
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  </th>
                  <th>
                    <div className="d-flex flex-column">
                      <p style={{ fontSize: "0.9rem" }}>ชื่อเมนู</p>
                      <p style={{ fontSize: "0.8rem", color: "gray" }}>
                        optionName
                      </p>
                    </div>
                  </th>
                  <th>จำนวน ชื้น</th>
                  <th>ราคา</th>
                </tr>
                <tr>
                  <th>
                    <img
                      src={Picture2}
                      alt="ภาพเมนูอาหาร"
                      className="img-fluid border border-dark rounded-2 "
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  </th>
                  <th>
                    <div className="d-flex flex-column">
                      <p style={{ fontSize: "0.9rem" }}>ชื่อเมนู</p>
                      <p style={{ fontSize: "0.8rem", color: "gray" }}>
                        optionName
                      </p>
                    </div>
                  </th>
                  <th>จำนวน ชื้น</th>
                  <th>ราคา</th>
                </tr>
              </tbody>
            </table>
            <Card border="secondary" style={{ width: "35rem" }}>
              <Card.Header style={{ fontSize: "1rem" }}>รายละเอียด</Card.Header>
              <Card.Body>
                {/*<Card.Title>ราคารวม</Card.Title>*/}
                <Card.Text>
                  <div className="d-flex flex-row justify-content-between">
                    <p style={{ fontSize: "0.8rem" }}>จำนวน () รายการ</p>
                    <p style={{ fontSize: "0.8rem", fontWeight: "bold" }}>
                      ราคาสินค้า บาท
                    </p>
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                    <p style={{ fontSize: "0.8rem" }}>ภาษีมุลค่าเพิ่ม (7%)</p>
                    <p style={{ fontSize: "0.8rem" }}>ภาษี บาท</p>
                  </div>
                  <hr variant="secondary" />
                  <div className="d-flex flex-row justify-content-between">
                    <p style={{ fontSize: "1rem", fontWeight: "bold" }}>
                      ราคาสุทธิ
                    </p>
                    <p style={{ fontSize: "1rem", fontWeight: "bold" }}>
                      ราคาสุทธิ บาท
                    </p>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
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
            <p>รูปแบบการชำระเงิน</p>
            <div className="d-flex flex-row justify-content-center">
              <Button
                className={`border border-dark rounded-3 d-flex flex-column justify-content-center align-items-center pt-3 mx-3 px-2 text-dark
                  ${optionPay === "QR" ? "active" : " "}`}
                variant="outline-warning"
                style={{ height: "100px" }}
                onClick={() => handleClick("QR")}
              >
                <img
                  src={Picture2}
                  alt="ภาพเมนูอาหาร"
                  className="img-fluid border border-dark rounded-2 "
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                  }}
                />
                <p style={{ fontSize: "1rem" }}>QR code</p>
              </Button>
              <Button
                className={`border border-dark rounded-3 d-flex flex-column justify-content-center align-items-center pt-3 mx-3 px-2 text-dark
                  ${optionPay === "Money" ? "active" : " "}`}
                variant="outline-warning"
                style={{ height: "100px" }}
                onClick={() => handleClick("Money")}
              >
                <img
                  src={Picture2}
                  alt="ภาพเมนูอาหาร"
                  className="img-fluid border border-dark rounded-2 "
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                  }}
                />
                <p style={{ fontSize: "1rem" }}>เงินสด</p>
              </Button>
              <Button
                className={`border border-dark rounded-3 d-flex flex-column justify-content-center align-items-center pt-3 mx-3 px-2 text-dark
                  ${optionPay === "Point" ? "active" : " "}`}
                variant="outline-warning"
                style={{ height: "100px" }}
                onClick={() => handleClick("Point")}
              >
                <img
                  src={Picture2}
                  alt="ภาพเมนูอาหาร"
                  className="img-fluid border border-dark rounded-2 "
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                  }}
                />
                <p style={{ fontSize: "1rem" }}>แต้ม</p>
              </Button>
            </div>
            <hr variant="secondary" />
            <div>
              {optionPay === "" && (
                <div>
                  <center>
                    <p>เลือกรูปแบบการชำระเงิน</p>
                  </center>
                </div>
              )}
              {optionPay === "Point" && (
                <div>
                  <p>การชำระเงินด้วย point</p>
                </div>
              )}
              {optionPay === "QR" && (
                <div>
                  <p>การชำระเงินด้วย QR code</p>
                  <div className="d-flex justify-content-end">
                    <Button variant="outline-primary">ยืนยันการชำระเงิน</Button>
                  </div>
                </div>
              )}
              {optionPay === "Money" && (
                <div>
                  <p>การชำระเงินด้วย เงินสด</p>
                </div>
              )}
            </div>
            <hr variant="secondary" />
            <div className="d-flex justify-content-end">
              <Button variant="outline-primary" onClick={handleOpenBill}>เปิดดูบิล</Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default PaymentPage;
