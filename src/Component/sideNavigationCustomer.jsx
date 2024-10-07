import React from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../CSS_file/sideNavigation.css";
import Navbar from "./navBarCustomer";
import "bootstrap-icons/font/bootstrap-icons.css";
import riceIcon from '../image/icon/rice.png';
import orderlistIcon from '../image/icon/check-list.png';
import orderTimeIcon from '../image/icon/file.png';
import cashIcon from '../image/icon/wallet.png';
import historyIcon from '../image/icon/history.png';
import logoutIcon from '../image/icon/logout.png';
import Mainlogo from '../image/phapirun_logo2.jpg'
import { useParams } from "react-router-dom";
const SideBarCustomer = () => {
  const {orderID} = useParams();
  const {staftID} = useParams();
  const location = useLocation();

  return (
    <div>
      <div className="sidenav">
        <div>
          <center>
            <img
              src={Mainlogo}
              //alt={user.firstName}
              className="img-fluid rounded-circle"
              style={{
                width: "50px",
                height: "50px",
                objectFit: "contain ",
                backgroundColor: "#ffff",
              }}
            />
          </center>
        </div>
        <div className=" mt-4">
          <div className="d-flex flex-column mb-2">
            <a href="/Customer/menupage" className={`d-flex align-items-center ${location.pathname === "/Customer/menupage" ? "active" : ""}`}>
            <img src={riceIcon} style={{width:'20px',height:'20px',backgroundSize:'cover',marginRight:'10px'}}/>
              เมนูอาหาร
            </a>
          </div>
           <div className="d-flex flex-column mb-2">
            <a href="/Customer/cartMenu" className={`d-flex align-items-center ${location.pathname === "/Customer/cartMenu" ? "active" : ""}`}>
            <img src={orderlistIcon} style={{width:'20px',height:'20px',backgroundSize:'cover',marginRight:'10px'}}/>
            รายการสั่ง</a>
          </div>
          <div className="d-flex flex-column mb-2">
            <a href="/Customer/order" className={`d-flex align-items-center ${location.pathname === "/Customer/order" ? "active" : ""}`}>
            <img src={orderTimeIcon} style={{width:'20px',height:'20px',backgroundSize:'cover',marginRight:'10px'}}/>
              ดิดตามรายการสั่ง</a>
          </div>
          <div className="d-flex flex-column mb-2">
         {/*} {!orderID&&(
            <a href="/Customer/payment" className={`d-flex align-items-center ${location.pathname === "/Customer/payment" ? "active" : ""}`}>
            <img src={cashIcon} style={{width:'20px',height:'20px',backgroundSize:'cover',marginRight:'10px'}}/> 
              ชำระเงิน</a>
          )}*/}
          {orderID && (
        <a 
          href={`/Customer/payment/${orderID}`} 
          className={`d-flex align-items-center ${location.pathname.includes(`/Customer/payment/${orderID}`) ? "active" : ""}`}
        >
          <img 
            src={cashIcon} 
            style={{width:'20px', height:'20px', backgroundSize:'cover', marginRight:'10px'}}
          /> 
          ชำระเงิน
        </a>
      )}
       
          </div>
          <div className="d-flex flex-column mb-2">
            <a href="/Customer/history" className={`d-flex align-items-center ${location.pathname === "/Customer/history" ? "active" : ""}`}>
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
