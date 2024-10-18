import { React, useState, useEffect } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from "sweetalert2";
import axios from "axios";

const ReviewPage = ({
  orderID,
  menuName,
  image,
  menuID,
  customerID,
 
}) => {
  
  const [rating, setRating] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [orderData, setOrderData] = useState([]);
  const handleSubmit = async (customerID, menuID, rate, orderID) => {
    console.log("rating data", customerID, menuID, rate, orderID);
    try {
      const response = await axios.post(
        `https://localhost:7202/api/Customer/AddReview`,
        {
          rate: rate,
          menuID: menuID,
          customerID: customerID,
          orderID: orderID,
        }
      );
      console.log("บันทึกข้อมูลเรียบร้อย");
      await fetchingFulldata(orderID);
      handleClose();
      setRating(0);
      Swal.fire({
        text: "คุณทำการให้คะแนนเรียบร้อย",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.log("ไม่สามารถส่งขอมูลได้ เนื่องจาก", error);
    }
  };

  const fetchingFulldata = async (orderID) => {
    if (!orderID) return;
    try {
      const response = await axios.get(
        `https://localhost:7202/api/Admin/GetOrderByID/${orderID}`
      );
      console.log("response 34:", response.data.orderItem);
      setOrderData(response.data.orderItem);
    } catch (error) {
      console.log("ไม่สามารถดึงข้อมูลได้", error);
    }
  };
  useEffect(() => {
    fetchingFulldata(orderID);
  }, [orderID]);

  const addReviewValue = "รีวิวแล้ว";
  const index = orderData?.orderDetailList?.findIndex(
    (item) => item.addReview === addReviewValue
  );

  return (
    <>
      {index !== -1 ? (
        <Button variant="outline-success me-4" onClick={handleShow} disabled>
          <i className="bi bi-check-circle me-2"></i> รีวิวเรียบร้อย
        </Button>
      ) : (
        <Button variant="outline-success me-4" onClick={handleShow}>
          <i className="bi bi-star me-2"></i> ให้คะแนน
        </Button>
      )}

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#1A5276", color: "#F9E79F" }}
        >
          <Modal.Title>
            <i class="bi bi-stars me-2"></i>ให้คะแนน
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#FEF9D9" }}>
          <center>
            <div
              style={{
                MaxWidth: "700px",
                height: "100px",
                border: "1px solid #EB5B00",
              }}
              className="shadow-sm rounded-3 p-3 bg-white"
            >
              <div className="d-flex flex-row align-items-center justify-content-between">
                <div className="d-flex flex-row align-items-center ">
                  <img
                    src={image}
                    //alt={user.firstName}
                    className="img-fluid border border-dark mb-3 me-3 rounded-3"
                    style={{
                      width: "60px",
                      //width:"100%",
                      height: "60px",
                      objectFit: "cover",
                      backgroundColor: "#ffff",
                    }}
                  />
                  <h4 style={{ color: "#EB5B00" }}>{menuName}</h4>
                </div>
                <div className="d-flex flex-column align-items-between">
                  <p style={{ fontSize: "0.9rem", color: "gray" }}>
                    หมายเลขรายการอาหาร : {orderID}{" "}
                  </p>
                </div>
              </div>
            </div>
          </center>
          <div>
            <p className="my-4" style={{ fontSize: "1rem" }}>
              <i class="bi bi-star me-2"></i>
              ส่วนของการให้คะแนนความพึ่งพอใจของท่านลูกค้าขอรับ
            </p>
            <center>
              <div
                style={{
                  MaxWidth: "600px",
                  height: "80px",
                  border: "1px solid #EB5B00",
                }}
                className="shadow-sm rounded-3 mb-4 d-flex align-items-center justify-content-center bg-white"
              >
                {[1, 2, 3, 4, 5].map((star) => {
                  return (
                    <span
                      className="start"
                      style={{
                        cursor: "pointer",
                        color: rating >= star ? "gold" : "gray",
                        fontSize: `35px`,
                        marginRight: "20px",
                      }}
                      onClick={() => {
                        setRating(star);
                      }}
                    >
                      {"   "}★{"   "}
                    </span>
                  );
                })}
              </div>
            </center>
            <Alert variant="success" style={{ fontSize: "0.7rem" }}>
              ขอขอบคุณทุกๆคะแนนที่ท่านลูกค้าส่งมาขอรับ
              พวกเราจะนำคะแนนที่ได้รับมาในแต่ละเมนูไปปรับปรุงสูตรอาหารให้ถูกใจคุณลูกค้ามากยิ่งขึ้นขอรับ
              <br />
              ขอบคุณสำหรับทุกคะแนนขอรับ
            </Alert>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#1A5274" }}>
          <Button
            variant="warning"
            onClick={() => {
              handleSubmit(customerID, menuID, rating, orderID);
            }}
          >
            <i class="bi bi-star me-2"></i>ให้คะแนน
          </Button>
        </Modal.Footer>
      </Modal>
      {/*<SideBarCustomer />
      <NavbarCustomer />
      <div
        className="mainMenu border border-info p-3"
        style={{ height: "calc(100vh - 50px)" }}
      >
        <h4 className="my-3">ให้คะแนนและเขียนรีวิว</h4>
        <center>
          <div
            style={{ width: "800px", height: "100px" }}
            className="border border-dark rounded-3 p-3 bg-white" 
          >
            <div className="d-flex flex-row align-items-center justify-content-between">
              <div className="d-flex flex-row align-items-center ">
                <img
                  src={"Picture2"}
                  //alt={user.firstName}
                  className="img-fluid border border-dark mb-3 me-3"
                  style={{
                    width: "60px",
                    //width:"100%",
                    height: "60px",
                    objectFit: "cover",
                    backgroundColor: "#ffff",
                  }}
                />
                <h4>ชื่ออาหาร</h4>
              </div>
              <div className="d-flex flex-column align-items-between">
                <p style={{ fontSize: "0.9rem", color: "gray" }}>
                  หมายเลขรายการอาหาร : xxx{" "}
                </p>
                <p
                  style={{ fontSize: "0.9rem" }}
                  className="border border-info rounded-5"
                >
                  ประเภทเมนู
                </p>
              </div>
            </div>
          </div>
        </center>
        <div>
          <h5 className="my-4">ส่วนของการให้คะแนนความพึ่งพอใจ</h5>
          <center>
            <div
              style={{ width: "600px", height: "80px" }}
              className="border border-dark rounded-3 mb-4 d-flex align-items-center justify-content-center bg-white"
            >
              {[1, 2, 3, 4, 5].map((star) => {
                return (
                  <span
                    className="start"
                    style={{
                      cursor: "pointer",
                      color: rating >= star ? "gold" : "gray",
                      fontSize: `35px`,
                      marginRight: "20px",
                    }}
                    onClick={() => {
                      setRating(star);
                    }}
                  >
                    {"   "}★{"   "}
                  </span>
                );
              })}
            </div>
          </center>
        </div>
        <center>
          <div
            style={{ width: "600px", height: "180px" }}
            className="border border-dark rounded-3 mb-4 p-2 bg-white"
          >
            <h5><i class="bi bi-pen me-2"></i>ส่วนของการเขียนรีวิว</h5>
            <div className="d-flex align-items-center justify-content-center">
            <form>
              <textarea
                rows="4"
                cols="65"
                placeholder="พิมพ์ข้อความที่นี่..."
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  resize: "none", // ปิดการปรับขนาดของ textarea
                  marginRight:'10px',
                  fontSize:'1rem'
                }}
              />
            </form>
            <div className="btn btn-outline-info"><i class="bi bi-send"></i></div>
            </div>
          </div>
        </center>
      </div>*/}
    </>
  );
};
export default ReviewPage;
