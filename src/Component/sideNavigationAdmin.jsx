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
import customer from '../image/icon/user.png';
import Swal from "sweetalert2";
import Mainlogo from '../image/phapirun_logo2.jpg'
import dashboardIcon from '../image/icon/dashboard (1).png'
import { useNavigate,useLocation,useParams} from "react-router-dom";
import axios from "axios";

const SideBarAdmin = ({staftID}) => {
  
  //นำไอดีพนักงานมาพักไว้ที่นี้ แล้วทำการแจกจ่ายไปในแต่ละปุ่ม
  const navigate = useNavigate();
  const toPage=(path) =>{
    navigate(path);
  } 
  const location = useLocation();

  //ออกจากระบบ
  const handleLogout=()=>{
    console.log("staftID",staftID)
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
      .then(async(result) =>{
        if (result.isConfirmed) {
          try {
              await axios.put(
              `https://localhost:7202/api/Auth/LogoutStaft/${staftID}`,
            );
          } catch (error) {
            console.log("ไม่สามารถ update ข้อมูลได้", error);
          }
          toPage('/LoginStaftPage');
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
        <div className="d-flex flex-column ">
            <a href={`/Admin/dashboard/${staftID}`} className={`d-flex align-items-center ${location.pathname === `/Admin/dashboard/${staftID}` ? "active" : ""}`}>
            <img src={dashboardIcon} style={{width:'20px',height:'20px',backgroundSize:'cover',marginRight:'10px'}}/>
      
              dashboard</a>
          </div>
          
          <div className="d-flex flex-column ">
         
            <a 
            href={`/Admin/table/${staftID}`}
              className={`d-flex align-items-center ${location.pathname === `/Admin/table/${staftID}`? "active" : ""}`}>
            <img src={tableIcon} style={{width:'20px',height:'20px',backgroundSize:'cover',marginRight:'10px'}}/>
              โต๊ะ 
            </a> 
            
          </div>
          <div className="d-flex flex-column">
            <a href={`/Admin/orderManagement/${staftID}`} className={`d-flex align-items-center ${location.pathname === `/Admin/orderManagement/${staftID}`? "active" : ""}`}>
            <img src={orderlistIcon} style={{width:'20px',height:'20px',backgroundSize:'cover',marginRight:'10px'}}/>
              
              รายการสั่ง
              </a>
          </div>

         {/*} <div className="d-flex flex-column">
            <a href={`/Admin/orderIncome/${staftID}`} className={`d-flex align-items-center ${location.pathname === `/Admin/orderIncome/${staftID}`? "active" : ""}`}>
            <img src={orderlistIcon} style={{width:'20px',height:'20px',backgroundSize:'cover',marginRight:'10px'}}/>
              
              รายการสั่ง
              </a>
          </div>*/}
          <div className="d-flex flex-column">
            <a href={`/Admin/orderStatusManagement/${staftID}`} className={`d-flex align-items-center ${location.pathname === `/Admin/orderStatusManagement/${staftID}` ? "active" : ""}`}>
            <img src={orderTimeIcon} style={{width:'20px',height:'20px',backgroundSize:'cover',marginRight:'10px'}}/>
              ดิดตามรายการสั่ง 
              </a>
          </div>
          <div className="d-flex flex-column">
            <a href={`/Admin/paymentManagement/${staftID}`} className={`d-flex align-items-center ${location.pathname === `/Admin/paymentManagement/${staftID}` ? "active" : ""}`}>
            <img src={cashIcon} style={{width:'20px',height:'20px',backgroundSize:'cover',marginRight:'10px'}}/>
              
              ชำระเงินสด</a>
          </div>
          <div className="d-flex flex-column ">
            <a href={`/Admin/menu/${staftID}`} className={`d-flex align-items-center ${location.pathname === `/Admin/menu/${staftID}` ? "active" : ""}`}>
            <img src={addIcon} style={{width:'20px',height:'20px',backgroundSize:'cover',marginRight:'10px'}}/>
              
              เพิ่มรายการเมนู</a>
          </div>
          <div className="d-flex flex-column ">
            <a href={`/Admin/memberManagement/${staftID}`} className={`d-flex align-items-center ${location.pathname === `/Admin/memberManagement/${staftID}` ? "active" : ""}`}>
            <img src={customer} style={{width:'20px',height:'20px',backgroundSize:'cover',marginRight:'10px'}}/>
              
              บัญชีลูกค้า</a>
          </div>
          
          {/*<div className="d-flex flex-column ">
            <a href={`/Admin/report/${staftID}`} className={`d-flex align-items-center ${location.pathname === `/Admin/report/${staftID}` ? "active" : ""}`}>
            <img src={reportIcon} style={{width:'20px',height:'20px',backgroundSize:'cover',marginRight:'10px'}}/>
      
              รายงาน</a>
          </div>*/}
          <hr className = "text-secondary mt-2"/>
          <div className="d-flex flex-column" >
            <a onClick={handleLogout}  className="logout-btn">
            <img src={logoutIcon} style={{width:'20px',height:'20px',backgroundSize:'cover',marginRight:'10px'}}/>
              ออกจากระบบ</a>
          </div>
          
        </div>
      </div>
    </div>
  );
};
export default SideBarAdmin;
