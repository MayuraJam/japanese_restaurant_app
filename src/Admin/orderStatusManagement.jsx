import React from "react";
import SideBarAdmin from "../Component/sideNavigationAdmin";
import "../Component/sideNavigation.css";
import "../Customer/selectMenu.css";
import NavbarAdmin from "../Component/NavBarAdmin";
import { Nav, Navbar, NavDropdown, Container, Row, Col } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';

const OrderStatusManagementPage=()=>{
  return(
    <div>
     <SideBarAdmin />
     <NavbarAdmin />
    <div className="mainMenu border border-info">
      หน้าแสดงสถานะ และรายการเมนูของแต่ละ order
    </div>
    </div>
  );
}
export default OrderStatusManagementPage;