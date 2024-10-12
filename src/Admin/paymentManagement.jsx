import {React,useState,useEffect} from "react";
import SideBarAdmin from "../Component/sideNavigationAdmin";
import "../CSS_file/sideNavigation.css";
import "../CSS_file/selectMenu.css";
import NavbarAdmin from "../Component/NavBarAdmin";
import { Row, Col, Button,Alert} from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const PaymentManagementPage = () => {
  const { staftID } = useParams();
  const [orderData,setOrderData] = useState([]);
  const [search,setSearch] = useState("");
  const [input,setInput] = useState(0.00);
  const [changeResult,setChangeResult] = useState(0.00);

  
  const handleEnter=async(orderID,event)=>{
    if(event.key === "Enter"){
      try {
        const response = await axios.get(
          `https://localhost:7202/api/Admin/GetOrderByID/${orderID}`
        );
        if(response.data.message === "ไม่พบรายการสั่งของโต๊ะนี้"){
          Swal.fire({
            text: "ไม่พบรายการสั่งของโต๊ะนี้",
            icon: "error",
            confirmButtonText: "OK",
          });
          console.log("ไม่มีข้อมูล");
          return;
        }
        console.log(response.data.orderItem);
        setOrderData(response.data.orderItem);
        
      } catch (error) {
        console.log("ไม่สามารถดึงข้อมูลได้");
      }
    }
    else{
      return "ไม่มีการ enter"
    }
  } 
  const refrestPage = async(orderID)=>{
    try {
      const response = await axios.get(
        `https://localhost:7202/api/Admin/GetOrderByID/${orderID}`
      );
      if(response.data.message === "ไม่พบรายการสั่งของโต๊ะนี้"){
        console.log("ไม่มีข้อมูล");
        return;
      }
      console.log(response.data.orderItem);
      setOrderData(response.data.orderItem);
    } catch (error) {
      console.log("ไม่สามารถดึงข้อมูลได้");
    }
  }


  const handleCal=(inputNumber,netAmount)=>{
    var change;
    if(netAmount === null || typeof netAmount === 'undefined' || inputNumber === 0){
      Swal.fire({
        text: "ไม่มีการกรอกจำนวนเงิน",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
    if(inputNumber<netAmount){
      Swal.fire({
        text: "เงินที่รับมาไม่เพียงพอต่อการชำระสินค้า",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
    else{
      change = inputNumber - netAmount;
      setChangeResult(change);
    }
  }
  const handleClear = ()=>{
    setInput(0);
    setChangeResult(0);
  }

 

  const handleSave = async(orderID)=>{
    const netTotalAmount = CalculateNetPrice(orderData.totalPrice,orderData.totalPrice*0.07).toFixed(0);
    const totalTax = CalculateTax(orderData.totalPrice);
    if(orderID===null || typeof orderID === 'undefined'){
      Swal.fire({
        text: "ไม่มีการกรอกรหัสการสั่งซื้อ หรือ รหัสการสั่งซื้อไม่ถูกต้อง",
        icon: "error",
        confirmButtonText: "OK",
      });
    }else{
      try {
        const response = await axios.post(
          `https://localhost:7202/api/Customer/AddPayment`,
          {
            orderID: orderData.orderID,
            tableID: orderData.tableID,
            paymentType: "เงินสด",
            totalAmount: orderData.totalPrice,
            totalFee: totalTax,
            cash: input,
            change: changeResult,
            netTotalAmount: netTotalAmount,
            staffID: staftID,
            customerID : orderData.customerID
          }
        );
        const response2 = await axios.post(
          `https://localhost:7202/api/Customer/AddNotification`,
          {
             title : "ชำระเงินเรียบร้อย",
             message : `${orderID} ทำการชำระเงินด้วยเงินสดเรียบร้อย`,
             tableID : orderData.tableID,
             sentBy : "พนักงาน",
          }
        );
      Swal.fire({
        text: "ยืนยันการชำระเรียบร้อย",
        icon: "success",
        confirmButtonText: "OK",
      });
      handleClear();
      refrestPage(orderID);

    }catch (error) {
      console.log("ไม่สามารถส่งข้อมูลได้",error);
   }
  }
}

  //วันและเวลา

  const timeOrder = (datetime)=>{
    if (datetime) {
      const myArray = datetime.split("T");
      const date = myArray[0];
      const time = myArray[1];
      const timeOnly = time.substring(0, 5);
      return timeOnly;
    } else {
      console.error("orderDate ไม่ถูกกำหนดหรือเป็น undefined");
    }
  }
  const dateOrder = (datetime)=>{
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
  }

   //การคำนวน
   const CalculateTax = (totalPrice)=>{
    var tax = (totalPrice*0.07).toFixed(0);
    return tax;
 }

 const CalculateNetPrice = (totalPrice,taxPrice)=>{
   var net = totalPrice + taxPrice;
  
   return net;
}
  return (
    <div>
      <SideBarAdmin staftID={staftID} />
      <NavbarAdmin staftID={staftID} />
      <div className="mainMenu">
        <p
          className="my-3 border border-dark bg-white p-2 rounded-5 d-flex justify-content-center"
          style={{ maxWidth: "220px" }}
        >
          ชำระเงินสด
        </p>
        <Row
          className=" d-flex justify-content-start"
          style={{ marginLeft: "8px" }}
        >
          <Col
            lg={7}
            md={5}
            sm={4}
            className="shadow-sm rounded-2 me-3 p-2 bg-white"
            style={{ minHeight: "440px" }}
          >
            <div className="d-flex justify-content-between  mb-3">
              <Button variant="outline-dark" ><i class="bi bi-arrow-clockwise"></i></Button>
              <div
                className="search-container-box shadow-sm  "
                style={{ width: 300 }}
              >
                <div className="input-group ">
                  <input
                    type="text"
                    id="search"
                    placeholder="กรอกรายการสั่ง..."
                    name="search"
                    className="form-control "
                    value={search}
                    onChange={(e)=>{setSearch(e.target.value)}}
                    onKeyDown={(event)=>{handleEnter(search,event)}}
                  />
                  <div className="input-group-append">
                    <span className="input-group-text bg-white border-0" style={{cursor:"pointer"}}>
                      <i className="bi bi-search"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
           <div className="border border-dark p-2 mt-5 rounded-3">
              <p style={{textAlign:"center"}}>
                ระบบคำนวณเงิน 
              </p>
              <hr/>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <div className="d-flex align-items-center mb-3" style={{gap:"20px"}}>
                <p>รับเงิน :</p>
                <input type="number" placeholder="กรอกจำนวนเงิน" value={input} onChange={(e)=>{setInput(e.target.value)}}/>
                
                <Button variant="primary" onClick={()=>handleCal(input,CalculateNetPrice(orderData.totalPrice,orderData.totalPrice*0.07).toFixed(0))}><i class="bi bi-calculator me-2"></i>คำนวณ</Button>
                </div>
                <div className="d-flex align-items-center" style={{gap:"20px"}}>
                <p className="me-3">เงินทอน :</p>
                <input type="number" disabled value={changeResult}/> 
                <p>บาท</p>
                </div>
              </div>
              <hr/>
              <div className="d-flex align-items-center justify-content-end" style={{gap:"20px"}}>
              <Button variant="outline-dark" onClick={handleClear}>ล้างคำตอบ</Button>
              <Button variant="primary" 
              onClick={()=>{handleSave(orderData.orderID)}}
              disabled = {orderData.paymentStatus === "ชำระเงินสำเร็จ"}
               >บันทึก</Button>
              </div>
           </div>
          </Col>
          {/*รายละเอียดรายการ จะแสดงก็ต่อเมื่อมีการ enter สิ่งที่พิมพ์ */}
          <Col
            lg={4}
            md={3}
            sm={4}
            className="shadow-sm p-2  rounded-2 bg-white"
            style={{
              position: "fixed",
              height: "490px",
              right: "10px",
              top: "80px",
             
            }}
          >
            {search === "" || orderData === null?(
              <>
            <div style={{width:"100%",height:"100px"}} className="border border-dark bg-dark p-2">
              <div className="d-flex "> 
                <p className="text-white me-4">ราคาสุทธิ</p>
                <p className="text-white" style={{fontSize:"0.8rem"}}>(0)</p>
              </div>
                <p style={{fontSize:"3rem",color:"#00FF9C",marginTop:"-30px"}} className="d-flex justify-content-end">0.00</p>
            </div>
            <div className="mt-3" style={{ overflowY: "auto",maxHeight:"350px"}}>
            <Alert variant="warning" className="mb-3">
             <p style={{textAlign:"center"}}>
              ไม่พบรายการ
             </p>
           </Alert>
           <hr/>
            <div className="d-flex flex-row justify-content-between p-2">
             <p style={{ fontSize: "0.8rem", fontWeight: "bold" }}>
               รายละเอียดการสั่ง
             </p>
             
             <p style={{ fontSize: "1rem" }}>รหัสการสั่งอาหาร : OD----</p>
           </div>
           <div className="d-flex flex-row justify-content-between p-2">
             <p style={{ fontSize: "0.7rem" }}>เวลาการสั่งอาหาร : {/*{dateOrder(orderData.orderDate)}  {timeOrder(orderData.orderDate)}*/}</p>
             <p
               style={{ fontSize: "1rem" }}
               className="border border-primary p-1 rounded-4 text-primary"
             >
               โต๊ะที่ : ---
             </p>
           </div>
           <p style={{ fontSize: "0.8rem" }}>รหัสลูกค้า : ---</p>
           <p style={{ fontSize: "0.8rem" ,maxWidth:"250px"}} className="border border-success p-1">สถานะการชำระเงิน : ไม่พบการชำระเงิน</p> 
            </div>
              </>
            ):(
             <>
             
              <>
             <div style={{width:"100%",height:"100px"}} className="border border-dark bg-dark p-2">
              <div className="d-flex "> 
                <p className="text-white me-4">ราคาสุทธิ</p>
                <p className="text-white" style={{fontSize:"0.8rem"}}>({orderData.orderDetailList?.reduce((totalQuant, currentItem) => totalQuant + currentItem.quantity, 0)||0})</p>
              </div>
                <p style={{fontSize:"3rem",color:"#00FF9C",marginTop:"-30px"}} className="d-flex justify-content-end">{CalculateNetPrice(orderData.totalPrice,orderData.totalPrice*0.07).toFixed(0)}</p>
            </div>
            <div className="mt-3" style={{ overflowY: "auto",maxHeight:"350px"}}>
            {orderData.orderDetailList?.map((itemlist)=>(
            <Alert variant="warning" className="mb-3">
             <div className="d-flex flex-row justify-content-between">
               <div className="d-flex flex-row">
                 <img
                   src={itemlist.imageSrc}
                   className="border rounded-3 image-fluid me-3"
                   style={{
                     height: "60px",
                     width: "60px",
                     objectFit: "cover",
                   }}
                 />
                 <div className="d-flex flex-column">
                   <p
                     style={{
                       fontSize: "1rem",
                       lineHeight: "10px",
                       fontWeight: "bold",
                     }}
                     className=" text-primary"
                   >
                     {itemlist.menuName}
                   </p>
                   <p
                     style={{ fontSize: "0.8rem" }}
                     className="text-primary text-secondary"
                   >
                     {itemlist.optionValue}
                   </p>
                 </div>
               </div>
               <div className="d-flex flex-column align-items-center justify-content-center">
                 <p
                   style={{
                     fontSize: "1rem",
                     lineHeight: "10px",
                     fontWeight: "bold",
                   }}
                 >
                   X {itemlist.quantity}
                 </p>
                 <p style={{ fontSize: "1rem" }}>{itemlist.netprice} ฿</p>
               </div>
             </div>
           </Alert>
            ))}
           <hr/>
            <div className="d-flex flex-row justify-content-between p-2">
             <p style={{ fontSize: "0.8rem", fontWeight: "bold" }}>
               รายละเอียดการสั่ง
             </p>
             
             <p style={{ fontSize: "1rem" }}>รหัสการสั่งอาหาร : {orderData.orderID}</p>
           </div>
           <div className="d-flex flex-row justify-content-between p-2">
             <p style={{ fontSize: "0.7rem" }}>เวลาการสั่งอาหาร : {dateOrder(orderData.orderDate)}  {timeOrder(orderData.orderDate)}</p>
             <p
               style={{ fontSize: "1rem" }}
               className="border border-primary p-1 rounded-4 text-primary"
             >
               โต๊ะที่ : {orderData.tableID}
             </p>
           </div>
           <p style={{ fontSize: "0.8rem" }}>รหัสลูกค้า : {orderData.customerID}</p>
           <p style={{ fontSize: "0.8rem" ,maxWidth:"200px"}} className="border border-success p-1">สถานะการชำระเงิน : {orderData.paymentStatus}</p> 
            </div>
              </>
             </>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default PaymentManagementPage;
