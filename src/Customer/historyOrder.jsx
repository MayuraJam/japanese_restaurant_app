import {React,useEffect,useState }from "react";
import SideBarCustomer from "../Component/sideNavigationCustomer";
import "../CSS_file/sideNavigation.css";
import "../CSS_file/selectMenu.css";
import NavbarCustomer from "../Component/navBarCustomer";
import { Nav,  Button,Card} from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../CSS_file/dataTeble.css"
import Picture2 from "../image/restuarant.jpg";
import axios from "axios";
import ReviewPage from "./reviewPage";
import { useParams } from 'react-router-dom';

const HistoryPage=()=>{
  const { customerID } = useParams();
  //มีการดึงข้อมูลจากตาราง order and payment
  const [orderData, setOrderData] = useState([]);
  const [payment,setPayment] = useState([]);
 
 // const customerID = "CUS000007";
  //ดึงข้อมูล order ทั้งหมด
  const fetchingFulldata = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7202/api/Customer/GetOrderAndPayment/${customerID}`
      );
      console.log("response :", response.data.orders);
      setOrderData(response.data.orders);
    } catch (error) {
      console.log("ไม่สามารถดึงข้อมูลได้");
    }
  };
  

  useEffect(() => {
    fetchingFulldata();
  }, []);

  
  // มีการไปหน้าให้คะแนนและเขียนรีวิว

  //fileter ข้อมูลรายการสั่งที่มีการชำระเงินเรียบร้อยแล้วเท่าน่ั้น
  const filterDOrderData = orderData?.filter((item)=>item.paymentStatus==="ชำระเงินสำเร็จ" && item.orderStatus==="ดำเนินรายการสำเร็จ");

   //วันและเวลา

   const timeOrder = (datetime) => {
    if (datetime) {
      const myArray = datetime.split("T");
      const date = myArray[0];
      const time = myArray[1];
      const timeOnly = time.substring(0, 5);
      return timeOnly;
    } else {
      console.error("orderDate ไม่ถูกกำหนดหรือเป็น undefined");
    }
  };
  const dateOrder = (datetime) => {
    if (datetime) {
      const formattedDate = new Date(datetime);
      const thaiFormatDate = formattedDate.toLocaleDateString("th-TH", {
        month: "long",
        day: "numeric",
        year: "numeric",
        weekday: "long",
      });
      return thaiFormatDate;
    } else {
      console.error("orderDate ไม่ถูกกำหนดหรือเป็น undefined");
    }
  };

  return(
    <div>
      <SideBarCustomer customerID={customerID}/>
      <NavbarCustomer customerID={customerID}/>
    <div className="mainMenu">
    <p
          className="my-3 border border-dark  p-3 rounded-5 d-flex justify-content-center "
          style={{ maxWidth: "220px",backgroundColor:"#4A4947",color:"#F9E79F"}}
        >
          ประวัติรายการอาหาร
        </p>
        {filterDOrderData.length === 0?(
          <div style={{ height: "425px"  ,border:"1px solid #EB5B00"}} className="shadow-sm p-3 rounded-3 bg-white mb-3 d-flex justify-content-center align-items-center">
            <p style={{ textAlign: "center" }}>ไม่พบประวัติรายการที่ท่านได้สั่งเอาไว้</p>
          </div>
        ):(
          filterDOrderData?.map((item)=>(
          <div
            className="shadow-sm p-3 rounded-3 bg-white mb-3"
            style={{ Height: "525px"  ,border:"1px solid #EB5B00"}}>
            <div>
              <div className="d-flex justify-content-end">
              <div className="d-flex flex-column m-0">
              <p style={{fontSize:"1rem",color:"#EB5B00"}}>รหัสการสั่งอาหาร : {item.orderID}</p>
              <p style={{ fontSize: "0.8rem", color: "gray" }}>{dateOrder(item.orderDate)} {timeOrder(item.orderDate)} น.</p>
              </div>
              </div>
              <hr variant="secondary" />
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>ภาพเมนู</th>
                    <th>ชื่อเมนู</th>
                    <th>จำนวน</th>
                    <th>ราคา</th>
                    <th>ให้คะแนน</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                    {item.orderDetailList?.map((itemlist)=>(
                  <tr>
                    <th>
                      <img
                        src={itemlist.imageSrc}
                        //alt={user.firstName}
                        className="img-fluid mb-3 rounded-2"
                        style={{
                          width: "50px",
                          //width:"100%",
                          height: "50px",
                          objectFit: "cover",
                          alt: "MenuImage",
                        }}
                      />
                    </th>
                    <th>
                      <div className="d-flex flex-column">
                        <p style={{ fontSize: "0.9rem" }}>{itemlist.menuName}</p>
                        <p style={{ fontSize: "0.8rem", color: "gray" }}>
                          {itemlist.optionValue}
                        </p>
                      </div>
                    </th>
                    <th>{itemlist.quantity}</th>
                    <th>
                      <div style={{ fontSize: "0.9rem" }}>{itemlist.netprice} บาท</div>
                    </th>
                    <th> 
                     <ReviewPage orderID={item.orderID} menuName={itemlist.menuName} image={itemlist.imageSrc} menuID={itemlist.menuID}  customerID={item.customerID}/>
                    </th>
                  </tr>
                    ))}
                </tbody>
              </table>
              <hr variant="secondary" />
              
              <div className="d-flex justify-content-end">
              <Card border="secondary" style={{ width: "25rem" }}>
                <Card.Header>รายละเอียด</Card.Header>
                <Card.Body>
                  {/*<Card.Title>ราคารวม</Card.Title>*/}
                  <Card.Text>
                    <div className="d-flex flex-row justify-content-between">
                  <p style={{fontSize:"0.8rem"}}>จำนวน ({item.orderDetailList.reduce(
                                (totalQuant, currentItem) =>
                                  totalQuant + currentItem.quantity,
                                0
                              )}) รายการ</p>
                  <p style={{fontSize:"1rem"}}>{item.totalPrice} บาท</p>
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                  <p style={{fontSize:"0.8rem"}}>ภาษีมุลค่าเพิ่ม (7%) :</p>
                  <p style={{fontSize:"0.9rem"}}>{item.paymentItem.totalTax} บาท</p>
                    </div>
                  <hr variant="secondary" />
                  <div className="d-flex flex-row justify-content-between">
                  <p style={{fontSize:"1.3rem",color:"#EB5B00"}}>ราคาสุทธิ : </p>
                  <p style={{fontSize:"1.3rem",color:"#EB5B00"}}>{item.paymentItem.netTotalAmount} บาท</p>
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                  <p style={{fontSize:"0.8rem"}}>ชำระด้วย :</p>
                  <p style={{fontSize:"0.9rem"}}>{item.paymentItem.paymentType}</p>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
              </div>
            </div>
  
          </div>
            ))

        )}
      </div>

    </div>
  );
}
export default HistoryPage;