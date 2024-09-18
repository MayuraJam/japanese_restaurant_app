import logo from './logo.svg';
import './App.css';
// index.js หรือ App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import {React,useState} from "react";
import Test from './page/TestPage.jsx' 
import MenuPage from './Customer/selectMenuPage.jsx'
import MainPage from './Customer/mainPage.jsx'
import SideBarCustomer from './Component/sideNavigationCustomer.jsx';
import NavbarMenu from './Component/navBarCustomer.jsx';
import CustomerLogin from './Customer/loginPageCustomer.jsx';
import OrderPage from './Customer/orderPage.jsx';
import TablePage from './Admin/tablePage.jsx';
import ReviewPage from './Customer/reviewPage.jsx';
import LoginStaftPage from './Original/loginPage.jsx';
import AuthenModel from './Original/authenModel.jsx';
import AddMenuPage from './Admin/addMenuPage.jsx';
import HistoryPage from './Customer/historyOrder.jsx';
import PaymentPage from './Customer/paymentPage.jsx';
import OrderManagementPage from './Admin/orderManagement.jsx';
import OrderStatusManagementPage from './Admin/orderStatusManagement.jsx';
import PaymentManagementPage from './Admin/paymentManagement.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Mycart from './Customer/cartPage.jsx';
function App() {
  return (
    <Router>
      {/*<div className='d-flex'>
        <div className='col-auto'>
      <SideBarCustomer/>
      <NavbarMenu/>
        </div>
      </div>*/}
    <Routes>
      {/*<Route path="/" element={<Test/>} />*/}
      {/*ฝั่งลูกค้า*/}
      <Route path="/" element={<CustomerLogin/>} />
     {/*<Route path="/mainPage" element={<MainPage/>} />*/}
     <Route path="/Customer" element={<SideBarCustomer/>} />
     <Route path="/Customer/menupage" element={<MenuPage/>} />   
     <Route path="/Customer/cartMenu" element={<Mycart/>} />        
     <Route path="/Customer/order" element={<OrderPage/>} />   
     <Route path="/Customer/payment" element={<PaymentPage/>} />   
     <Route path="/Customer/history" element={<HistoryPage/>} />   
     <Route path="/Customer/reviwe" element={<ReviewPage/>} />   

        {/*ฝั่งพนักงาน*/}
     <Route path="/Admin/table/:staftID" element={<TablePage/>} />   {/*staftID ตัวอย่าง : b511a88f-6b00-4c47-a17d-8816266e14b5 */}
     <Route path="/Admin/addmenu" element={<AddMenuPage/>} />   
     <Route path="/Admin/orderManagement" element={<OrderManagementPage/>} />   
     <Route path="/Admin/orderStatusManagement" element={<OrderStatusManagementPage/>} />   
     <Route path="/Admin/paymentManagement" element={<PaymentManagementPage/>} />   

        {/*หน้าทั่วไป ใช่ร่วมกัน*/}
        <Route path="/LoginStaftPage" element={<LoginStaftPage/>} />   
         {/*เป็นหน้าไว้สำหรับการสะสมแต้ม*/}
        <Route path="/AuthenModalPage" element={<AuthenModel/>} />  
        
     </Routes>
    </Router>
  );
}

export default App;
