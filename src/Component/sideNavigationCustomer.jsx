import React from "react";
import { useLocation,useNavigate } from "react-router-dom";
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
import Swal from "sweetalert2";
import axios from "axios";

const SideBarCustomer = ({customerID}) => {
  const {orderID} = useParams();
  const location = useLocation();
  const tableID = "T008";
  
  const navigate = useNavigate();
  const toPage=(path) =>{
    navigate(path);
  } 

  const handleLogout=()=>{
    console.log("staftID",customerID)
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "คุณต้องการออกจากระบบหรือไม่ !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ใช่ ฉันต้องการออกจากระบบสั่งอาหารหรือไม่",
        cancelButtonText: "ไม่ ฉันไม่ต้องการออกจากระบบ",
        reverseButtons: true,
      })
      .then(async(result) =>{
        if (result.isConfirmed) {
          try {
              await axios.put(
              `https://localhost:7202/api/Customer/CloseTable`,{

                tableID: tableID,
                customerID: customerID
              }
            );
          } catch (error) {
            console.log("ไม่สามารถ update ข้อมูลได้", error);
          }
          toPage('/Customer/ThankYouPage');
          swalWithBootstrapButtons
            .fire({
              title: "ออกจากระบบสำเร็จ",
              icon: "success",
            })
           
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "ยกเลิกการออกจากระบบ",
            icon: "error",
          });
        }
      });
  }
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
            <a href={`/Customer/menupage/${customerID}`} className={`d-flex align-items-center ${location.pathname === `/Customer/menupage/${customerID}` ? "active" : ""}`}>
            <img src={riceIcon} style={{width:'20px',height:'20px',backgroundSize:'cover',marginRight:'10px'}}/>
              เมนูอาหาร
            </a>
          </div>
           <div className="d-flex flex-column mb-2">
            <a href={`/Customer/cartMenu/${customerID}`} className={`d-flex align-items-center ${location.pathname === `/Customer/cartMenu/${customerID}` ? "active" : ""}`}>
            <img src={orderlistIcon} style={{width:'20px',height:'20px',backgroundSize:'cover',marginRight:'10px'}}/>
            รายการสั่ง</a>
          </div>
          <div className="d-flex flex-column mb-2">
            <a href={`/Customer/order/${customerID}`}  className={`d-flex align-items-center ${location.pathname === `/Customer/order/${customerID}` ? "active" : ""}`}>
            <img src={orderTimeIcon} style={{width:'20px',height:'20px',backgroundSize:'cover',marginRight:'10px'}}/>
              ดิดตามรายการสั่ง</a>
          </div>
          <div className="d-flex flex-column mb-2">
          {orderID && (
        <a 
          href={`/Customer/payment/${orderID}/${customerID}`} 
          className={`d-flex align-items-center ${location.pathname.includes(`/Customer/payment/${orderID}/${customerID}`) ? "active" : ""}`}
        >
          <img 
            src={cashIcon} 
            style={{width:'20px', height:'20px', backgroundSize:'cover', marginRight:'10px'}}
          /> 
          ชำระเงิน
        </a>
      )}
          </div>

         {/*} <div className="d-flex flex-column mb-2">
          {orderID && (
        <a 
          href={`/Customer/finepayment/${orderID}/${customerID}`} 
          className={`d-flex align-items-center ${location.pathname.includes(`/Customer/finepayment/${orderID}/${customerID}`) ? "active" : ""}`}
        >
          <img 
            src={cashIcon} 
            style={{width:'20px', height:'20px', backgroundSize:'cover', marginRight:'10px'}}
          /> 
          ชำระค่าปรับ
        </a>
      )}
          </div>*/}

         {/*} <div className="d-flex flex-column mb-2">
            <a href={`/Customer/history/${customerID}`}  className={`d-flex align-items-center ${location.pathname === `/Customer/history/${customerID}` ? "active" : ""}`}>
            <img src={historyIcon} style={{width:'20px',height:'20px',backgroundSize:'cover',marginRight:'10px'}}/>
              
              ประวัติการสั่ง</a>
          </div>*/}
          <hr className = "text-warning mt-2"/>

          <div className="d-flex flex-column">
            <a  
            className="logout-btn"
            onClick={handleLogout} 
            >
            <img src={logoutIcon} style={{width:'20px',height:'20px',backgroundSize:'cover',marginRight:'10px'}}/>
              ออกจากระบบ</a>
          </div>
          
        </div>
      </div>
    </div>
  );
};
export default SideBarCustomer;
