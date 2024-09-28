import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../CSS_file/sideNavigation.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import orderlistIcon from '../image/icon/check-list.png';
import orderTimeIcon from '../image/icon/file.png';
import cashIcon from '../image/icon/wallet.png';
import tableIcon from '../image/icon/chair.png';
import logoutIcon from '../image/icon/logout.png';
import addIcon from '../image/icon/add.png';
import reportIcon from '../image/icon/report.png';
import faqIcon from '../image/icon/question.png';
import Swal from "sweetalert2";
import Mainlogo from '../image/phapirun_logo2.jpg'
import { useNavigate,useLocation} from "react-router-dom";

const SideBarAdmin = () => {
  //นำไอดีพนักงานมาพักไว้ที่นี้ แล้วทำการแจกจ่ายไปในแต่ละปุ่ม
  const navigate = useNavigate();
  const toPage=(path) =>{
    navigate(path);
  } 

  const location = useLocation();
  
  const handleLogout=()=>{
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
        confirmButtonText: "ใช่ ฉันต้องการออกจากระบบ",
        cancelButtonText: "ไม่ ฉันไม่ต้องการออกจากระบบ",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          toPage('/LoginStaftPage');
          swalWithBootstrapButtons
            .fire({
              title: "ออกจากระบบสำเร็จ",
              icon: "success",
            })
            .then(() => {
              
            });
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
          <div className="d-flex flex-column ">
            <a href="/Admin/table/#" className={`d-flex align-items-center ${location.pathname === "/Admin/table/#" ? "active" : ""}`}>
            <img src={tableIcon} style={{width:'20px',height:'20px',backgroundSize:'cover',marginRight:'10px'}}/>
              โต๊ะ
            </a>
          </div>
          <div className="d-flex flex-column">
            <a href="/Admin/orderManagement" className={`d-flex align-items-center ${location.pathname === "/Admin/orderManagement" ? "active" : ""}`}>
            <img src={orderlistIcon} style={{width:'20px',height:'20px',backgroundSize:'cover',marginRight:'10px'}}/>
              
              รายการสั่ง</a>
          </div>
          <div className="d-flex flex-column">
            <a href="/Admin/orderStatusManagement" className={`d-flex align-items-center ${location.pathname === "/Admin/orderStatusManagement" ? "active" : ""}`}>
            <img src={orderTimeIcon} style={{width:'20px',height:'20px',backgroundSize:'cover',marginRight:'10px'}}/>
              ดิดตามรายการสั่ง</a>
          </div>
          <div className="d-flex flex-column">
            <a href="/Admin/paymentManagement" className={`d-flex align-items-center ${location.pathname === "/Admin/paymentManagement" ? "active" : ""}`}>
            <img src={cashIcon} style={{width:'20px',height:'20px',backgroundSize:'cover',marginRight:'10px'}}/>
              
              ชำระเงิน</a>
          </div>
          <div className="d-flex flex-column ">
            <a href="/Admin/Addmenu" className={`d-flex align-items-center ${location.pathname === "/Admin/Addmenu" ? "active" : ""}`}>
            <img src={addIcon} style={{width:'20px',height:'20px',backgroundSize:'cover',marginRight:'10px'}}/>
              
              เพิ่มรายการเมนู</a>
          </div>
          {/*<div className="d-flex flex-column ">
            <a href="#" className={`d-flex align-items-center ${location.pathname === "#" ? "active" : ""}`}>
            <img src={faqIcon} style={{width:'20px',height:'20px',backgroundSize:'cover',marginRight:'10px'}}/>
              
              FAQ</a>
          </div>*/}
          <div className="d-flex flex-column ">
            <a href="#" className={`d-flex align-items-center ${location.pathname === "#" ? "active" : ""}`}>
            <img src={reportIcon} style={{width:'20px',height:'20px',backgroundSize:'cover',marginRight:'10px'}}/>
      
              รายงาน</a>
          </div>
          <hr className = "text-secondary mt-2"/>
          <div className="d-flex flex-column">
            <a onClick={handleLogout}>
            <img src={logoutIcon} style={{width:'20px',height:'20px',backgroundSize:'cover',marginRight:'10px'}}/>
              
              ออกจากระบบ</a>
          </div>
          
        </div>
      </div>
    </div>
  );
};
export default SideBarAdmin;
