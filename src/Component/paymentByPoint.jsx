import { React, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import Picture2 from "../image/restuarant.jpg";
import "../CSS_file/PaymentOption.css";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PaymentByPoint = ({
  tableID,
  totalAmount,
  totalTax,
  orderID,
  netTotalAmount,
  paymentStatus,
  customerID,
}) => {
  /* const navigate = useNavigate();
       const toPage = (staftID) => {
         navigate("/Admin/table/"+staftID);
       }*/
  const [inputFields, setInputFields] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const [pointData, setPointData] = useState([]);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateValues()) {
      console.log("Input data : ", inputFields);

      try {
        const response = await axios.post(
          `https://localhost:7202/api/Auth/LoginCustomerMember`,
          {
            email: inputFields.email,
            password: inputFields.password,
            roleName: "ลูกค้า",
            totalPrice: netTotalAmount,
            pointType: "ลดคะแนน",
          }
        );
        var logindata = response.data;

        if (logindata.message === "ไม่พบบัญชีผู้ใช้งานรายนี้") {
          Swal.fire({
            title: "ไม่พบบัญชีผู้ใช้งานรายนี้",
            text: "กรุณาใส่ email และ password ใหม่ด้วยค่ะ",
            icon: "error",
            confirmButtonText: "OK",
          });
        } else if (logindata.message === "แต้มคะแนนไม่เพียงพอ") {
          Swal.fire({
            title: "แต้มสะสมไม่เพียงพอ",
            html: `<p>
                  แต้มสะสมที่คุณมี มีเพียง ${logindata.pesentpoint} คะแนน
               </p>
               <p>** ซึ่งไม่เพียงพอต่อการชำระสินค้า **</p>
               `,
            icon: "error",
            confirmButtonText: "OK",
          });
        } else if (logindata.pesentpoint === 0) {
          console.log(response.data);
          setLogin(true);
          setPointData(response.data.customerList[0]);
        }
      } catch (error) {
        setLogin(false);
        Swal.fire({
          title: "ไม่พบบัญชีผู้ใช้งานรายนี้",
          text: "กรุณาใส่ email และ password ใหม่ด้วยค่ะ",
          icon: "error",
          confirmButtonText: "OK",
        });
        console.error("Error fetching data:", error);
      }
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
      email: "",
      password: "",
    });
    setErrors({});
    setSubmitting(false);
  };

  const handleConfirmPay = async (
    tableID,
    totalAmount,
    totalTax,
    orderID,
    netTotalAmount,
    customerID
  ) => {
    try {
      const response = await axios.post(
        `https://localhost:7202/api/Customer/AddPayment`,
        {
          orderID: orderID,
          tableID: tableID,
          paymentType: "แต้มคะแนน",
          totalAmount: totalAmount,
          totalFee: totalTax,
          cash: netTotalAmount,
          change: 0,
          netTotalAmount: netTotalAmount,
          staffID: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          customerID: customerID,
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
        <p>ชำระเงินในรูปแบบ : แต้มคะแนน </p>
        <p>ยอดที่ชำระทั้งหมด : ${netTotalAmount} บาท</p>
        <p>เงินทอน : 0 บาท</p>
        </div>
      
    `,
        icon: "success",
        confirmButtonText: "ไปที่หน้า ติดตามรายการสั่ง",
      });
      //toPage();
    } catch (error) {
      console.log("ไม่สามารถดึงข้อมูลได้", error);
    }
  };
  return (
    <div className="container">
      {isLogin ? (
        <div>
          <div className="d-flex flex-column align-items-center justify-content-center">
            <Card
              border="light"
              className="shadow-sm mb-4"
              style={{ width: "18rem" }}
            >
              <Card.Header>
                <i class="bi bi-stars "></i>การชำระด้วยแต้มคะแนน
                <i class="bi bi-stars"></i>
              </Card.Header>
              <Card.Body>
                <Card.Title style={{ fontSize: "1rem", color: "blue" }}>
                  ข้อมูลของผู้สะสมแต้ม
                </Card.Title>
                <Card.Text style={{ fontSize: "0.8rem" }}>
                  <p>
                    ชื่อ : {pointData.firstname} {pointData.lastname}
                  </p>
                  <p>เบอร์โทรศัพท์ : {pointData.phone}</p>
                </Card.Text>
                <hr />
                <Card.Text style={{ fontSize: "0.8rem" }}>
                  <p
                    className="p-3 text-danger"
                    style={{
                      fontSize: "2rem",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    - {netTotalAmount} คะแนน
                  </p>
                  <div >
                  <p
                    style={{
                      color: "#424242",
                      backgroundColor: "#C0C78C",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                    className="p-1 rounded-4 "
                  >
                    คะแนนคงเหลือ : {pointData.totalPoint} คะแนน
                  </p>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
            <Button
              variant="outline-primary"
              onClick={() =>
                handleConfirmPay(
                  tableID,
                  totalAmount,
                  totalTax,
                  orderID,
                  netTotalAmount,
                  customerID
                )
              }
              disabled={paymentStatus === "ชำระเงินสำเร็จ"}
            >
              ยืนยันการชำระเงิน
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <p>เข้าสู่ระบบการสะสมแต้มของคุณ</p>
          <form
            className="needs-validation d-flex flex-column justify-content-center align-items-center"
            onSubmit={handleSubmit}
          >
            <div className="form-group mb-2">
              <label
                htmlFor="title"
                className="form-label"
                style={{ fontSize: "0.8rem", color: "gray" }}
              >
                อีเมลล์ ต้องมี @ ด้วย *
              </label>
              <input
                type="email"
                name="email"
                value={inputFields.email}
                onChange={handleChange}
                placeholder="examplename@mail.com"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                style={{ width: "350px" }}
              />
              {errors.email && (
                <div
                  className="error"
                  style={{ fontSize: "0.8rem", color: "red" }}
                >
                  {errors.email}
                </div>
              )}
            </div>
            <div className="form-group mb-4">
              <label
                htmlFor="title"
                className="form-label"
                style={{ fontSize: "0.8rem", color: "gray" }}
              >
                รหัสผ่าน *
              </label>
              <input
                type="password"
                name="password"
                value={inputFields.password}
                onChange={handleChange}
                placeholder="ใส่รหัสผ่านของคุณ"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                style={{ width: "350px" }}
              />
              {errors.password && (
                <div
                  className="error"
                  style={{ fontSize: "0.8rem", color: "red" }}
                >
                  {errors.password}
                </div>
              )}
            </div>
            <div>
              <Button
                variant="outline-success"
                className="mx-3"
                onClick={handleSubmit}
                type="submit"
                style={{ cursor: "pointer", width: "300px" }}
                disabled={paymentStatus === "ชำระเงินสำเร็จ"}
              >
                เข้าสู่ระบบ
              </Button>
              {/*<LoginMember/>*/}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
export default PaymentByPoint;
