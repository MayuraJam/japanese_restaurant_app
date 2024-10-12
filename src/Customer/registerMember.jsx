import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Picture2 from "../image/restuarant.jpg";
import { Row, Col, Form ,Button,Modal} from "react-bootstrap";
import axios from "axios";
import PasswordFormatGuide from "../Component/passwordSetting";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

function RegisterMember({ isOpen }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(isOpen); //isOpen = true

  const [inputFields, setInputFields] = useState({
    fname: "",
    lname: "",
    roleName: "",
    email: "",
    password: "",
    phone: "",
    jobType: "",
    password2: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const role = [
    {
      roleID: 1,
      roleName: "ลูกค้า",
    },
    {
      roleID: 2,
      roleName: "พนักงาน",
    },
  ];
  const TypeJob = [
    {
      jobTID: 1,
      jobTypeName: "ประจำ",
    },
    {
      jobTID: 2,
      jobTypeName: "ชั่วคราว",
    },
  ];
  const validateValues = () => {
    let isValid = true;
    let emailForm = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    let passwordForm =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    const error = {};
    if (!inputFields.email) {
      error.email = "กรุณากรอกอีเมลล์ด้วย";
      isValid = false;
    } else if (!emailForm.test(inputFields.email)) {
      error.email = "รูปแบบอีเมลล์ของคุณไม่ถูกต้อง";
      isValid = false;
    }
    if (!inputFields.password) {
      error.password = "กรุณากรอกรหัสผ่านด้วย";
      isValid = false;
    } else if (inputFields.password < 8) {
      error.password = "กรุณากรอกรหัสให้มากกว่า 8 ตัวอักษร";
      isValid = false;
    } else if (!passwordForm.test(inputFields.password)) {
      error.password = "รหัสที่คุณตั้งยังไม่มีความปลอดภัยที่เพียงพอ";
      isValid = false;
    }
    if (!inputFields.fname) {
      error.fname = "กรุณากรอกชื่อ";
      isValid = false;
    }
    if (!inputFields.lname) {
      error.lname = "กรุณากรอกนามสกุล";
      isValid = false;
    }
    if (!inputFields.roleName) {
      error.roleName = "กรุณาเลือกบทบาท";
      isValid = false;
    }
    if (!inputFields.phone) {
      error.phone = "กรุณากรอกเบอร์โทรศัพท์";
      isValid = false;
    }
    if(!inputFields.password2){
      error.password2 = "กรุณากรอกรหัสผ่านด้วย";
      isValid = false;
    }
    else if(inputFields.password2 != inputFields.password){
      error.password2 = "รหัสผ่านของคุณไม่ถูกต้อง กรุณากรอกใหม่ด้วยค่ะ";
      isValid = false;
    }

    setErrors(error);
    console.log("error : ", inputFields);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputFields({
      ...inputFields,
      [name]: value,
    });
  };
  const handleSelect = (e) => {
    const { name, value } = e.target;
    setInputFields((prevFormData) => ({
      ...inputFields,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateValues()) {
      console.log("Input data : ", inputFields);
      setSubmitting(true);
      try {
        const response = await axios.post(
          `https://localhost:7202/api/Auth/Register`,
          {
            firstName: inputFields.fname,
            lastName: inputFields.lname,
            phone: inputFields.phone,
            email: inputFields.email,
            password: inputFields.password,
            roleName: inputFields.roleName,
            jobType: inputFields.jobType,
          }
        );
        console.log("response :", response.data);
      } catch (error) {
        console.log("ไม่สามารถดึงข้อมูลได้");
      }
      handleClose();
      Swal.fire({
        text: "คุณกรอกข้อมูลเรียบร้อย",
        icon: "success",
        confirmButtonText: "OK",
      });
      handleClear();
      setShow(false); 
    } else {
    }
  };
  const finishSubmit = () => {
    console.log(inputFields);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit();
    }
  }, [errors]);
  //const isInputValid = Object.keys(errors).length===0;

  const handleClear = () => {
    setInputFields({
      fname: "",
      lname: "",
      roleName: "",
      email: "",
      password: "",
      phone: "",
      jobType: "",
      password2:""
    });
    setErrors({});
    setSubmitting(false);
  };
  return (
    <>
      <Button variant="outline-dark" onClick={handleShow}>
        ลงทะเบียน
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header className="d-flex flex-row justify-content-between">
          <Modal.Title>ลงทะเบียน</Modal.Title>
          <Button variant="outline-dark" onClick={handleClear}>
            ล้างคำตอบทั้งหมด
          </Button>
        </Modal.Header>
        <Modal.Body
          className="border border-dark"
          style={{ maxHeight: "400px", overflowX: "auto" }}
        >
          <img
            src={Picture2}
            //alt={user.firstName}
            className="img-fluid border border-dark mb-3"
            style={{
              width: "800px",
              //width:"100%",
              height: "100px",
              objectFit: "cover",
              backgroundColor: "#ffff",
            }}
          />
          <Form className="needs-validation d-flex flex-column justify-content-center align-items-center">
            <div className="border border-dark rounded-3 p-3">
              <strong>ประวัติส่วนตัว</strong>
              <div className="d-flex flex-row justify-content-center align-items-center">
                <Form.Group className="mb-2 me-2">
                  <Form.Label style={{ fontSize: "0.8rem", color: "gray" }}>
                    ชื่อ*
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="กรอกชื่อ ..."
                    autoFocus
                    className={`${errors.email ? "is-invalid" : ""}`}
                    style={{ width: "350px" }}
                    name="fname"
                    value={inputFields.fname}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <div
                      className="error"
                      style={{ fontSize: "0.8rem", color: "red" }}
                    >
                      {errors.email}
                    </div>
                  )}
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label style={{ fontSize: "0.8rem", color: "gray" }}>
                    นามสกุล*
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="กรอกนามสกุล ..."
                    autoFocus
                    className={`${errors.email ? "is-invalid" : ""}`}
                    style={{ width: "350px" }}
                    name="lname"
                    value={inputFields.lname}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <div
                      className="error"
                      style={{ fontSize: "0.8rem", color: "red" }}
                    >
                      {errors.email}
                    </div>
                  )}
                </Form.Group>
              </div>
              <div className="d-flex flex-row ">
                <Form.Group className="mb-3 me-3">
                  <Form.Label style={{ fontSize: "0.8rem", color: "gray" }}>
                    เลือกบทบาท
                  </Form.Label>
                  <Form.Select
                    className={`${errors.email ? "is-invalid" : ""}`}
                    style={{ width: "350px" }}
                    name="roleName"
                    value={inputFields.roleName}
                    onChange={handleChange}
                  >
                    <option>เลือกบทบาท</option>
                    {role?.map((item) => (
                      <option key={item.roleID} value={item.roleName}>
                        {item.roleName}
                      </option>
                    ))}
                    {errors.password && (
                      <div
                        className="invalid-feedback"
                        style={{ fontSize: "0.8rem", color: "red" }}
                      >
                        {errors.password}
                      </div>
                    )}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label style={{ fontSize: "0.8rem", color: "gray" }}>
                    เลือกรูปแบบงาน (สำหรับพนักงาน)
                  </Form.Label>
                  <Form.Select
                    style={{ width: "350px" }}
                    name="jobType"
                    value={inputFields.jobType}
                    onChange={handleChange}
                  >
                    <option>เลือกประเภทงานที่สมัครไว้</option>
                    {TypeJob?.map((item) => (
                      <option key={item.jobTID} value={item.jobTypeName}>
                        {item.jobTypeName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>

              <strong>ติดต่อ</strong>
              <div className="d-flex flex-row">
              <div className="d-flex flex-column justify-content-start">
                <Form.Group className="mb-2 me-2">
                  <Form.Label style={{ fontSize: "0.8rem", color: "gray" }}>
                    อีเมลล์
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="examplename@mail.com"
                    autoFocus
                    className={`${errors.email ? "is-invalid" : ""}`}
                    style={{ width: "350px" }}
                    name="email"
                    value={inputFields.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <div
                      className="invalid-feedback"
                      style={{ fontSize: "0.8rem", color: "red" }}
                    >
                      {errors.email}
                    </div>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label style={{ fontSize: "0.8rem", color: "gray" }}>
                    ตั้งรหัสผ่าน*
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="กรอกรหัสผ่าน ..."
                    autoFocus
                    className={`${errors.password ? "is-invalid" : ""} me-3`}
                    style={{ width: "350px" }}
                    name="password"
                    value={inputFields.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <div
                      className="error"
                      style={{ fontSize: "0.8rem", color: "red" }}
                    >
                      {errors.password}
                    </div>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label style={{ fontSize: "0.8rem", color: "gray" }}>
                    ยืนยันรหัสผ่าน*
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="กรอกรหัสผ่าน ..."
                    autoFocus
                    className={`${errors.password2 ? "is-invalid" : ""}`}
                    style={{ width: "350px" }}
                    name="password2"
                    value={inputFields.password2}
                    onChange={handleChange}
                  />
                  {errors.password2 && (
                    <div
                      className="error"
                      style={{ fontSize: "0.8rem", color: "red" }}
                    >
                      {errors.password2}
                    </div>
                  )}
                </Form.Group>
              <Form.Group className="mb-2">
                  <Form.Label style={{ fontSize: "0.8rem", color: "gray" }}>
                    เบอร์โทรศัพท์
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="กรอกเบอร์โทรศัพท์ ..."
                    autoFocus
                    className={`${errors.phone ? "is-invalid" : ""}`}
                    style={{ width: "350px" }}
                    name="phone"
                    value={inputFields.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && (
                    <div
                      className="error"
                      style={{ fontSize: "0.8rem", color: "red" }}
                    >
                      {errors.phone}
                    </div>
                  )}
                </Form.Group>
              
              </div>
              <PasswordFormatGuide/>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ยกเลิก
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            ยืนยันการลงทะเบียน
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RegisterMember;
