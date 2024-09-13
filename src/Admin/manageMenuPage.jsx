import React, { useState, useRef, useEffect } from "react";
import SideBarAdmin from "../Component/sideNavigationAdmin";
import "../Component/sideNavigation.css";
import "../Customer/selectMenu.css";
import "../Component/dataTeble.css"
import NavbarAdmin from "../Component/NavBarAdmin";
//import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Swal from "sweetalert2";

import {
  Button,
} from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import simpleImage from "../image/food.jpg";
const ManageMenu = () => {
  const [menuData, setMenuData] = useState([]);
  //ดึงข้อมูลเมนูทั้งหมด
  const fetchingFulldata = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7202/api/Admin/GetMenu"
      );
      console.log("response :", response.data.menuList);
      setMenuData(response.data.menuList);
    } catch (error) {
      console.log("ไม่สามารถดึงข้อมูลได้");
    }
  };
  useEffect(() => {
    fetchingFulldata();
  }, []);

  const handleDeleteItem= async(menuID)=>{
    const result = await Swal.fire({
        title: "คุณต้องการลบรายการหรือไม่",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText:"ไม่ต้องการลบรายการนี้",
        confirmButtonText: "ใช่ ต้องการลบรายการนี้"
      });
        if (result.isConfirmed) {
          try {
            await axios.delete(
              `https://localhost:7202/api/Admin/DeleteMenu/${menuID}`
            );
            console.log("ลบสำเร็จ");
          } catch (error) {
            console.log("ไม่สามารถลบข้อมูลได้");
          }
          Swal.fire({
            title: "ลบรายการสำเร็จ",
            icon: "success"
          });
          fetchingFulldata();
        }
      };

      const getCurrentDate = (datetimeString) => {
        const date = new Date(datetimeString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
        const day = String(date.getDate()).padStart(2, "0");
        return `${day}/${month}/${year}`;
      };
  return (
    <div>
      <div className="border border-dark rounded p-3 mt-5" style={{height:"520px"}}>
       <div>
      <p> <i class="bi bi-table me-2"></i> ตารางแสดงรายการเมนูอาหาร</p>
       </div>
       <div className="table-wrapper">
      <table
        className="table table-striped border border-dark"
        aria-labelledby="tableLabel"
        style={{ marginTop: "35px"}}
      >
        <thead>
          <tr>
            <th>ภาพ</th>
            <th>ชื่อเมนู</th>
            <th>ประเภทอาหาร</th>
            <th>ราคา</th>
            <th>ชื่อตัวเลือกพิเศษ</th>
            <th>จำนวนในคลัง</th>
            <th>วันที่สร้างรายการ</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
         {menuData.map((item) => (
            <tr key={menuData.menuID}>
              <th>
                <img
                  src={item.imageSrc}
                  //alt={user.firstName}
                  className="img-fluid border border-dark mb-3 rounded-2"
                  style={{
                    width: "50px",
                    //width:"100%",
                    height: "50px",
                    objectFit: "cover",
                    alt: "MenuImage",
                  }}
                />
              </th>
              <th>{item.menuName}</th>
              <th>{item.categoryName}</th>
              <th>{item.unitPrice} ฿</th>
              <th>{item.optionName}</th>
              <th>{item.quantity}</th>
              <th>{getCurrentDate(item.createDate)}</th>
              <th>
              <Button variant="warning" className="me-2">แก้ไข</Button>
              <Button variant="danger" onClick={()=>handleDeleteItem(item.menuID)}>ลบ</Button>
              </th>
            </tr>
          ))}
          <tr>
              <th>
                <img
                  src={simpleImage}
                  //alt={user.firstName}
                  className="img-fluid border border-dark mb-3 rounded-2"
                  style={{
                    width: "50px",
                    //width:"100%",
                    height: "50px",
                    objectFit: "cover",
                    alt: "MenuImage",
                  }}
                />
              </th>
              <th>ชื่อเมนู1</th>
              <th>ประเภทอาหาร1</th>
              <th>ราคา1</th>
              <th>ชื่อตัวเลือกพิเศษ1</th>
              <th>ตัวเลือก1</th>
              <th>
                <Button variant="warning" className="me-2">
                  แก้ไข
                </Button>
                <Button variant="danger">ลบ</Button>
              </th>
          </tr>
        </tbody>
      </table>

       </div>

      </div>
    </div>
  );
};
export default ManageMenu;
