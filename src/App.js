import logo from './logo.svg';
import './App.css';
// index.js หรือ App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import {React,useState} from "react";
import Test from './page/TestPage.jsx' 
import SelectMenuPage from './Customer/selectMenuPage.jsx'
import MainPage from './Customer/mainPage.jsx'
import SideBarCustomer from './Component/sideNavigationCustomer.jsx';
import NavbarMenu from './Component/navBarCustomer.jsx';
import CustomerLogin from './Customer/loginPageCustomer.jsx';
import OrderPage from './Customer/orderPage.jsx';
import TablePage from './Admin/tablePage.jsx';
import ReviewPage from './Customer/reviewPage.jsx';
import LoginStaftPage from './Original/loginPage.jsx';
import AuthenModel from './Original/authenModel.jsx';
import AddMenuPage from './Admin/MenuPage.jsx';
import HistoryPage from './Customer/historyOrder.jsx';
import PaymentPage from './Customer/paymentPage.jsx';
import OrderManagementPage from './Admin/orderManagement.jsx';
import OrderStatusManagementPage from './Admin/orderStatusManagement.jsx';
import PaymentManagementPage from './Admin/paymentManagement.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Mycart from './Customer/cartPage.jsx';
import LoginMember from './Customer/loginMember.jsx';
import PointPage from './Customer/pointPage.jsx';
import FAQModal from './Component/question.jsx';
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
     <Route path="/Customer/menupage" element={<SelectMenuPage/>} />   
     <Route path="/Customer/cartMenu" element={<Mycart/>} />        
     <Route path="/Customer/order" element={<OrderPage/>} />    
     <Route path="/Customer/payment/:orderID" element={<PaymentPage/>} />   {/*หน้า payment แบบมีรหัสลูกค้า */}  
     <Route path="/Customer/history" element={<HistoryPage/>} />   
     <Route path="/Customer/reviwe" element={<ReviewPage/>} />   
     <Route path="/Customer/loginTopoint" element={<LoginMember/>} />   
     <Route path="/Customer/pointPage" element={<PointPage/>} />   
     <Route path="/Customer/FAQPage" element={<FAQModal/>} />   



        {/*ฝั่งพนักงาน*/}
     <Route path="/Admin/table/:staftID" element={<TablePage/>} />   {/*staftID ตัวอย่าง : STAFT00001 */}
     <Route path="/Admin/menu/:staftID" element={<AddMenuPage/>} />   
     <Route path="/Admin/orderManagement/:staftID" element={<OrderManagementPage/>} />   
     <Route path="/Admin/orderStatusManagement/:staftID" element={<OrderStatusManagementPage/>} />   
     <Route path="/Admin/paymentManagement/:staftID" element={<PaymentManagementPage/>} />   
     <Route path="/LoginStaftPage" element={<LoginStaftPage/>} />   

         {/*เป็นหน้าไว้สำหรับการสะสมแต้ม*/}
        <Route path="/AuthenModalPage" element={<AuthenModel/>} />  
        
     </Routes>
    </Router>
  );
}

export default App;
