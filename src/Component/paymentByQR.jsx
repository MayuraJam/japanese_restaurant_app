import { React, useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import QRpic from "../image/QR_payment.jpg";
import "../CSS_file/PaymentOption.css";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const PaymentByQR = ({
  tableID,
  totalAmount,
  totalTax,
  orderID,
  netTotalAmount,
  paymentStatus
}) => {
  
  const handleConfirmPay = async (
    tableID,
    totalAmount,
    totalTax,
    orderID,
    netTotalAmount
  ) => {
    try {
      const response = await axios.post(
        `https://localhost:7202/api/Customer/AddPayment`,
        {
          orderID: orderID,
          tableID: tableID,
          paymentType: "QR code",
          totalAmount: totalAmount,
          totalFee: totalTax,
          cash: netTotalAmount,
          change: 0,
          netTotalAmount: netTotalAmount,
          staffID: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        }
      );
      console.log("response :", response.data.payItem);
      Swal.fire({
        title: "ชำระเงินสำเร็จ",
        html: `
        <div className="border border-secondary">
        <p style={{ fontSize: "0.8rem", textAlign: "center" }}>ราคาสินค้าทั้งหมด ${totalAmount} บาท</p>
        <p style={{ fontSize: "0.8rem", textAlign: "center" }}>(รวมภาษีมุลค่าเพิ่ม 7% เป็น ${netTotalAmount} บาท)</p>
        <hr variant="secondary" />
        <p>ชำระเงินในรูปแบบ : QR code</p>
        <p>ยอดที่ชำระทั้งหมด : ${netTotalAmount} บาท</p>
        <p>เงินทอน : 0 บาท</p>
        </div>
      
    `,
        icon: "success",
        confirmButtonText: "ไปที่หน้า ติดตามรายการสั่ง",
      });
      //toPage();

    } catch (error) {
      console.log("ไม่สามารถดึงข้อมูลได้",error);
    }
  };
  const navigate = useNavigate();
  const toPage = () => {
    navigate("/Customer/order");
  };
  return (
    <>
      <center>
        <img
          src={QRpic}
          //alt={user.firstName}
          className="img-fluid border border-dark  rounded-2 mb-3"
          style={{
            width: "240px",
            //width:"100%",
            height: "300px",
            objectFit: "cover",
            alt: "MenuImage",
          }}
        />
        <p>ยอดการชำระ : {netTotalAmount} บาท</p>
        <div className="d-flex justify-content-center mt-3">
          <Button
            variant="outline-primary"
            onClick={() =>
              handleConfirmPay(
                tableID,
                totalAmount,
                totalTax,
                orderID,
                netTotalAmount
              )
            }
          disabled={paymentStatus === "ชำระเงินสำเร็จ"}
          >
            ยืนยันการชำระเงิน 
          </Button>
        </div>
      </center>
    </>
  );
};
export default PaymentByQR;
