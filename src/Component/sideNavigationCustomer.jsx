import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Component/sideNavigation.css";
import Navbar from "./navBar";
import "bootstrap-icons/font/bootstrap-icons.css";
import riceIcon from '../image/icon/rice.png';
import orderlistIcon from '../image/icon/check-list.png';
import orderTimeIcon from '../image/icon/file.png';
import cashIcon from '../image/icon/wallet.png';
import historyIcon from '../image/icon/history.png';
import logoutIcon from '../image/icon/logout.png';

const SideBarCustomer = () => {
  return (
    <div>
      <div className="sidenav">
        <div className="border border-info">
          <center>
            <img
              //src=''
              //alt={user.firstName}
              className="img-fluid rounded-circle"
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover",
                backgroundColor: "#ffff",
              }}
            />
          </center>
        </div>
        <div className=" mt-4">
          <div className="d-flex flex-column mb-2">
            <a href="/Customer/menupage" className="d-flex align-items-center">
            <img src={riceIcon} style={{width:'20px',height:'20px',backgroundSize:'cover',marginRight:'10px'}}/>
              เมนูอาหาร
            </a>
          </div>
          <div className="d-flex flex-column mb-2">
            <a href="/Customer/order">
            <img src={orderlistIcon} style={{width:'20px',height:'20px',backgroundSize:'cover',marginRight:'10px'}}/>
            รายการสั่ง</a>
          </div>
          <div className="d-flex flex-column mb-2">
            <a href="#">
            <img src={orderTimeIcon} style={{width:'20px',height:'20px',backgroundSize:'cover',marginRight:'10px'}}/>
              ดิดตามรายการสั่ง</a>
          </div>
          <div className="d-flex flex-column mb-2">
            <a href="#">
            <img src={cashIcon} style={{width:'20px',height:'20px',backgroundSize:'cover',marginRight:'10px'}}/> 
              ชำระเงิน</a>
          </div>
          <div className="d-flex flex-column mb-2">
            <a href="#">
            <img src={historyIcon} style={{width:'20px',height:'20px',backgroundSize:'cover',marginRight:'10px'}}/>
              
              ประวัติการสั่ง</a>
          </div>
          <hr className = "text-warning mt-2"/>
          <div className="d-flex flex-column">
            <a href="#">
            <img src={logoutIcon} style={{width:'20px',height:'20px',backgroundSize:'cover',marginRight:'10px'}}/>
              ออกจากระบบ</a>
          </div>
          
        </div>
      </div>
    </div>
  );
};
export default SideBarCustomer;
