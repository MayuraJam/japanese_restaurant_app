import React from "react";
import SideBarAdmin from "../Component/sideNavigationAdmin";
import "../Component/sideNavigation.css";
import "../Customer/selectMenu.css";
import NavbarAdmin from "../Component/NavBarAdmin";
import { Nav, Navbar, NavDropdown, Container, Row, Col } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';

const PaymentManagementPage=()=>{
  return(
    <div>
     <SideBarAdmin />
     <NavbarAdmin />
    <div className="mainMenu border border-info">
      หน้าแสดงรายการpayment และหน้าย่อยใส่ตัวเลขของorderในช่องของการเลือกเงินสด
    </div>
    </div>
  );
}
export default PaymentManagementPage;