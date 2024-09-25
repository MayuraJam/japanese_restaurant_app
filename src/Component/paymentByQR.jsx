import { React, useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import QRpic from "../image/QR_payment.jpg";
import "../Customer/PaymentOption.css";
import Swal from "sweetalert2";
import axios from "axios";

const PaymentByQR = () => {
  return (
    <>
      <center>
      <img
        src={QRpic}
        //alt={user.firstName}
        className="img-fluid border border-dark  rounded-2"
        style={{
          width: "240px",
          //width:"100%",
          height: "300px",
          objectFit: "cover",
          alt: "MenuImage",
        }}
      />
      <div className="d-flex justify-content-center mt-3">
        <Button variant="outline-primary">ยืนยันการชำระเงิน</Button>
      </div>
      </center>
    </>
  );
};
export default PaymentByQR;
