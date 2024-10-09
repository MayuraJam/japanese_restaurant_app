import { useState, useEffect, react } from "react";
import { Button, Modal, Alert, Row, Col, Card } from "react-bootstrap";
import axios from "axios";

const MemberPointComponent = () => {
  return (
    <>
    <div className="d-flex justify-content-between">
      <p
        className=" p-2 rounded-5  me-3"
        style={{
          maxWidth: "150px", // ปรับให้แคบลง
          backgroundColor: "#4A4947",
          color: "#F9E79F",
          border: "2px solid #F9E79F",
          textAlign: "center", // ตัวอักษรอยู่ตรงกลาง
        }}
      >
        <i class="bi bi-person-raised-hand me-2"></i> accountName
      </p>
      <p className=" p-2 rounded-5 d-flex justify-content-center me-3 border border-success text-success"><i class="bi bi-balloon-heart text-success me-2"></i>กำลังอยู่ในระบบ</p>
    </div>
      <div className="d-flex flex-row justify-content-end">
        <div
          className="my-3 p-3 rounded-5 d-flex justify-content-center"
          style={{
            maxWidth: "220px",
            backgroundColor: "#4A4947",
            color: "#F9E79F",
            border: "2px solid #F9E79F",
          }}
        >
          <i class="bi bi-stars me-2"></i> จำนวนแต้มทั้งหมด
        </div>
      </div>
      <Row
        className="mt-2 d-flex justify-content-center align-items-center"
        style={{ gap: "20px" ,margin:0}}
      >
        <Col xs={5}  style={{height:"450px"}}>
          <div
            className="shadow-sm rounded-3 d-flex justify-content-around align-items-center  p-2"
            style={{ width: "300px",gap:"10px" ,backgroundColor:"#1A5276"}}
          >
            <div style={{color:"#F9E79F"}} >
            <i class="bi bi-stars"></i><p>แต้มที่ได้รับล่าสุด</p>
            </div>
            <div style={{color:"#F9E79F"}}>
            <p style={{fontSize:"0.6rem",marginBottom:0}}>เวลาที่ได้รับแต้ม</p>
            <p style={{fontSize:"3rem",marginTop:0}}>+30</p>
            </div>
          </div>
          <div className="mt-3 shadow-sm rounded-3 p-2 bg-white" style={{ width: "300px", height:"250px",border:"1px solid #EB5B00"}}>
          <p>เงื่อนไขการได้รับแต้ม</p>
          <hr/>
          </div>
        </Col>
        <Col xs={6}>
         <div>
         <p style={{fontSize:"1rem",fontWeight:"bold"}}> <i class="bi bi-stars me-2"></i>ประวัติการสะสมแต้ม</p>
         <div style={{height:"400px",overflowY:"auto",border:"1px solid #EB5B00"}} className="shadow-sm rounded-3 p-3 d-flex flex-column  bg-white ">
            <div style={{width:"330px",height:"60px",backgroundColor:"#F9E79F"}} className=" rounded-3 p-2 d-flex justify-content-around align-items-center mb-3 shadow-sm ">
                <p style={{fontSize:"1rem",fontWeight:"bold"}}>ได้รับแต้ม</p>
                <p style={{fontSize:"0.8rem",color:"gray"}}>เวลา</p>
                <p style={{fontSize:"1.5rem",fontWeight:"bold",color:"blue"}}>แต้ม</p>
            </div>
            <div style={{width:"330px",height:"60px",backgroundColor:"#F9E79F"}} className=" rounded-3 p-2 d-flex justify-content-around align-items-center shadow-sm ">
                <p style={{fontSize:"0.7rem",fontWeight:"bold",width:"120px"}}>ใช้แต้ม เพื่อใช้ในการชำระรายการสั่ง</p>
                <p style={{fontSize:"0.8rem",color:"gray"}}>เวลา</p>
                <p style={{fontSize:"1.5rem",fontWeight:"bold",color:"red"}}>แต้ม</p>
            </div>
         </div>
         </div>
        </Col>
      </Row>
    </>
  );
};
export default MemberPointComponent;
