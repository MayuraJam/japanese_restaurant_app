import React from "react";
import SideBarCustomer from "../Component/sideNavigationCustomer";
import "../Component/sideNavigation.css";
import "../Customer/selectMenu.css";
import NavbarMenu from "../Component/navBarCustomer";
import { Nav, Navbar, NavDropdown, Container, Row, Col } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';

const HistoryPage=()=>{
  return(
    <div>
      <SideBarCustomer />
      <NavbarMenu />
    <div className="mainMenu border border-info">
      หน้าประวัติการสั่ง เมื่อจบการ order และออกจากระบบ หน้านี้จะหายไป
    </div>
    </div>
  );
}
export default HistoryPage;