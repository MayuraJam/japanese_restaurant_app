import React, { useState, useRef,useEffect } from "react";
import SideBarAdmin from "../Component/sideNavigationAdmin";
import "../Component/sideNavigation.css";
import "../Customer/selectMenu.css";
import NavbarAdmin from "../Component/NavBarAdmin";
//import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Container,
  Row,
  Col,
  Card,
  Tab,
  Tabs,
  Button,
  Spinner,
  Form,
} from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const ManageMenu = () =>{
    const [menuData,setMenuData] = useState([]);
    //ดึงข้อมูลเมนูทั้งหมด
    const fetchingFulldata =async () =>{
     try {
        const response = await axios.get("https://localhost:7202/api/Admin/GetMenu");
        console.log("response :", response.data);
     } catch (error) {
        console.log("ไม่สามารถดึงข้อมูลได้");
     }
    }
    useEffect(()=>{
      fetchingFulldata();
    },[])
   return(
    <div>
      <table>
        <thead>
            <tr>
                <th>ภาพ</th>
                <th>ชื่อเมนู</th>
                <th>ประเภทอาหาร</th>
                <th>ราคา</th>
                <th>ชื่อตัวเลือกพิเศษ</th>
                <th>ตัวเลือก</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
        {}
        </tbody>
      </table>
    </div>
   );
}
export default ManageMenu;