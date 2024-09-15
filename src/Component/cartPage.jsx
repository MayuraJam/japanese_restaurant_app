import React, { useState, useRef, useEffect } from "react";
import "../Component/sideNavigation.css";
import "../Customer/selectMenu.css";
import { Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import "../Component/stepperInputDesign.css";
import Swal from "sweetalert2";
import SideBarCustomer from "./sideNavigationCustomer";
import "../Component/sideNavigation.css";
import "../Customer/selectMenu.css";
import "../Component/dataTeble.css"
import NavbarCustomer from "./navBarCustomer";

const Mycart = () => {
  const tableID = "T001";
  const [cartList, setCartList] = useState([]);
  const [total, setTotal] = useState(0);
  const [quantity,setQuantity] = useState(1);
  
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
  const handleEditCart=async (cartID,quantity)=>{
    if(!cartID || !quantity) return;
    try {
      const response = await axios.put(
        `https://localhost:7202/api/Customer/UpdateCart`,{
          cartID:cartID,
          quantity : quantity
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

  const CalculateTax = (price)=>{
       if(!price) return;
       const ans = price*0.07
  }
  return (
    <>
      <SideBarCustomer />
      <NavbarCustomer />
      <div className="mainMenu border border-info">
        <div
          className="border border-black p-3 rounded-3 bg-white"
          style={{ Height: "525px" }}
        >
          {cartList.length === 0 ? (
            <div style={{ height: "500px" }}>
              <p>ตารางรายการสั่ง</p>
              <hr variant="secondary" />
              <center>
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
                <table className="table table-striped border border-dark"> 
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
                {cartList.map((item) => (
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
                        variant="outline-warning" 
                        onClick={() => handleEditCart(item.cartID,item.quantity)}
                        className="me-3"
                      >
                       <i class="bi bi-arrow-clockwise"></i>
                      </Button>
                      <Button
                        variant="outline-danger"
                        onClick={() => handleDeleteCart(item.cartID)}
                      >
                        <i class="bi bi-x-circle"></i>
                      </Button>
                    </th>
                  </tr>
                ))} 
                {/* <div className="border rounded-3 p-1 mb-2" key={item.cartID}>
                   <div className="d-flex flex-row justify-content-around align-items-center">
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
                     <div className="d-flex flex-column align-items-center">
                       <p style={{ fontSize: "0.9rem" }}>{item.menuName}</p>
                       <p style={{ fontSize: "0.8rem", color: "gray" }}>
                         {item.optionValue}
                       </p>
                     </div>
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
                     <p
                       className="text-wrap border border-info"
                       style={{ fontSize: "0.9rem", fontWeight: "bold" }}
                     >
                       {Calculate(item.quantity,item.unitPrice)} บาท
                     </p>
                     <Button
                       variant="outline-warning" 
                       onClick={() => handleEditCart(item.cartID,item.quantity)}
                       className="me-3"
                     >
                      <i class="bi bi-arrow-clockwise"></i>
                     </Button>
                     <Button
                       variant="outline-danger"
                       onClick={() => handleDeleteCart(item.cartID)}
                     >
                       <i class="bi bi-x-circle"></i>
                     </Button>
                     
                   </div>
                 </div>*/}
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
                <Button variant="outline-primary">ยืนยันรายการ</Button>{" "}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Mycart;