import { React, useEffect, useState } from "react";
import {Button } from "react-bootstrap";
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
  paymentStatus
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
  const [isLogin,setLogin] = useState(false);
  const [pointData,setPointData] = useState([]);
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
  const handleSubmit = async (e)=>{
    e.preventDefault();
if (validateValues()) {
      console.log("Input data : ", inputFields);
      
      try {
      const response = await axios.post(
          `https://localhost:7202/api/Auth/LoginCustomerMember`,
          {
            email:inputFields.email,
            password : inputFields.password,
            roleName : "ลูกค้า",
            totalPrice : netTotalAmount,
            pointType :"ลดคะแนน"
          }
        );
     var logindata = response.data;
     console.log(response.data);
     if(logindata.message === "ไม่พบบัญชีผู้ใช้งานรายนี้"){
      Swal.fire({
        title: "ไม่พบบัญชีผู้ใช้งานรายนี้",
        text: "กรุณาใส่ email และ password ใหม่ด้วยค่ะ",
        icon: "error",
        confirmButtonText: "OK",
      });
     }else if(logindata.message === "แต้มคะแนนไม่เพียงพอ"){
      Swal.fire({
        title:"แต้มสะสมไม่เพียงพอ",
        html: `<p>
                  แต้มสะสมที่คุณมี มีเพียง ${logindata.pesentpoint} คะแนน
               </p>
               <p>** ซึ่งไม่เพียงพอต่อการชำระสินค้า **</p>
               `,
        icon: "error",
        confirmButtonText: "OK",
      });
     }
     else{
       setLogin(true);
       setPointData();
      };
     
    } catch (error) {
      setLogin(false);
      Swal.fire({
        text: "ไม่สามารถดึงข้อมูล api ได้",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Error fetching data:", error);
    }
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
      email: "",
      password: "",
    });
    setErrors({});
    setSubmitting(false);
  };

  const handleConfirmPay=()=>{
    Swal.fire({
      title:"ชำระเงินสำเร็จ",
      html: `
      <div className="border border-secondary">
      <p style={{ fontSize: "0.8rem", textAlign: "center" }}>ราคาสินค้าทั้งหมด บาท</p>
      <p>รายละเอียดรายการ:</p>
       <p>รายการที่ 3</p>
       <p>รายการที่ 2</p>
      </div>
    
  `,
      icon: "success",
      confirmButtonText: "ไปที่หน้า ติดตามรายการสั่ง",
    });

  }
  return (
    <div className="container">
    {isLogin?(
      <div>
         <h2>ข้อมูลเกี่ยวกับแต้มสะสม</h2>
         <p>นี่คือแต้มสะสมของคุณ: {pointData.totalPoint} คะแนน</p>
         <div className="d-flex justify-content-center mt-3">
        <Button variant="outline-primary" onClick={handleConfirmPay} disabled={paymentStatus === "ชำระเงินสำเร็จ"}>ยืนยันการชำระเงิน</Button>
      </div>
      </div>
    ):(
      <div>

      <p>เข้าสู่ระบบการสะสมแต้มของคุณ</p>
      <form className="needs-validation d-flex flex-column justify-content-center align-items-center" onSubmit={handleSubmit}>
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
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
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
                    style={{ cursor: "pointer" ,width:"300px"}}
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
