import { React, useEffect, useState } from "react";
import SideBarCustomer from "../Component/sideNavigationCustomer";
import "../CSS_file/sideNavigation.css";
import "../CSS_file/selectMenu.css";
import NavbarCustomer from "../Component/navBarCustomer";
import "../CSS_file/dataTeble.css";
import { Card, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import NoOrder from '../image/no order.jpg';

const OrderConfirmPage = () => {
  const { customerID } = useParams();

  const navigate = useNavigate();

  const toPage = (orderID,orderStatus) => {
    navigate("/Customer/payment/" + orderID+"/"+customerID);
  };

  const toFinePage = (orderID) => {
    navigate("/Customer/finepayment/" + orderID+"/"+customerID);
  };
  const tableID = "T008";

 // const customerID = "CUS000007";
  const vat = 0.07;
  const [orderData, setOrderData] = useState([]);

  //ดึงข้อมูล order ทั้งหมด
  const fetchingFulldata = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7202/api/Customer/GetOrder/${customerID}`
      );
      console.log("response :", response.data.orders);
      setOrderData(response.data.orders);
    } catch (error) {
      console.log("ไม่สามารถดึงข้อมูลได้");
    }
  };
  useEffect(() => {
    fetchingFulldata();
  }, []);

  const CalculateTax = (totalPrice) => {
    var tax = (totalPrice * vat).toFixed(0);
    return tax;
  };

  const CalculateNetPrice = (totalPrice, taxPrice) => {
    var net = totalPrice + taxPrice;

    return net;
  };

  //วันและเวลา
 //แปลงปป็นเวลา
  const timeOrder = (datetime) => {
    if (datetime) {
      const myArray = datetime.split("T");
      const date = myArray[0];
      const time = myArray[1];
      const timeOnly = time.substring(0, 5);
      return timeOnly;
    } else {
      console.error("orderDate ไม่ถูกกำหนดหรือเป็น undefined");
    }
  };
  //แปลงปป็นวันที่
  const dateOrder = (datetime) => {
    if (datetime) {
      const formattedDate = new Date(datetime);
      const thaiFormatDate = formattedDate.toLocaleDateString("th-TH", {
        month: "long",
        day: "numeric",
        year: "numeric",
        weekday: "long",
      });
      return thaiFormatDate;
    } else {
      console.error("orderDate ไม่ถูกกำหนดหรือเป็น undefined");
    }
  };

  //การยกเลิก order
  const handleCancelOrder = async (orderID) => {
    console.log("order inside",orderID)
    if (!orderID) return;
    Swal.fire({
      title: "คุณต้องการยกเลิกรายการสั่งนี้ทั้งหมดใช่หรือไม่",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่ ต้องการยกเลิกรายการสั่งนี้ทั้งหมด",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.put(
            `https://localhost:7202/api/Customer/CancleOrder/${orderID}`
          );
          console.log("response :", response.data.message);
          //setOrderData(response.data.orders);
          fetchingFulldata(customerID);
          //toFinePage(orderID,customerID);
          try {
            const response = await axios.post(
              `https://localhost:7202/api/Customer/AddNotification`,
              {
                title: "ยกเลิกรายการสั่ง",
                message: `หมายเลข order ที่ทำการยกเลิกคือ : "${orderID}"`,
                tableID: tableID,
                sentBy : "ลูกค้า",
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
          toPage(orderID,customerID);
        } catch (error) {
          console.log("ไม่สามารถดึงข้อมูลได้");
        }
        Swal.fire({
          title: "ยกเลิกรายการสั่งนี้ทั้งหมด",
          icon: "success",
        });
      }
    });
  };

  //การเปลี่ยนสีตามสถานะ
  const selectColorStatus = (orderStatus) => {
    if (!orderStatus) {
      return (
        <>
          <p
            style={{ fontSize: "0.9rem" }}
            className="bg-white text-dark p-2 border rounded-5 d-flex justify-content-center"
          >
            รายการไม่มีสถานะ
          </p>
        </>
      );
    } else if (orderStatus === "รายการกำลังทำการจัดเตรียมวัตถุดิบ") {
      return (
        <p
          style={{ fontSize: "0.8rem" }}
          className="bg-secondary text-white p-2 border rounded-5 d-flex justify-content-center"
        >
          {orderStatus}...
        </p>
      );
    } else if (orderStatus === "กำลังปรุง") {
      return (
        <p
          style={{ fontSize: "0.9rem" }}
          className="bg-warning p-2 border rounded-5 d-flex justify-content-center"
        >
          {orderStatus}
        </p>
      );
    } else if (orderStatus === "ปรุงสำเร็จ") {
      return (
        <p
          style={{ fontSize: "0.9rem" }}
          className="bg-info p-2 border rounded-5 d-flex justify-content-center"
        >
          {orderStatus}
        </p>
      );
    } else if (orderStatus === "กำลังเสริฟ") {
      return (
        <p
          style={{ fontSize: "0.9rem" }}
          className="bg-success p-2 border rounded-5 d-flex justify-content-center text-white"
        >
          {orderStatus}
        </p>
      );
    } else if (
      orderStatus === "เมนูนี้ถูกยกเลิกโดยพนักงานเนื่องจาก มีบางอย่างผิดปกติ" ||
      orderStatus === "รายการถูกยกเลิก"
    ) {
      return (
        <p
          style={{ fontSize: "0.8rem" }}
          className="bg-danger text-white p-2 border rounded-5 d-flex justify-content-center"
        >
          {orderStatus}
        </p>
      );
    } else if (orderStatus === "เสริฟแล้ว") {
      return (
        <p
          style={{ fontSize: "0.9rem" }}
          className="bg-primary p-2 border rounded-5 d-flex justify-content-center text-white"
        >
          {orderStatus}
        </p>
      );
    }
  };

  //ไปที่หน้าชำระเงิน
  const GotoPayPage = (orderID, orderStatus) => {
    console.log("orderID :", orderID, "orderStatus : " + orderStatus);
    if (!orderID && orderStatus) return;
    if (orderStatus === "ไม่สำเร็จ") {
      Swal.fire({
        icon: "error",
        title: "อาหารยังมาเสริฟไม่ครบ จึงไม่สามารถทำการชำระเงินได้",
      });
    } else {
      toPage(orderID,customerID);
    }
  };



  return (
    <div>
       <SideBarCustomer customerID={customerID}/>
       <NavbarCustomer customerID={customerID}/>
      <div className="mainMenu">
        <p
          className="my-3 border border-dark  p-3 rounded-5 d-flex justify-content-center"
          style={{
            maxWidth: "220px",
            backgroundColor: "#4A4947",
            color: "#F9E79F",
          }}
        >
          ติดตามรายการอาหาร
        </p>
        {orderData.length === 0 ? (
          <div
            className="p-3 rounded-3 bg-white mb-4 d-flex justify-content-center align-items-center shadow-sm"
            style={{ height: "425px", border: "1px solid #EB5B00" }}
          >
            <center>
            <img
                src={NoOrder}
                alt="ภาพประกอบ"
                className="img-fluid mb-3 "
                style={{
                  width: "250px",
                  //width:"100%",
                  height: "280px",
                  backgroundColor: "#ffff",
                }}
              />
            <p style={{ textAlign: "center" }}>ไม่พบรายการสั่ง</p>
            </center>
          </div>
        ) : (
          orderData?.map((item) => (
            <div
              className="p-3 rounded-3 bg-white mb-4 shadow-sm"
              style={{ Height: "525px", border: "1px solid #EB5B00" }}
            >
              <div>
                <div className="d-flex flex-row justify-content-between ">
                  <div className="d-flex flex-column m-0 ">
                    <p style={{ fontSize: "1rem", color: "#EB5B00" }}>
                      รหัสการสั่งอาหาร : {item.orderID}
                    </p>
                    <div className="d-flex flex-row justify-content-around">
                      <p
                        style={{ fontSize: "0.8rem", color: "gray" }}
                        className="me-3"
                      >
                        {dateOrder(item.orderDate)}
                      </p>

                      <p style={{ fontSize: "0.8rem", color: "gray" }}>
                        {timeOrder(item.orderDate)} น.
                      </p>
                    </div>
                  </div>

                  <div className="d-flex flex-column align-items-center">
                    { item.orderStatus === "ดำเนินรายการสำเร็จ" && (
                    <p
                      style={{ fontSize: "0.8rem" }}
                      className="me-3 text-success"
                    >
                      <i class="bi bi-check-circle me-2"></i>สถานะของรายการ : {item.orderStatus}
                    </p>
                    )
                    }
                     { item.orderStatus === "รายการถูกยกเลิก" && (
                    <p
                      style={{ fontSize: "0.8rem" }}
                      className="me-3 text-danger"
                    >
                      <i class="bi bi-x-circle me-2"></i>สถานะของรายการ : {item.orderStatus}
                    </p>
                    )
                    }
                    
                  </div>
                </div>
                <hr variant="secondary" />
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th style={{ width: "10%" }}>ภาพเมนู</th>
                      <th style={{ width: "10%" }}>ชื่อเมนู</th>
                      <th style={{ width: "10%" }}>จำนวน</th>
                      <th style={{ width: "10%" }}>ราคา</th>
                      <th style={{ width: "10%" }}>สถานะ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.orderDetailList?.map((itemList) => (
                      <tr>
                        <th>
                          <img
                            src={itemList.imageSrc}
                            alt={itemList.imageSrc}
                            className="img-fluid border border-dark rounded-2"
                            style={{
                              width: "50px",
                              //width:"100%",
                              height: "50px",
                              objectFit: "cover",
                              alt: "MenuImage",
                            }}
                          />
                        </th>
                        <th>
                          <div className="d-flex flex-column m-0">
                            <p style={{ fontSize: "0.9rem" }}>
                              {itemList.menuName}
                            </p>
                            <p style={{ fontSize: "0.8rem", color: "gray" }}>
                              {itemList.optionValue}
                            </p>
                          </div>
                        </th>
                        <th>{itemList.quantity}</th>
                        <th>
                          <div style={{ fontSize: "0.9rem" }}>
                            {itemList.netprice} บาท
                          </div>
                        </th>
                        <th>{selectColorStatus(itemList.orderDetailStatus)}</th>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="d-flex justify-content-between">
                  <div>
                    {item.paymentStatus === "ยังไม่ได้ชำระ" ? (
                      <p
                        style={{
                          fontSize: "0.8rem",
                          maxWidth: "200px",
                          color: "red",
                        }}
                        className="border border-danger p-1 "
                      >
                        สถานะการชำระเงิน : {item.paymentStatus}
                      </p>
                    ) : (
                      <p
                        style={{
                          fontSize: "0.8rem",
                          maxWidth: "200px",
                          color: "green",
                        }}
                        className="border border-success p-1 bg-warning"
                      >
                        สถานะการชำระเงิน : {item.paymentStatus}
                      </p>
                    )}
                  </div>
                  <Card border="light" style={{ width: "25rem" }} 
                  
                  >
                    <Card.Header>รายละเอียด</Card.Header>
                    <Card.Body>
                      {/*<Card.Title>ราคารวม</Card.Title>*/}
                      <Card.Text>
                        <div className="d-flex flex-row justify-content-between">
                          <p style={{ fontSize: "1rem" }}>
                            จำนวน (
                            {item.orderDetailList.reduce(
                              (totalQuant, currentItem) =>
                                totalQuant + currentItem.quantity,
                              0
                            )}
                            ) รายการ
                          </p>
                          <p>{item.totalPrice} บาท</p>
                        </div>
                        <div className="d-flex flex-row justify-content-between">
                          <p style={{ fontSize: "1rem" }}>
                            ภาษีมุลค่าเพิ่ม (7%)
                          </p>
                          <p style={{ fontSize: "1rem" }}>
                            {CalculateTax(item.totalPrice)} บาท
                          </p>
                        </div>

                        <div className="d-flex flex-row justify-content-between">
                          <p style={{ fontSize: "1.3rem", color: "#EB5B00" }}>
                            ราคาสุทธิ{" "}
                          </p>
                          <p style={{ fontSize: "1.3rem", color: "#EB5B00" }}>
                            {CalculateNetPrice(
                              item.totalPrice,
                              item.totalPrice * vat
                            ).toFixed(0)}{" "}
                            บาท
                          </p>
                        </div>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
                <div className="d-flex justify-content-end">
                  <Button
                    variant="outline-danger"
                   /* className={`${
                      item.confirmOrder !== "ยังไม่อนุมัติ" ||
                      item.orderDetailList.orderDetailStatus ===
                        "รายการกำลังทำการจัดเตรียมวัตถุดิบ"
                        ? "disabled"
                        : ""
                    } me-3`}*/
                    className={`${
                      item.orderStatus === "ดำเนินรายการสำเร็จ" || 
                      item.orderDetailList.orderDetailStatus === 
                        "เสริฟแล้ว" 
                      || item.orderStatus === 
                      "รายการถูกยกเลิก" 
                      
                        ? "disabled"
                        : ""
                    } me-3`}
                    onClick={() => handleCancelOrder(item.orderID)}
                  >
                    <i class="bi bi-coin me-2"></i>ยกเลิกรายการสั่งนี้ทั้งหมด
                  </Button>

                  <Button
                    variant="outline-primary"
                    onClick={() => GotoPayPage(item.orderID, item.orderStatus)}
                    disabled={item.confirmOrder === "ยกเลิกรายการสั่งนี้"}
                  >
                    <i class="bi bi-coin me-2"></i>ชำระเงิน
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default OrderConfirmPage;
