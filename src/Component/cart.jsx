import React, { useState, useRef, useEffect } from "react";
import SideBarCustomer from "../Component/sideNavigationCustomer";
import "../Component/sideNavigation.css";
import "../Customer/selectMenu.css";
import NavbarCustomer from "../Component/navBarCustomer";
import { Row, Col, Card,Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import Picture2 from "../image/restuarant.jpg";
import axios from "axios";
import "../Component/stepperInputDesign.css";
import Menucategory from "../Component/componentData";
import simpleImage from "../image/food.jpg";

const Mycart = ({tableID}) => {
  tableID = "T001"
  
  const handleDeleteCart=async()=>{
    
  }
  return (
    <>
      <div
        className="border border-black p-3 rounded-3 bg-white"
        style={{ maxHeight: "410px", overflowY: "auto" }}
      >
        
          <p>รายการสั่ง</p>
          <hr variant="secondary" />
          <div className="border rounded-3 p-1 ">
            <div className="d-flex flex-row justify-content-around align-items-center">
              <div className="d-flex flex-column">
              <p style={{fontSize:"0.9rem",width:"80px"}}>ชื่อเมนู รายละเอียดเมนู</p>
              <p style={{fontSize:"0.8rem",color:"gray",width:"80px"}}>ชื่อตัวเลือกพิเศษ</p>
              </div>
              <div className="number-input">
                <button
                  type="button"
                  className="btnNumumber"
                  onClick={"handleDecrease"}
                >
                  -
                </button>
                <div className="value">1</div>
                <button
                  type="button"
                  className="btnNumumber"
                  onClick={"handleIncrease"}
                >
                  +
                </button>
              </div>
              <p className="text-wrap" style={{fontSize:"0.9rem",fontWeight:"bold"}}>ราคา (บาท)</p>
              <Button variant="outline-danger"><i class="bi bi-x-circle"></i></Button>            </div>
          </div>
          <hr className="text-secondary"/>
          {/*} {SlitStringToArray(item.value) &&
                        Array.isArray(SlitStringToArray(item.value)) &&
                        SlitStringToArray(item.value).map(
                          (optionValue, index) => (
                            <ul key={index}>
                              <li style={{ fontSize: "1rem" }}>
                                {optionValue}
                              </li>
                            </ul>
                          )
                        )}*/}
          <hr className="text-secondary" />
          <center>
          <h3 style={{ color: "red" }}>ราคา บาท</h3>
          <button className="p-2 innerbutton hoverCard mt-4">
            <i class="bi bi-egg-fried me-2"></i>เพิ่มรายการ
          </button>
        </center>
      </div>
    </>
  );
};
export default Mycart;
