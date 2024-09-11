import React from "react";
import SideBarCustomer from "../Component/sideNavigationCustomer.jsx";
import "../Component/sideNavigation.css";
import "../Customer/selectMenu.css";
import NavbarCustomer from "../Component/navBarCustomer.jsx";
import MenuPage from './selectMenuPage.jsx';
import { Nav, Navbar, NavDropdown, Container, Row, Col } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const MainPage = () => {
  return (
    <Router>
        <div className='d-flex'>
        <div className='col-auto'>
      <SideBarCustomer/>
      <NavbarCustomer/>
        </div>
      </div>
      <Routes>
        {/*ฝั่งลูกค้า*/}
        <Route path="/Customer" element={<SideBarCustomer />} />
        <Route path="/Customer/menupage" element={<MenuPage />} />
      </Routes>
    </Router>
  );
};
export default MainPage;
