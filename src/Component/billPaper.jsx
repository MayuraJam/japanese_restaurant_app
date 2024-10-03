import { useState, useEffect, useRef } from "react";
import { Modal, Dropdown, DropdownButton, Button,Col,Row,Form } from "react-bootstrap";
import PaymentPage from "../Customer/paymentPage";
import Mainlogo from "../image/phapirun_logo2.jpg";
import axios from "axios";
import RegisterMember from "../Customer/registerMember";
import Swal from "sweetalert2";
import Picture2 from '../image/restuarant.jpg'

function Receipt({ orderID }) {
  //const printRef = React.useRef();
  const [orderData, setOrderData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

  const handleOpenToModal3 = () => {
    setShow2(false); // Hide Modal2
    setShow3(true);  // Show Modal3
  };
  const handleOpenToModal2 = () => {
    setShow2(true); // Hide Modal3
    setShow3(false);  // Show Modal2
  };
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

  //const handleDownLoadBill = () => {};

  const [inputFields,setInputFields] = useState({
    email:'',
    password:''
 });
 const [errors,setErrors] = useState({});
 const [submitting,setSubmitting] = useState(false);
 
 const validateValues = ()=>{
   let isValid = true;
   const error = {};
   if(!inputFields.email){
     error.email = "กรุณากรอกอีเมลล์ด้วย";
     isValid =false;
   }if(!inputFields.password){
     error.password = "กรุณากรอกรหัสผ่านด้วย";
     isValid =false;
   }
    else if(inputFields.password < 5){
     error.password = "กรุณากรอกรหัสให้มากกว่า 5 ตัวอักษร";
     isValid =false;
    } 
    setErrors(error);
    return isValid;


 };


 const handleChange = (e)=>{
   const {name,value} = e.target;
   setInputFields({
     ...inputFields,[name]:value
   });

 };
 function handleSubmit(e){
    e.preventDefault();
    if(validateValues()){
     console.log("Input data : ",inputFields);
     setSubmitting(true);
     Swal.fire({
       text: "เข้าสู่ระบบการสะสมแต้มคะแนน",
       icon: "success",
       confirmButtonText: "OK",
     });
     handleClear();
     handleOpenToModal3();
    }else{
     console.log(validateValues());
   }
 };
 const finishSubmit=()=>{
   console.log(inputFields);
 };

 useEffect(()=>{
   if(Object.keys(errors).length===0&&submitting){
     finishSubmit();
   }
 },[errors]);
 //const isInputValid = Object.keys(errors).length===0;

 const handleClear=()=>{
   setInputFields({
     email:'',
    password:''
   });
   setErrors({});
   setSubmitting(false);
 }
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

      {/*หน้าระบบสมาชิก*/}
      <Modal show={show2} onHide={handleClose2} centered size="lg">
      <Modal.Header closeButton>
          <Modal.Title>เข้าสู่ระบบสะสมแต้ม</Modal.Title>
        </Modal.Header>
        <Modal.Body >
        <Row>
          <Col xs={5} >
        <img
              src={Picture2}
              //alt={user.firstName}
              className="img-fluid border border-dark mb-3"
              style={{
                width: "350px",
                //width:"100%",
                height: "350px",
                objectFit: "cover",
                backgroundColor: "#ffff",
              }}
            />
          </Col>
          <Col xs={6} style={{marginLeft:'10px'}}>
          <center>
        <img
              //src=''
              //alt={user.firstName}
              className="img-fluid rounded-circle mb-4 mt-3"
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
                backgroundColor: "#ffff",
                border:'5px solid #EB5B00'
              }}
        />
                      <p className=" p-2 mb-2  border rounded-5" style={{backgroundColor:'#FDF2E9',width:'300px',fontSize:'0.8rem'}}>
                        <strong>
                        ชื่อร้านอาหารญี่ปุ่น
                        </strong>
                      </p>
            </center>
          <Form className="needs-validation d-flex flex-column justify-content-center align-items-center">
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Label style={{fontSize:'0.8rem',color:'gray'}}>อีเมลล์ ต้องเพิ่ม @*</Form.Label>
              <Form.Control
                type="email"
                placeholder="กรอกอีเมลล์ ..."
                autoFocus
                className={`${errors.email ? "is-invalid" : ""}`} style={{width:'350px'}}
                name='email'
                onChange={handleChange}
                value={inputFields.email}
              />
              {errors.email && <div className="error" style={{fontSize:'0.8rem',color:'red'}}>{errors.email}</div>}
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label style={{fontSize:'0.8rem',color:'gray'}}>รหัสผ่าน</Form.Label>
              <Form.Control
                type="password"
                placeholder="กรอกรหัสผ่าน ..."
                autoFocus
                className={`${errors.password ? "is-invalid" : ""}`} style={{width:'350px'}}
                name='password'
                onChange={handleChange}
                value={inputFields.password}
              />
              {errors.password && <div className="error" style={{fontSize:'0.8rem',color:'red'}}>{errors.password}</div>}
            </Form.Group>
          </Form>
          </Col>
        </Row>
        </Modal.Body>
        <Modal.Footer>
         <RegisterMember isOpen={true}/>
          {/*
            openRegister == true
          เข้าสู่หน้าการลงทะเบียน */}
          <Button variant="primary" onClick={handleSubmit}>
            เข้าสู่ระบบ
          </Button>
          {/*เข้าสู่หน้าสะสมแต้ม*/}
        </Modal.Footer>
      </Modal>
        {/*เนื่อหาภายในใช้เป็น component */}
      <Modal show={show3} onHide={handleClose3} centered size="lg">
      <Modal.Header closeButton>
          <Modal.Title>ระบบสะสมแต้ม</Modal.Title>
        </Modal.Header>
        <Modal.Body >
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" >
            ออกจากระบบ
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Receipt;
