import { useState, useEffect, useRef } from "react";
import { Modal, Dropdown, DropdownButton, Button } from "react-bootstrap";
import PaymentPage from "../Customer/paymentPage";
import Mainlogo from "../image/phapirun_logo2.jpg";
import axios from "axios";
function Receipt({ orderID }) {
  //const printRef = React.useRef();
  const [orderData, setOrderData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  //ดึง 2 ตารางคือ การเงินและorder
  const fetchingOrderdata = async (orderID) => {
    try {
      const response = await axios.get(
        `https://localhost:7202/api/Admin/GetOrderByID/${orderID}`
      );
      const response2 = await axios.get(
        `https://localhost:7202/api/Customer/GetPyment/${orderID}`
      );
      console.log("response :", response.data.orderItem);
      setOrderData(response.data.orderItem);
      console.log("response2 :", response2.data.payItem);
      setPaymentData(response2.data.payItem);
    } catch (error) {
      console.log("ไม่สามารถดึงข้อมูลได้", error);
    }
  };
  useEffect(() => {
    console.log(orderID);
    if (orderID) {
      fetchingOrderdata(orderID);
    }
  }, [orderID]);

  //วันและเวลา

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
  const payList = [
    {
      key: 0,
      title: "จำนวนทั้งหมด :",
      value: `${orderData.orderDetailList?.reduce(
        (totalQuant, currentItem) => totalQuant + currentItem.quantity,
        0
      )} รายการ`,
    },
    {
      key: 1,
      title: "ราคาไม่รวมภาษี :",
      value: `${paymentData.totalAmount} บาท`,
    },
    {
      key: 2,
      title: "ภาษีมุลค่าเพิ่ม (7%) :",
      value: `${paymentData.totalTax} บาท`,
    },
    {
      key: 3,
      title: "ราคาสุทธิ :",
      value: `${paymentData.netTotalAmount} บาท`,
    },
    {
      key: 4,
      title: "เงินที่รับเข้ามา :",
      value: `${paymentData.cash} บาท`,
    },
    {
      key: 5,
      title: "เงินทอน :",
      value: `${paymentData.change} บาท`,
    },
  ];

  const handleDownLoadBill = () => {};
  return (
    <>
      <DropdownButton
        key={"up"}
        id={`dropdown-button-drop-up`}
        drop="up"
        variant="outline-primary"
        title="ใบเสร็จ"
      >
        <Dropdown.Item onClick={handleShow2}>
          <i class="bi bi-stars me-2"></i>เข้าสู่ระบบสะสมคะแนน
        </Dropdown.Item>
        <Dropdown.Item onClick={handleShow}>
          <i class="bi bi-receipt me-2"></i>เปิดใบเสร็จ
        </Dropdown.Item>
      </DropdownButton>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>ใบเสร็จ</Modal.Title>
        </Modal.Header>
        {/*ใบเสร็จ*/}{" "}
        {paymentData.length === 0 ? (
          <Modal.Body>
            <p>ไม่พบข้อมูลใบเสร็จ</p> {/* แสดงข้อความเมื่อไม่มีข้อมูล */}
          </Modal.Body>
        ) : (
          <>
            <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
              <div style={{ backgroundColor: "#F9E79F" }} className="p-2">
                <div style={{ textAlign: "center", fontSize: "0.7rem" }}>
                  <img
                    src={Mainlogo}
                    className="img-fluid rounded-circle my-3"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "contain ",
                      backgroundColor: "#ffff",
                    }}
                  />
                  <p>ใบกำกับภาษีอย่างย่อ/ใบเสร็จรับเงิน</p>
                  <p>บริษัท ร้านอาหารญี่ปุ่นไดโกกุ จำกัด</p>
                  <p>เลขที่ 123 ชั้น 3 ห้างสรรพสินค้าเซนทรัลศรีราชา</p>
                  <p>ถ.สุขุมวิท อำเภอศรีราชา ชลบุรี 20110</p>
                </div>
                <hr />
                <div
                  className="d-flex justify-content-between"
                  style={{ fontSize: "0.7rem" }}
                >
                  <p>วันที่ : {dateOrder(paymentData.payDatetime)}</p>
                  <p>เวลา : {timeOrder(paymentData.payDatetime)} น.</p>
                </div>
                <div
                  className="d-flex justify-content-between"
                  style={{ fontSize: "0.7rem" }}
                >
                  <p>เลขใบเสร็จ : {paymentData.receiptID}</p>
                  <p>ชำระด้วย : {paymentData.paymentType}</p>
                  <p>หมายเลขโต๊ะ : {paymentData.tableID}</p>
                </div>
                <p style={{ fontSize: "0.7rem" }}>
                  รหัสลูกค้า : {paymentData.customerID}
                </p>
                <p style={{ fontSize: "0.9rem" }}>รายการ :</p>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th style={{ fontSize: "0.9rem" }}>จำนวน</th>
                      <th style={{ fontSize: "0.9rem" }}>ชื่อเมนู</th>
                      <th style={{ fontSize: "0.9rem" }}>ราคารวม</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderData.orderDetailList?.map((item) => (
                      <tr key={item.menuName}>
                        <th style={{ fontSize: "0.8rem" }}>{item.quantity}</th>
                        <th style={{ fontSize: "0.8rem" }}>{item.menuName}</th>
                        <th style={{ fontSize: "0.8rem" }}>{item.netprice}</th>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <hr />
                {payList?.map((item) => (
                  <div
                    className="d-flex justify-content-between"
                    style={{ fontSize: "0.7rem" }}
                    key={item.title}
                  >
                    <p>{item.title}</p>
                    <p style={{ fontWeight: "bold" }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </Modal.Body>
          </>
        )}
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            <i class="bi bi-download me-2"></i>
            บันทึกใบเสร็จ
          </Button>
          {/*<div ref={printRef}></div>*/}
        </Modal.Footer>
      </Modal>

      {/*เข้าสู่ระบบสมาชิก*/}
      <Modal show={show2} onHide={handleClose2} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose2}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Receipt;
