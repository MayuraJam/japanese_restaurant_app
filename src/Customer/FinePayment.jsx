import { React, useEffect, useState } from "react";
import SideBarCustomer from "../Component/sideNavigationCustomer";
import "../CSS_file/sideNavigation.css";
import "../CSS_file/selectMenu.css";
import NavbarCustomer from "../Component/navBarCustomer";
import {
  Row,
  Col,
  Card,
  Button,
} from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import Picture2 from "../image/restuarant.jpg";
import "../CSS_file/PaymentOption.css";
import Swal from "sweetalert2";
import PaymentByQR from "../Component/paymentByQR.jsx";
import PaymentByPoint from "../Component/paymentByPoint.jsx";
import qrCode from "../image/icon/qr.png";
import point from "../image/icon/coin.png";
import axios from "axios";
import Receipt from "../Component/billPaper.jsx";
import {QRCode,QRCodeCanvas,QRCodeSVG} from 'qrcode.react';
const generatePayload = require('promptpay-qr');

const FinePaymentPage = ({orderID ,customerID}) => {
  //const { orderID ,customerID} = useParams();
  const vat = 0.07;
  
  const tableID = "T008";
  const [optionPay, setOptionPay] = useState("");
  const [loginOpen, setloginOpen] = useState(false);
  const [registerOpen, setregisterOpen] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [phoneNum,setPhoneNum] = useState('090-984-5033');
  const [amount,setAmount] = useState(1.00);
  const [qrCode1,setqrCode] = useState("sample");

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

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleClick = (value) => {
    const calTotalAmont = parseFloat(CalculateSemiPrice(
      orderData.totalPrice,
      orderData.totalPrice * vat
    ).toFixed(0));

    setAmount(calTotalAmont);

    setOptionPay(value);
    if(value==="QR"){
      setqrCode(generatePayload(phoneNum,{amount:calTotalAmont}));
     }
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

   //คำนวนภาษี
  const CalculateTax = (totalPrice) => {
    var tax = (totalPrice * vat).toFixed(0);
    return tax;
  };

  //คำนวนราคาสุทธิ
  const CalculateNetPrice = (totalPrice, taxPrice) => {
    var net = totalPrice + taxPrice;

    return net;
  };

  //คำนวนครึ่งราคาสุทธิ
  const CalculateSemiPrice = (totalPrice, taxPrice) => {
    var semi = (totalPrice + taxPrice)/2;

    return semi;
  };
  
  return (
    <div>
      {/*<SideBarCustomer customerID={customerID}/>
      <NavbarCustomer customerID={customerID}/>*/}
      <div className="mainMenu">
        <p className="my-3 p-2 fs-3">การชำระค่าปรับ</p>
        <div className="d-flex flex-row">
          <p style={{ fontSize: "1rem", marginRight: "150px" }}>
            รหัสการสั่งอาหาร : {orderData.orderID}
          </p>
          {orderData.paymentStatus === "ยังไม่ได้ชำระ" && (
            <p
              style={{ fontSize: "1rem" }}
              className="border border-danger rounded-3 p-2 text-danger bg-white shadow-sm"
            >
              สถานะการชำระเงิน : {orderData.paymentStatus}
            </p>
          )}
          {orderData.paymentStatus === "ชำระเงินสำเร็จ" && (
            <p
              style={{ fontSize: "1rem" }}
              className="border border-success rounded-3 p-2 text-success bg-white shadow-sm"
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
            className="shadow-sm rounded-2 me-3 p-3 bg-white"
            style={{ minHeight: "440px" }}
          >
           
                <table className="table table-striped ">
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
                  <div className="d-flex flex-row justify-content-between" style={{color:"red"}}>
                    <p style={{ fontSize: "1rem", fontWeight: "bold" }}>
                      ค่าปรับ ทำการชำระค่าอาหารครึ่งหนึ่งของราคาสุทธิ
                    </p>
                    <p style={{ fontSize: "1rem", fontWeight: "bold" }}>
                      {(CalculateSemiPrice(
                        orderData.totalPrice,
                        orderData.totalPrice * vat
                      ))}{" "}
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
            className="shadow-sm p-2  rounded-2 bg-white"
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
                    netTotalAmount={CalculateSemiPrice(
                      orderData.totalPrice,
                      orderData.totalPrice * vat
                    ).toFixed(0)}
                    paymentStatus={orderData.paymentStatus}
                    customerID = {orderData.customerID}
                  />
                </div>
              )}
              {optionPay === "QR" && (
                <div>
                  {orderData.customerID&&(
                    <PaymentByQR
                      tableID={orderData.tableID}
                      totalAmount={orderData.totalPrice}
                      totalTax={CalculateTax(orderData.totalPrice)}
                      orderID={orderData.orderID}
                      netTotalAmount={CalculateSemiPrice(
                        orderData.totalPrice,
                        orderData.totalPrice * vat
                      ).toFixed(0)}
                      paymentStatus={orderData.paymentStatus}
                      customerID  = {orderData.customerID}
                      qrCodePayload = {qrCode1}
                    />

                  )}
                </div>
              )}
              
            </div>
            <hr variant="secondary" />
           <div className="d-flex justify-content-end">
             {orderData.orderID&&(<Receipt orderID={orderData.orderID}/>)}
           </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default FinePaymentPage;
