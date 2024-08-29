import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import Picture2 from "../image/restuarant.jpg";
import { Row, Col, Form } from "react-bootstrap";

function RegisterMember() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [inputFields, setInputFields] = useState({
    fname: "",
    lname: "",
    roleName: "",
    email: "",
    password: "",
    phone: "",
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
  const validateValues = () => {
    let isValid = true;
    const error = {};
    if (!inputFields.email) {
      error.email = "กรุณากรอกอีเมลล์ด้วย";
      isValid = false;
    }
    if (!inputFields.password) {
      error.password = "กรุณากรอกรหัสผ่านด้วย";
      isValid = false;
    } else if (inputFields.password < 5) {
      error.password = "กรุณากรอกรหัสให้มากกว่า 5 ตัวอักษร";
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
      else if (inputFields.phone < 10 || inputFields.phone > 10) {
        error.phone = "กรุณากรอกเบอร์โทรให้ครบ 10 ตัว";
        isValid = false;
      }
    setErrors(error);
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
    const { value } = e.target;
    setInputFields((prevFormData) => ({
      ...prevFormData,
      roleName: value,
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (validateValues()) {
      console.log("Input data : ", inputFields);
      setSubmitting(true);
      Swal.fire({
        text: "คุณกรอกข้อมูลเรียบร้อย",
        icon: "success",
        confirmButtonText: "OK",
      });
      handleClear();
     } else {
    }
  }
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
    });
    setErrors({});
    setSubmitting(false);
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        ลงทะเบียน
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>ลงทะเบียน</Modal.Title>
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
                <Form.Group
                  className="mb-2 me-2"
                  controlId="exampleForm.ControlInput1"
                >
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
                <Form.Group
                  className="mb-2"
                  controlId="exampleForm.ControlInput1"
                >
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
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label style={{ fontSize: "0.8rem", color: "gray" }}>
                  เลือกบทบาท
                </Form.Label>
                <Form.Select
                  className={`${errors.email ? "is-invalid" : ""}`}
                  style={{ width: "350px" }}
                  name="roleName"
                  value={inputFields.roleName}
                  onChange={handleSelect}
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

              <strong>ติดต่อ</strong>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <Form.Group
                  className="mb-2 me-2"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label style={{ fontSize: "0.8rem", color: "gray" }}>
                    อีเมลล์ ต้องเพิ่ม @*
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="กรอกอีเมลล์ ..."
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
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label style={{ fontSize: "0.8rem", color: "gray" }}>
                    รหัสผ่าน*
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="กรอกรหัสผ่าน ..."
                    autoFocus
                    className={`${errors.password ? "is-invalid" : ""}`}
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
                <Form.Group
                  className="mb-2"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label style={{ fontSize: "0.8rem", color: "gray" }}>
                    เบอร์โทรศัพท์
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="กรอกเบอร์โทรศัพท์ ..."
                    autoFocus
                    className={`${errors.email ? "is-invalid" : ""}`}
                    style={{ width: "350px" }}
                    name="phone"
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
