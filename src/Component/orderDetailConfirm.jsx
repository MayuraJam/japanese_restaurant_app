import {React,useEffect,useState} from "react";
import "../CSS_file/sideNavigation.css";
import "../CSS_file/selectMenu.css";
import {  Alert, Card,Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import Picture2 from "../image/restuarant.jpg";
import axios from "axios";
import Swal from "sweetalert2";
const OrderConfirmCard = ({orderID})=>{

  const [orderData,setOrderData] = useState([]);

 const fetchingFulldata = async (orderID) => {
    try {
      const response = await axios.get(
        `https://localhost:7202/api/Admin/GetOrderByID/${orderID}`
      );
      if(response.data.orderItem === ""){
        console.log("ไม่มีข้อมูล");
        return;
      }
      console.log("response :", response.data.orderItem);
      setOrderData(response.data.orderItem);
      
    } catch (error) {
      console.log("ไม่สามารถดึงข้อมูลได้",error);
    }
  };
  useEffect(() => {
    fetchingFulldata(orderID);
  }, [orderID]);

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

const ConfirmOrder = async(confirmMassage,orderID)=>{
  console.log("confirmMassage :"+confirmMassage + "orderID :"+orderID);
  try {
    const response = await axios.put(
      `https://localhost:7202/api/Admin/ConfirmOrder`,
      {
        confirm:confirmMassage,
        orderID : orderID,
        staftID : "b511a88f-6b00-4c47-a17d-8816266e14b5"
      }
    );
 console.log(response.data);
} catch (error) {
  console.error("Error fetching data:", error);

  Swal.fire({
    text: "เกิดข้อผิดพลาดในการยืนยันรายการ",
    icon: "error",
    confirmButtonText: "OK",
  });
}
Swal.fire({
  text: "ยืนยันรายการเรียบร้อย",
  icon: "success",
  confirmButtonText: "OK",
});
fetchingFulldata(orderID);
}

  return(
    <>
    {orderData? (
      <div>

      <div className="d-flex flex-row justify-content-between p-2">
             <p style={{ fontSize: "0.8rem", fontWeight: "bold" }}>
               รายละเอียดการสั่ง
             </p>
             
             <p style={{ fontSize: "1rem" }}>รหัสการสั่งอาหาร : {orderData.orderID}</p>
           </div>

           <hr className="text-secondary" />
           <div className="d-flex flex-row justify-content-between">
             <p style={{ fontSize: "0.7rem" }}>เวลาการสั่งอาหาร : {dateOrder(orderData.orderDate)}  {timeOrder(orderData.orderDate)}</p>
             <p
               style={{ fontSize: "1rem" }}
               className="border border-primary p-1 rounded-4 text-primary"
             >
               โต๊ะที่ : {orderData.tableID}
             </p>
           </div>
           <div className="d-flex flex-row justify-content-between">
             <div className="d-flex flex-row" style={{ lineHeight: "10px" }}>
               <p style={{ fontSize: "0.8rem" }} className="me-2">
                 การอนุมัติรายการสั่ง :
               </p>
               {orderData.confirmOrder ==="อนุญาติเรียบร้อย"?(
               <p
                 style={{ fontSize: "0.6rem" }}
                 className="border border-success p-1 rounded-4 text-success"
               >
                 {orderData.confirmOrder}
               </p>
               ):(orderData.confirmOrder ==="ยกเลิกรายการสั่งนี้"?(
                <p
                style={{ fontSize: "0.6rem" }}
                className="border border-danger p-1 rounded-4 text-danger"
              >
                {orderData.confirmOrder}
              </p>
               ):(
                <p
                style={{ fontSize: "0.6rem" }}
                className="border border-secondary p-1 rounded-4 text-secondary"
              >
                {orderData.confirmOrder}
              </p>
               ))}
             </div>
             <p style={{ fontSize: "0.8rem" }}>จำนวนรายการรวม : {orderData.orderDetailList?.reduce((totalQuant, currentItem) => totalQuant + currentItem.quantity, 0)||0}</p>
           </div>
           <hr className="text-secondary" />
           {orderData.orderDetailList?.map((item)=>(
           <Alert variant="warning" className="mb-3">
             <div className="d-flex flex-row justify-content-between">
               <div className="d-flex flex-row">
                 <img
                   src={item.imageSrc}
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
                     {item.menuName}
                   </p>
                   <p
                     style={{ fontSize: "0.8rem" }}
                     className="text-primary text-secondary"
                   >
                     {item.optionValue}
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
                   X {item.quantity}
                 </p>
                 <p style={{ fontSize: "1rem" }}>{item.netprice} ฿</p>
               </div>
             </div>
           </Alert>
           ))}
           <hr className="text-secondary" />
           <div className="d-flex justify-content-end">
             <Card border="secondary" style={{ width: "25rem" }}>
               <Card.Header>รายละเอียด</Card.Header>
               <Card.Body>
                 <Card.Text>
                   <div className="d-flex flex-row justify-content-between">
                     <p style={{ fontSize: "1rem" }}>จำนวน ({orderData.orderDetailList?.reduce((totalQuant, currentItem) => totalQuant + currentItem.quantity, 0)||0}) รายการ</p>
                     <p>{orderData.totalPrice} บาท</p>
                   </div>
                   <div className="d-flex flex-row justify-content-between">
                     <p style={{ fontSize: "1rem" }}>ภาษีมุลค่าเพิ่ม (7%)</p>
                     <p style={{ fontSize: "1rem" }}>{CalculateTax(orderData.totalPrice)} บาท</p>
                   </div>
                   <hr variant="secondary" />
                   <div className="d-flex flex-row justify-content-between mb-2">
                     <p style={{ fontSize: "1.3rem" }}>ราคาสุทธิ</p>
                     <p style={{ fontSize: "1.3rem" }}>{CalculateNetPrice(orderData.totalPrice,orderData.totalPrice*0.07).toFixed(0)} บาท</p>
                   </div>
                   <div className="d-flex flex-row justify-content-center">
                   <Button variant="outline-danger"  className="me-2" onClick={()=>{ConfirmOrder("ยกเลิกรายการสั่งนี้",orderData.orderID)}}  disabled={orderData.confirmOrder === "ยกเลิกรายการสั่งนี้" || orderData.confirmOrder === "อนุญาติเรียบร้อย"}>
                     <i class="bi bi-coin me-2"></i> ยกเลิกรายการสั่ง
                   </Button>
                   <Button variant="outline-primary" onClick={()=>{ConfirmOrder("อนุญาติเรียบร้อย",orderData.orderID)}} disabled={orderData.confirmOrder === "ยกเลิกรายการสั่งนี้" || orderData.confirmOrder === "อนุญาติเรียบร้อย"}>
                     <i class="bi bi-coin me-2"></i> ยืนยันรายการสั่ง
                   </Button>
                   </div>
                 </Card.Text>
               </Card.Body>
             </Card>
           </div>
       </div>
    ):( 
      <div>
      <div className="d-flex flex-row justify-content-between p-2">
            <p style={{ fontSize: "0.8rem", fontWeight: "bold" }}>
              รายละเอียดการสั่ง 
            </p>
            
            <p style={{ fontSize: "1rem" }}>รหัสการสั่งอาหาร : </p>
          </div>

          <hr className="text-secondary" />
          <div className="d-flex flex-row justify-content-between">
            <p style={{ fontSize: "0.8rem" }}>เวลาการสั่งอาหาร : 00/00/0000 00:00 น.</p>
            <p
              style={{ fontSize: "1rem" }}
              className="border border-primary p-1 rounded-4 text-primary"
            >
              โต๊ะที่ : ---
            </p>
          </div>
          <div className="d-flex flex-row justify-content-between">
            <div className="d-flex flex-row" style={{ lineHeight: "10px" }}>
              <p style={{ fontSize: "0.8rem" }} className="me-2">
                การอนุมัติรายการสั่ง :
              </p>
              <p
                style={{ fontSize: "0.6rem" }}
                className="border border-danger p-1 rounded-4 text-danger"
              >
                ไม่พบรายการ
              </p>
            </div>
            <p style={{ fontSize: "0.8rem" }}>จำนวนรายการรวม : 0</p>
          </div>
          <hr className="text-secondary" />
          <p>ยังไม่พบรายการการสั่ง</p>
          <hr className="text-secondary" />
          <div className="d-flex justify-content-end">
            <Card border="secondary" style={{ width: "25rem" }}>
              <Card.Header>รายละเอียด</Card.Header>
              <Card.Body>
                <Card.Text>
                  <div className="d-flex flex-row justify-content-between">
                    <p style={{ fontSize: "1rem" }}>จำนวน (0) รายการ</p>
                    <p>0 บาท</p>
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                    <p style={{ fontSize: "1rem" }}>ภาษีมุลค่าเพิ่ม (7%)</p>
                    <p style={{ fontSize: "1rem" }}>0 บาท</p>
                  </div>
                  <hr variant="secondary" />
                  <div className="d-flex flex-row justify-content-between mb-2">
                    <p style={{ fontSize: "1.3rem" }}>ราคาสุทธิ</p>
                    <p style={{ fontSize: "1.3rem" }}>0 บาท</p>
                  </div>
                  <div className="d-flex flex-row justify-content-center">
                  <Button variant="outline-danger disabled"  className="me-2">
                    <i class="bi bi-coin me-2"></i> ยกเลิกรายการสั่ง
                  </Button>
                  <Button variant="outline-primary disabled">
                    <i class="bi bi-coin me-2"></i> ยืนยันรายการสั่ง
                  </Button>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
    </div>
       
    )}
    </>
  );
}
export default OrderConfirmCard;