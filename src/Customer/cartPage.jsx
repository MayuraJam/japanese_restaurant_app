import React, { useState, useRef, useEffect } from "react";
import "../CSS_file/sideNavigation.css";
import "../CSS_file/selectMenu.css";
import { Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import "../CSS_file/stepperInputDesign.css";
import Swal from "sweetalert2";
import SideBarCustomer from "../Component/sideNavigationCustomer";
import "../CSS_file/dataTeble.css"
import NavbarCustomer from "../Component/navBarCustomer";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import NoOrder from '../image/no order.jpg';
const Mycart = () => {
  const { customerID } = useParams();

  //const customerID = "CUS000007";
  const tableID = "T008";
  const nevigate = useNavigate();
  const ToPage = (path) => {
    nevigate(path);
  };
  const [cartList, setCartList] = useState([]);
  const [total, setTotal] = useState(0);
  const [quantity,setQuantity] = useState(1);
  
  //การลบสินค้าในตะกร้า
  const handleDeleteCart = async (cartID) => {
    const result = await Swal.fire({
      title: "คุณต้องการลบรายการหรือไม่",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "ไม่ต้องการลบรายการนี้",
      confirmButtonText: "ใช่ ต้องการลบรายการนี้",
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(
          `https://localhost:7202/api/Customer/DeleteCart/${cartID}`
        );
        console.log("ลบสำเร็จ");
      } catch (error) {
        console.log("ไม่สามารถลบข้อมูลได้");
      }
      Swal.fire({
        title: "ลบรายการสำเร็จ",
        icon: "success",
      });
      fetchingdata();
    }
  };

  //การดึงข้อมูลในตะกร้า
  const fetchingdata = async () => { //ติดในตรงนี้ที่ต้องคิดค่าผลรวม*จำนวน
    try {
      const response = await axios.post(
        `https://localhost:7202/api/Customer/GetCart/${tableID}`
      );
      console.log("response :", response.data.cartList);
      const sum = response.data.cartList.reduce(
        (totalPrice, currentItem) => totalPrice + currentItem.netprice,
        0
      );
      const totalQuantity = response.data.cartList.reduce(
        (totalQuant, currentItem) => totalQuant + currentItem.quantity,
        0
      );
      setCartList(response.data.cartList);
      setTotal(sum);
      setQuantity(totalQuantity);
    } catch (error) {
      console.log("ไม่สามารถดึงข้อมูลได้ รายการภายในตะกร้าได้");
    }
  };
  useEffect(() => {
    fetchingdata();
  }, []);

  //การเพิ่มจำนวน
  const handleIncrease = (cartID) => {
    //setQuantity(quantity +1 >5? 5 : quantity+1)
    setCartList((prevCartList) =>
      prevCartList.map((item) =>
        item.cartID === cartID
          ? {
              ...item,
              quantity: item.quantity + 1 > 5 ? 5 : item.quantity + 1
            }
          : item
      )
    );
  };

  //การลดจำนวน
  const handleDecrease = (cartID) => {
    //setQuantity(quantity -1 <1? 1 : quantity-1);
    setCartList((prevCartList) =>
      prevCartList.map((item) =>
        item.cartID === cartID
          ? {
              ...item,
              quantity: item.quantity - 1 < 1 ? 1 : item.quantity - 1
            }
          : item
      )
    );
  };

  //การเปลี่ยนแปลงข้อมูลใน cart
  const handleEditCart=async (cartID,quantity,unitprice)=>{
    if(!cartID || !quantity || !unitprice) return;
    try {
      const response = await axios.put(
        `https://localhost:7202/api/Customer/UpdateCart`,{
          cartID:cartID,
          quantity : quantity,
          unitPrice : unitprice
        }
      );
      console.log("response :", response.data.cartList);
      setCartList(response.data.cartList);
      fetchingdata();
    } catch (error) {
      console.log("ไม่สามารถดึงข้อมูลได้ รายการภายในตะกร้าได้");
    }
  }
  //filter

  //การยืนยันคำสั่งซื้อ
  const handleCheckOut = async(totalPriceInput)=>{
    try{
      const response = await axios.post("https://localhost:7202/api/Customer/AddOrder",{
        tableID:tableID,
        totalPrice : totalPriceInput,
        customerID : customerID
      })
      Swal.fire({
        text: "ยืนยันรายการสำเร็จ โปรดรอการอนุมัติรายการซักครู่",
        icon: "success",
        confirmButtonText: "OK",
      });
      ToPage("/Customer/order/"+customerID);
    }catch(error){
      console.log(error);
    }
 }

  return (
    <>
       <SideBarCustomer customerID={customerID}/>
       <NavbarCustomer customerID={customerID}/>
      <div className="mainMenu ">
        <div
          className="shadow-sm p-3 rounded-3 bg-white mt-3"
          style={{ minHeight: "500px" ,border: "1px solid #EB5B00"}}
        >
          {cartList?.length === 0 ? (
            <div style={{ height: "480px" }}>
              <p>ตารางรายการสั่ง</p>
              <hr variant="secondary" />
              <center>
                <img
                src={NoOrder}
                alt="ภาพประกอบ"
                className="img-fluid mb-3 "
                style={{
                  width: "250px",
                  //width:"100%",
                  height: "280px",
                  backgroundColor: "#ffff",
                }}
                />
                <p>ไม่พบรายการสั่ง</p>
              </center>
            </div>
          ) : (
            <div 
           // style={{ height: "500px" }}
            >
              <p>ตารางรายการสั่ง</p>
              <hr variant="secondary" />
              <div 
              //style={{ maxHeight: "295px", overflowY: "auto" }}
              >
                <table className="table table-striped"> 
                 <thead>
                  <tr>
                    <th>ภาพเมนู</th>
                    <th>ชื่อเมนู</th>
                    <th>จำนวน</th>
                    <th>ราคา</th>
                    <th></th>
                  </tr>
                  </thead>
                  <tbody>
                {cartList?.map((item) => (
                  <tr key={item.cartID}>
                    <th>
                    <img
                        src={item.imageSrc}
                        //alt={user.firstName}
                        className="img-fluid border border-dark mb-3 rounded-2"
                        style={{
                          width: "50px",
                          //width:"100%",
                          height: "50px",
                          objectFit: "cover",
                          alt: "MenuImage",
                        }}
                      />
                    </th>
                    <th><div className="d-flex flex-column align-items-center">
                        <p style={{ fontSize: "0.9rem" }}>{item.menuName}</p>
                        <p style={{ fontSize: "0.8rem", color: "gray" }}>
                          {item.optionValue}
                        </p>
                      </div>
                    </th>
                    <th>
                    <div className="number-input">
                        <button
                          type="button"
                          className="btnNumumber"
                          onClick={()=>handleDecrease(item.cartID)}
                        >
                          -
                        </button>
                        <div className="value">{item.quantity}</div>
                        <button
                          type="button"
                          className="btnNumumber"
                          onClick={()=>handleIncrease(item.cartID)}
                        >
                          +
                        </button>
                      </div>
                    </th>
                    <th>
                      <div style={{ fontSize: "0.9rem" }}>
                      {item.netprice} บาท
                      </div>
                    </th>
                    <th>
                    <Button
                        variant="warning" 
                        onClick={() => handleEditCart(item.cartID,item.quantity,item.unitPrice)}
                        className="me-3"
                      >
                       <i class="bi bi-arrow-clockwise"></i>
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteCart(item.cartID)}
                      >
                        <i class="bi bi-x-circle"></i>
                      </Button>
                    </th>
                  </tr>
                ))} 
                  </tbody>  
                </table>
              </div>
              <hr className="text-secondary" />
              <div className="d-flex flex-row justify-content-around">
                <h3>ราคารวม :</h3>
                <p>({quantity}) รายการ</p>
                <h3 style={{ color: "red" }} className="me-3">
                  {total} บาท
                </h3>
              </div>
              <hr className="text-secondary" />
              <div className="d-flex justify-content-end">
                <Button variant="outline-primary" onClick={()=>handleCheckOut(total)}>ยืนยันรายการ</Button>{" "}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Mycart;
