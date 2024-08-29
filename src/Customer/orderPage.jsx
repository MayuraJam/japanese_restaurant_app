import React from "react";
import SideBarCustomer from "../Component/sideNavigationCustomer";
import "../Component/sideNavigation.css";
import "../Customer/selectMenu.css";
import NavbarMenu from "../Component/navBar";
import { Nav, Navbar, NavDropdown, Container, Row, Col } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';

const OrderConfirmPage=()=>{
  return(
    <div>
      <SideBarCustomer />
      <NavbarMenu />
    <div className="mainMenu border border-info">
      หน้าแสดงรายการ order แต่ยังไม่มีการยืนยัน
    </div>
    </div>
  );
}
export default OrderConfirmPage;