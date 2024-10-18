import { React, useState, useEffect } from "react";
import {
  Nav,
  Navbar,
  Container,
  Row,
  Col,
  Form,
  NavDropdown,
  Modal,
  Button,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import QuestionModal from "./question";
import Swal from "sweetalert2";
import axios from "axios";
import NotificationModal from "./notificationStaff";
import { useParams } from 'react-router-dom';

const NavbarCustomer = () => {
  const tableID = "T008";
  const { customerID } = useParams();
  const [input, setInput] = useState({
    orderID: "",
    menuName: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [order,setOrder] = useState([]);
  const [order2,setOrder2] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const validateValues = () => {
    let isValid = true;
    const error = {};
    if (!input.orderID) {
      error.email = "กรุณาระบุหมายเลขการสั่งด้วยค่ะ";
      isValid = false;
    }
    setErrors(error);
    return isValid;
  };
  //การส่งข้อความขอความช่วยเหลือ
  const sentMassage = async (massage, orderID, menuName) => {
    console.log("orderID menuName",orderID,menuName);
    if (!massage) return;

    if (!orderID && !menuName) {
      try {
        const response = await axios.post(
          `https://localhost:7202/api/Customer/AddNotification`,
          {
            title: massage,
            message: ``,
            tableID: tableID,
            sentBy : "ลูกค้า",
          }
        );
        console.log("response :", response.data.notiItem);
        Swal.fire({
          html: `คำขอของคุณได้รับการตอบรับแล้วค่ะ <br> กรุณารอสักครู่นะคะ พนักงานกำลังมาค่ะ`,
          icon: "success",
          confirmButtonText: "OK",
        });
      } catch (error) {
        console.log("ไม่สามารถดึงข้อมูลได้", error);
      }
    } else if (!menuName) {
      if (validateValues()) {
        try {
          const response = await axios.post(
            `https://localhost:7202/api/Customer/AddNotification`,
            {
              title: massage,
              message: `หมายเลขการสั่งที่ ${orderID} ยังไม่ได้ทำการเสริฟให้แก่ลูกค้า`,
              tableID: tableID,
              sentBy : "ลูกค้า",
            }
          );
          console.log("response :", response.data.notiItem);
          setSubmitting(true);
          handleClear();
          Swal.fire({
            html: `คำขอของคุณได้รับการตอบรับแล้วค่ะ <br> กรุณารอสักครู่นะคะ พนักงานกำลังมาค่ะ`,
            icon: "success",
            confirmButtonText: "OK",
          });

          setShow(false);
        } catch (error) {
          console.log("ไม่สามารถดึงข้อมูลได้", error);
        }
      }
    } else {
      if (validateValues()) {
        try {
          const response = await axios.post(
            `https://localhost:7202/api/Customer/AddNotification`,
            {
              title: massage,
              message: `หมายเลขการสั่งที่ ${orderID} รายการชื่อว่า " ${menuName} " ยังไม่ได้ทำการเสริฟให้แก่ลูกค้า`,
              tableID: tableID,
              sentBy : "ลูกค้า",
            }
          );
          setShow(false);
          console.log("response :", response.data.notiItem);
          setSubmitting(true);
          handleClear();
          Swal.fire({
            html: `คำขอของคุณได้รับการตอบรับแล้วค่ะ <br> กรุณารอสักครู่นะคะ พนักงานกำลังมาค่ะ`,
            icon: "success",
            confirmButtonText: "OK",
          });
          setShow(false);
        } catch (error) {
          console.log("ไม่สามารถดึงข้อมูลได้", error);
        }
      }
    }
  };
  //การกดส่งเรียบร้อย
  const finishSubmit = () => {
    console.log(input);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit();
    }
  }, [errors]);

  //การเปลี่ยนค่า
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };
 //การล้างคำตอบทั้งหมด
  const handleClear = () => {
    setInput({
      orderID: "",
      menuName: "",
    });
    
    setErrors({});
    setSubmitting(false);
  };

  const handleEnter=async(orderID,event)=>{
    if(event.key === "Enter"){
      try {
        const response = await axios.get(
          `https://localhost:7202/api/Admin/GetOrderByID/${orderID}`
        );
        if(response.data.message === "ไม่พบรายการสั่งของโต๊ะนี้"){
          Swal.fire({
            text: "ไม่พบรายการสั่งของโต๊ะนี้",
            icon: "error",
            confirmButtonText: "OK",
          });
          console.log("ไม่มีข้อมูล");
          return;
        }
        setOrder(response.data.orderItem.orderDetailList);
      } catch (error) {
        console.log("ไม่สามารถดึงข้อมูลได้");
      }
    }
    else{
      return "ไม่มีการ enter"
    }
  } 

  const getOrderID = async()=>{
    console.log("customerID",customerID)
    try {
      const response = await axios.get(
        `https://localhost:7202/api/Customer/GetOrder/${customerID}`
      );
      if(response.data.message === "ไม่พบรายการสั่งของโต๊ะนี้"){
        Swal.fire({
          text: "ไม่พบรายการสั่งของโต๊ะนี้",
          icon: "error",
          confirmButtonText: "OK",
        });
        console.log("ไม่มีข้อมูล");
        return;
      }
      setOrder2(response.data.orders);
    } catch (error) {
      console.log("ไม่สามารถดึงข้อมูลได้",error);
    }
  }

  useEffect(() => {
    getOrderID();
  }, [customerID]);
  return (
    <div>
      <Container
        style={{ marginLeft: "180px", position: "fixed", top: 0, zIndex: 2 }}
      >
        <Row>
          <Col xs={9} style={{ padding: 0 }}>
            <Navbar className="" style={{ backgroundColor: "#EB5B00" }}>
              <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-50">
                    <QuestionModal />
                   
                    <NavDropdown
                      title="ขอความช่วยเหลือ"
                      id="basic-nav-dropdown"
                      onSelect={(eventKey) => {
                        if (eventKey != "#action/3.4") sentMassage(eventKey);
                      }}
                      
                    >
                      <NavDropdown.Item
                        href="#action/3.1"
                        className="p-2"
                        eventKey="ทำความสะอาดโต๊ะ เพิ่มเติม"
                      >
                        ทำความสะอาดโต๊ะ เพิ่มเติม
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="#action/3.2"
                        className="p-2"
                        eventKey="ขออุปกรณ์ในการรับประทานอาหารเพิ่มเติม"
                      >
                        ขออุปกรณ์ในการรับประทานอาหารเพิ่มเติม
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="#action/3.6"
                        className="p-2"
                        eventKey="ขอเปลี่ยนที่นั่งใหม่"
                      >
                        ขอเปลี่ยนที่นั่งใหม่
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="#action/3.3"
                        className="p-2"
                        eventKey="ขอเก้าอี้เสริมสำหรับเด็กเล็ก"
                      >
                        ขอเก้าอี้เสริมสำหรับเด็กเล็ก
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="#action/3.4"
                        className="p-2"
                        onClick={handleShow}
                      >
                        อาหารที่สั่งไว้ยังไม่มา
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="#action/3.5"
                        className="p-2"
                        eventKey="อาหารที่มาเสริฟแล้วไม่ตรงกับที่สั่งมา"
                      >
                        อาหารที่มาเสริฟแล้วไม่ตรงกับที่สั่งมา
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="#action/3.7"
                        className="p-2"
                        eventKey="ช่วยสาธิตวิธีการสั่งอาหารผ่านแอบพลิเคชั่นสั่งอาหาร"
                      >
                        ช่วยสาธิตวิธีการสั่งอาหารผ่านแอบพลิเคชั่นสั่งอาหาร
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </Navbar.Collapse>
                <NotificationModal role={"พนักงาน"} tableID={tableID}/>
              </Container>
            </Navbar>
          </Col>
          <Col xs={3} style={{ padding: 0 }}>
            <Navbar className="" style={{ backgroundColor: "#1A5276" }}>
              <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-50">
                    <button className="btn btn-outline-warning">
                      โต๊ะที่ : {tableID} 
                    </button>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </Col>
        </Row>
      </Container>
      {/*กรอกเลข orderID และชื่ออาหาร */}
      <Modal
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>อาหารที่สั่งไว้ยังไม่มา</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
             {/*} <Form.Control
                type="text"
                placeholder="กรอกหมายเลข orderID"
                autoFocus
                className={`${errors.orderID ? "is-invalid" : ""}`}
                style={{ width: "350px" }}
                name="orderID"
                value={input.orderID}
                onChange={handleChange}
                required
                onKeyDown={(enter)=>handleEnter(input.orderID,enter)}
              />*/}
              <Form.Select  name = "orderID" className="me-4" onChange={handleChange} onKeyDown={(enter)=>handleEnter(input.orderID,enter)} value={input.orderID}>
            {order2?.map((item)=>(
              <option value={item.orderID}>{item.orderID}</option>
            ))}
             </Form.Select>
            </Form.Group>
            {errors.orderID && (
              <div
                className="error"
                style={{ fontSize: "0.8rem", color: "red" }}
              >
                {errors.orderID}
              </div>
            )}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Select  name = "menuName" className="me-4" onChange={handleChange} value={input.menuName}>
            {order?.map((item)=>(
              <option value={item.menuName}>{item.menuName}</option>
            ))}
          </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClear}>
            ล้างคำตอบทั้งหมด
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              sentMassage(
                "อาหารที่สั่งไว้ยังไม่มา",
                input.orderID,
                input.menuName
              );
            }}
          >
            ส่งคำร้องให้แก่พนักงาน
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default NavbarCustomer;
