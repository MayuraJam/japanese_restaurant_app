import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Component/sideNavigation.css";
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
        <div className="border border-info mt-4">
          <div className="d-flex flex-column border border-info">
            <a href="/Admin/table/#" className={`d-flex align-items-center ${location.pathname === "/Admin/table/#" ? "active" : ""}`}>
            <img src={tableIcon} style={{width:'20px',height:'20px',backgroundSize:'cover',marginRight:'10px'}}/>
              โต๊ะ
            </a>
          </div>
          <div className="d-flex flex-column border border-info">
            <a href="#">
            <img src={orderlistIcon} style={{width:'20px',height:'20px',backgroundSize:'cover',marginRight:'10px'}}/>
              
              รายการสั่ง</a>
          </div>
          <div className="d-flex flex-column border border-info">
            <a href="#">
            <img src={orderTimeIcon} style={{width:'20px',height:'20px',backgroundSize:'cover',marginRight:'10px'}}/>
              ดิดตามรายการสั่ง</a>
          </div>
          <div className="d-flex flex-column border border-info">
            <a href="#">
            <img src={cashIcon} style={{width:'20px',height:'20px',backgroundSize:'cover',marginRight:'10px'}}/>
              
              ชำระเงิน</a>
          </div>
          <div className="d-flex flex-column border border-info">
            <a href="/Admin/Addmenu" className={`d-flex align-items-center ${location.pathname === "/Admin/Addmenu" ? "active" : ""}`}>
            <img src={addIcon} style={{width:'20px',height:'20px',backgroundSize:'cover',marginRight:'10px'}}/>
              
              เพิ่มรายการเมนู</a>
          </div>
          <div className="d-flex flex-column border border-info">
            <a href="#" className={`d-flex align-items-center ${location.pathname === "#" ? "active" : ""}`}>
            <img src={orderlistIcon} style={{width:'20px',height:'20px',backgroundSize:'cover',marginRight:'10px'}}/>
              
              จัดการรายการเมนู</a>
          </div>
          <div className="d-flex flex-column border border-info">
            <a href="#" className={`d-flex align-items-center ${location.pathname === "#" ? "active" : ""}`}>
            <img src={faqIcon} style={{width:'20px',height:'20px',backgroundSize:'cover',marginRight:'10px'}}/>
              
              FAQ</a>
          </div>
          <div className="d-flex flex-column border border-info">
            <a href="#" className={`d-flex align-items-center ${location.pathname === "#" ? "active" : ""}`}>
            <img src={reportIcon} style={{width:'20px',height:'20px',backgroundSize:'cover',marginRight:'10px'}}/>
      
              รายงาน</a>
          </div>
          <div className="d-flex flex-column border border-info">
            <a href="#" className={`d-flex align-items-center ${location.pathname === "#" ? "active" : ""}`}>
            <img src={orderlistIcon} style={{width:'20px',height:'20px',backgroundSize:'cover',marginRight:'10px'}}/>
              
              คู่มือ</a>
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
