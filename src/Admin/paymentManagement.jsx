import React from "react";
import SideBarAdmin from "../Component/sideNavigationAdmin";
import "../CSS_file/sideNavigation.css";
import "../CSS_file/selectMenu.css";
import NavbarAdmin from "../Component/NavBarAdmin";
import { Nav, Navbar, NavDropdown, Container, Row, Col } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useParams } from "react-router-dom";

const PaymentManagementPage=()=>{
  const { staftID } = useParams();

  return(
    <div>
     <SideBarAdmin staftID={staftID}/>
     <NavbarAdmin staftID={staftID}/>
    <div className="mainMenu border border-info">
      หน้าแสดงรายการpayment และหน้าย่อยใส่ตัวเลขของorderในช่องของการเลือกเงินสด
    </div>
    </div>
  );
}
export default PaymentManagementPage;