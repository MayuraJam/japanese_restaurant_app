import { React, useEffect, useState } from "react";
import SideBarCustomer from "../Component/sideNavigationCustomer";
import "../CSS_file/sideNavigation.css";
import "../CSS_file/selectMenu.css";
import NavbarMenu from "../Component/navBarCustomer";
import {
  Row,
  Col,
  Card,
  Button,
  Modal,
  Dropdown,
  DropdownButton,
  SplitButton,
} from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import Picture2 from "../image/restuarant.jpg";
import "../CSS_file/PaymentOption.css";
import Swal from "sweetalert2";
import PaymentByQR from "../Component/paymentByQR.jsx";
import PaymentByPoint from "../Component/paymentByPoint.jsx";
import qrCode from "../image/icon/qr.png";
import point from "../image/icon/coin.png";
import money from "../image/icon/money.png";
import LoginMember from "../Customer/loginMember";
import axios from "axios";
import { useParams } from "react-router-dom";
import SelectPage from "../Component/selectMemberOrBillModal.jsx";
import Receipt from "../Component/billPaper.jsx";
const PaymentPage = () => {
  const { orderID } = useParams();
  const vat = 0.07;
  const [optionPay, setOptionPay] = useState("");
  const [loginOpen, setloginOpen] = useState(false);
  const [registerOpen, setregisterOpen] = useState(false);
  const [orderData, setOrderData] = useState([]);

  const openModal = (modalName) => {
    if (modalName === "login") {
      setloginOpen(true);
      setregisterOpen(false);
    } else if (modalName === "register") {
      setloginOpen(false);
      setregisterOpen(true);
    }
    console.log("loginOpen :", loginOpen);
    console.log("registerOpen :", registerOpen);
  };

  /*const handleOpenBill = () => {
    Swal.fire({
      title: "เข้าสู่ระบบการสะสมคะแนนหรือไม่?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonColor: "#3085d6",
      cancelButtonText: "ไม่ต้องการเข้าสู่หน้าสะสมคะแนน",
      confirmButtonText: "เข้าสู่ระบบ",
    }).then((result) => {
      if (result.isConfirmed) {*/
  // ไปที่ conponent เข้าสู่ระบบ
  // toMenuPage()
  /*<LoginMember 
         isOpen={!loginOpen}
         setOPen == true
         openRegister = {"register"}
         onClick={() => openModal("login")}
         onClose={()=> closeModal("login")}
       /> */
  /* } else if (result.dismiss === Swal.DismissReason.cancel) {
        return(
          <>
            <Receipt/>
          </>
        );
      }
    });
  };*/

  const handleClick = (value) => {
    setOptionPay(value);
  };

  const fetchingFulldata = async (orderID) => {
    try {
      const response = await axios.get(
        `https://localhost:7202/api/Admin/GetOrderByID/${orderID}`
      );
      console.log("response :", response.data.orderItem);
      setOrderData(response.data.orderItem);
    } catch (error) {
      console.log("ไม่สามารถดึงข้อมูลได้", error);
    }
  };
  useEffect(() => {
    fetchingFulldata(orderID);
  }, [orderID]);

  const CalculateTax = (totalPrice) => {
    var tax = (totalPrice * vat).toFixed(0);
    return tax;
  };

  const CalculateNetPrice = (totalPrice, taxPrice) => {
    var net = totalPrice + taxPrice;

    return net;
  };

  const sentMassage = async (orderID) => {
    if(!orderID) return;
    try {
      const response = await axios.post(
        `https://localhost:7202/api/Customer/AddNotification`,
        {
          title: "ต้องการชำระรายการด้วยเงินสด",
          message: `ต้องการชำระเงินสด order : ${orderID}`,
          tableID: "T001",
        }
      );
      console.log("response :", response.data.notiItem);
      Swal.fire({
        text: "ระบบจะทำการเรียกพนักงานซักครู่",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.log("ไม่สามารถดึงข้อมูลได้", error);
    }
  };
  return (
    <div>
      <SideBarCustomer />
      <NavbarMenu />
      <div className="mainMenu border border-info">
        <p className="my-3 p-2 fs-3">การชำระเงิน</p>
        <div className="d-flex flex-row">
          <p style={{ fontSize: "1rem", marginRight: "150px" }}>
            รหัสการสั่งอาหาร : {orderData.orderID}
          </p>
          {orderData.paymentStatus === "ยังไม่ได้ชำระ" && (
            <p
              style={{ fontSize: "1rem" }}
              className="border border-danger rounded-3 p-2 text-danger"
            >
              สถานะการชำระเงิน : {orderData.paymentStatus}
            </p>
          )}
          {orderData.paymentStatus === "ชำระเงินสำเร็จ" && (
            <p
              style={{ fontSize: "1rem" }}
              className="border border-success rounded-3 p-2 text-success"
            >
              สถานะการชำระเงิน : {orderData.paymentStatus}
            </p>
          )}
        </div>
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
                {orderData.orderDetailList?.map((itemList) => (
                  <tr>
                    <th>
                      <img
                        src={itemList.imageSrc}
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
                        <p style={{ fontSize: "0.9rem" }}>
                          {itemList.menuName}
                        </p>
                        <p style={{ fontSize: "0.8rem", color: "gray" }}>
                          {itemList.optionValue}
                        </p>
                      </div>
                    </th>
                    <th>{itemList.quantity} ชิ้น</th>
                    <th>{itemList.netprice} บาท</th>
                  </tr>
                ))}
              </tbody>
            </table>
            <Card border="secondary" style={{ width: "35rem" }}>
              <Card.Header style={{ fontSize: "1rem" }}>รายละเอียด</Card.Header>
              <Card.Body>
                {/*<Card.Title>ราคารวม</Card.Title>*/}
                <Card.Text>
                  <div className="d-flex flex-row justify-content-between">
                    <p style={{ fontSize: "0.8rem" }}>
                      จำนวน (
                      {orderData.orderDetailList?.reduce(
                        (totalQuant, currentItem) =>
                          totalQuant + currentItem.quantity,
                        0
                      )}
                      ) รายการ
                    </p>
                    <p style={{ fontSize: "0.8rem", fontWeight: "bold" }}>
                      {orderData.totalPrice} บาท
                    </p>
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                    <p style={{ fontSize: "0.8rem" }}>ภาษีมุลค่าเพิ่ม (7%)</p>
                    <p style={{ fontSize: "0.8rem" }}>
                      {CalculateTax(orderData.totalPrice)} บาท
                    </p>
                  </div>
                  <hr variant="secondary" />
                  <div className="d-flex flex-row justify-content-between">
                    <p style={{ fontSize: "1rem", fontWeight: "bold" }}>
                      ราคาสุทธิ
                    </p>
                    <p style={{ fontSize: "1rem", fontWeight: "bold" }}>
                      {CalculateNetPrice(
                        orderData.totalPrice,
                        orderData.totalPrice * vat
                      ).toFixed(0)}{" "}
                      บาท
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
                className={`rounded-3 d-flex flex-column justify-content-center align-items-center pt-3 mx-3 px-2 text-dark
                  ${optionPay === "QR" ? "active" : " "}`}
                variant="outline-warning"
                style={{ height: "100px" }}
                onClick={() => handleClick("QR")}
              >
                <img
                  src={qrCode}
                  alt="QR code payment"
                  className="img-fluid "
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                  }}
                />
                <p style={{ fontSize: "1rem" }}>QR code</p>
              </Button>
              <Button
                className={`rounded-3 d-flex flex-column justify-content-center align-items-center pt-3 mx-3 px-2 text-dark
                  ${optionPay === "Money" ? "active" : " "}`}
                variant="outline-warning"
                style={{ height: "100px" }}
                onClick={() => handleClick("Money")}
              >
                <img
                  src={money}
                  alt="money payment"
                  className="img-fluid"
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                  }}
                />
                <p style={{ fontSize: "1rem" }}>เงินสด</p>
              </Button>
              <Button
                className={`rounded-3 d-flex flex-column justify-content-center align-items-center pt-3 mx-3 px-2 text-dark
                  ${optionPay === "Point" ? "active" : " "}`}
                variant="outline-warning"
                style={{ height: "100px" }}
                onClick={() => handleClick("Point")}
              >
                <img
                  src={point}
                  alt="point payment"
                  className="img-fluid  "
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
                  <PaymentByPoint
                    tableID={orderData.tableID}
                    totalAmount={orderData.totalPrice}
                    totalTax={CalculateTax(orderData.totalPrice)}
                    orderID={orderData.orderID}
                    netTotalAmount={CalculateNetPrice(
                      orderData.totalPrice,
                      orderData.totalPrice * vat
                    ).toFixed(0)}
                    paymentStatus={orderData.paymentStatus}
                  />
                </div>
              )}
              {optionPay === "QR" && (
                <div>
                  <PaymentByQR
                    tableID={orderData.tableID}
                    totalAmount={orderData.totalPrice}
                    totalTax={CalculateTax(orderData.totalPrice)}
                    orderID={orderData.orderID}
                    netTotalAmount={CalculateNetPrice(
                      orderData.totalPrice,
                      orderData.totalPrice * vat
                    ).toFixed(0)}
                    paymentStatus={orderData.paymentStatus}
                  />
                </div>
              )}
              {optionPay === "Money" && (
                <>
                  <div className="d-flex justify-content-center">
                    <Card
                      variant="Light"
                      bg={"Light".toLowerCase()}
                      key="Light"
                      text={
                        "Light".toLowerCase() === "light" ? "dark" : "white"
                      }
                      style={{ width: "18rem" }}
                      className="mb-2"
                    >
                      <Card.Header>การชำระเงิน ด้วยเงินสด</Card.Header>
                      <Card.Body>
                        <Card.Text style={{ fontSize: "0.9rem" }}>
                          ทำการชำระเงินสด เพื่อทำการเรียกพนักงาน
                          ให้ทำการชำระเงิน
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                  <div className="d-flex justify-content-end">
                    <Button onClick={()=>sentMassage(orderData.orderID)}>กดปุ่มเรียกพนักงาน</Button>
                  </div>
                </>
              )}
            </div>
            <hr variant="secondary" />
            <div className="d-flex justify-content-end">
              {/*} <Button variant="outline-primary" onClick={handleOpenBill}>
                เปิดดูบิล
              </Button>*/}
              {/*<SelectPage/>*/}
              <DropdownButton
                key={"up"}
                id={`dropdown-button-drop-up`}
                drop="up"
                variant="outline-primary"
                title="ใบเสร็จ"
              >
                <Dropdown.Item>
                  <i class="bi bi-stars me-2"></i>เข้าสู่ระบบสะสมคะแนน
                </Dropdown.Item>
                <Dropdown.Item>
                  <i class="bi bi-receipt me-2"></i>เปิดใบเสร็จ
                </Dropdown.Item>
              </DropdownButton>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default PaymentPage;
