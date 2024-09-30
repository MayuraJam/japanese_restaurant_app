import { React, useEffect, useState } from "react";
import SideBarAdmin from "../Component/sideNavigationAdmin";
import "../CSS_file/sideNavigation.css";
import "../CSS_file/selectMenu.css";
import NavbarAdmin from "../Component/NavBarAdmin";
import { Button, Card, Form } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const OrderStatusManagementPage = () => {
  const { staftID } = useParams();
  const [orderData, setOrderData] = useState([]);
  const [orderOriData, setOrderOriData] = useState([]);
  const [tableData, setTable] = useState([]);
  const [selectStatus,setSelectStatus] = useState("");
  //ดึงข้อมูล order ทั้งหมด
  const fetchingFulldata = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7202/api/Admin/GetOrderStatus`
      );
      console.log("response :", response.data.orderList);
      setOrderData(response.data.orderList);
      setOrderOriData(response.data.orderList);
    } catch (error) {
      console.log("ไม่สามารถดึงข้อมูลได้");
    }
  };
  useEffect(() => {
    fetchingFulldata();
  }, []);
  const cookStatus = orderData
    ? orderData.filter((item) => item.orderDetailStatus === "กำลังปรุง")
    : [];
  console.log("cookStatus :", cookStatus.length);
  const cookedStatus = orderData
    ? orderData.filter((item) => item.orderDetailStatus === "ปรุงสำเร็จ")
    : [];
  console.log("CookedStatus :", cookedStatus.length);
  const serveStatus = orderData
    ? orderData.filter((item) => item.orderDetailStatus === "กำลังเสริฟ")
    : [];
  console.log("ServeStatus :", serveStatus.length);
  const finalStatus = orderData
    ? orderData.filter((item) => item.orderDetailStatus === "เสริฟแล้ว")
    : [];
  console.log("Final status :", finalStatus.length);

  const fetchingTabledata = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7202/api/Admin/GetTable`
      );
      console.log("response :", response.data.tableList);
      setTable(response.data.tableList);
    } catch (error) {
      console.log("ไม่สามารถดึงข้อมูลได้");
    }
  };
  useEffect(() => {
    fetchingTabledata();
  }, []);
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
      const date = new Date(datetime);
      const year = date.getFullYear() + 543;
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const day = String(date.getDate()).padStart(2, "0");
      return `${day}/${month}/${year}`;
    } else {
      console.error("orderDate ไม่ถูกกำหนดหรือเป็น undefined");
    }
  };

  //ปุ่ม dropdown
  const handleSelect = async(orderStatus,orderID,menuID)=>{
    try {
      const response = await axios.put(
        `https://localhost:7202/api/Admin/UpdateOrderStatus`,{
         orderID: orderID,
         menuID: menuID,
         orderDetailStatus: orderStatus
        }
      );
      console.log("response :", response.data.message);
      fetchingFulldata();
    } catch (error) {
      console.log("ไม่สามารถดึงข้อมูลได้");
    }
  }
  //ปุ่ม filter โต๊ะ
  const filterTable = (tableID)=>{
    if(tableID === "all"){
      setOrderData(orderOriData);
    }
    else{
      const newItem = orderOriData.filter((newValue)=>newValue.tableID.trim()===tableID.trim());
      setOrderData(newItem);
    }
  }
 
  return (
    <div>
      <SideBarAdmin staftID={staftID}/>
      <NavbarAdmin staftID={staftID}/>
      <div className="mainMenu">
      <p
          className="my-3 border border-dark bg-white p-2 rounded-5 d-flex justify-content-center"
          style={{ maxWidth: "220px" }}
        >
          จัดการรายการอาหาร
        </p>
        <div className="d-flex flex-row justify-content-start mt-4">
          <Form.Select defaultValue="ทั้งหมด" className="me-4" onChange={(e)=>filterTable(e.target.value)}>
            <option value="all">โต๊ะทั้งหมด</option>
            {tableData?.map((item)=>(
              <option value={item.tableID}>{item.tableID}</option>
            ))}
          </Form.Select>
        </div>

        <div className="mt-4 d-flex flex-row justify-content-center">
          <Card
            style={{
              width: "250px",
              height: "460px",
              marginRight: "5px",
            }}
          >
            <Card.Header as="h5" style={{ backgroundColor: "#FF9100" }}>
              กำลังปรุง{""}
            </Card.Header>
            <Card.Body style={{ height: "345px", overflowX: "auto" }}>
              {cookStatus.map((item) => (
                <div
                  className="mb-3 border rounded-4 bg-white shadow-sm p-2"
                  key={item.orderID}
                >
                  <div className="d-flex flex-row justify-content-between">
                    <div
                      className="d-flex flex-column"
                      style={{ marginBottom: "0.1rem" }}
                    >
                      <p style={{ fontSize: "0.7rem", fontWeight: "bold" }}>
                        {item.menuName}
                      </p>
                      <p style={{ fontSize: "0.6rem", color: "gray" }}>
                        {" "}
                        {item.optionValue}
                      </p>
                    </div>
                    <p style={{ fontSize: "0.7rem", fontWeight: "bold" }}>
                      {item.orderID}
                    </p>
                  </div>
                  <div className="d-flex flex-row justify-content-around">
                    <p
                      style={{ fontSize: "0.7rem", textAlign: "center" }}
                      className="border border-primary rounded-4 p-1"
                    >
                      {item.tableID}
                    </p>
                    <p style={{ fontSize: "0.7rem", textAlign: "center" }}>
                      {item.quantity} ชิ้น
                    </p>
                  </div>
                  <p style={{ fontSize: "0.6rem" }}>
                    เวลาที่สั่ง : {dateOrder(item.orderDate)} (
                    {timeOrder(item.orderDate)} น.)
                  </p>
                  <Form.Select defaultValue={item.orderDetailStatus} onChange={(e)=>handleSelect(e.target.value,item.orderID,item.menuID)}>
                    <option value="กำลังปรุง">กำลังปรุง</option>
                    <option value="ปรุงสำเร็จ">ปรุงสำเร็จ</option>
                    {/*<option value="กำลังเสริฟ">กำลังเสริฟ</option>
                    <option value="เสริฟแล้ว">เสริฟแล้ว</option>*/}
                  </Form.Select>
                </div>
              ))}
            </Card.Body>
          </Card>
          <Card style={{ width: "250px", height: "460px", marginRight: "5px" }}>
            <Card.Header as="h5" style={{ backgroundColor: "#FCCD2A" }}>
              ปรุงสำเร็จ{" "}
            </Card.Header>
            <Card.Body style={{ height: "345px", overflowX: "auto" }}>
              {cookedStatus.map((item) => (
                <div
                  className="mb-3 border rounded-4 bg-white shadow-sm p-2"
                  key={item.orderID}
                >
                  <div className="d-flex flex-row justify-content-between">
                    <div
                      className="d-flex flex-column"
                      style={{ marginBottom: "0.1rem" }}
                    >
                      <p style={{ fontSize: "0.7rem", fontWeight: "bold" }}>
                        {item.menuName}
                      </p>
                      <p style={{ fontSize: "0.6rem", color: "gray" }}>
                        {" "}
                        {item.optionValue}
                      </p>
                    </div>
                    <p style={{ fontSize: "0.7rem", fontWeight: "bold" }}>
                      {item.orderID}
                    </p>
                  </div>
                  <div className="d-flex flex-row justify-content-around">
                    <p
                      style={{ fontSize: "0.7rem", textAlign: "center" }}
                      className="border border-primary rounded-4 p-1"
                    >
                      {item.tableID}
                    </p>
                    <p style={{ fontSize: "0.7rem", textAlign: "center" }}>
                      {item.quantity} ชิ้น
                    </p>
                  </div>
                  <p style={{ fontSize: "0.6rem" }}>
                    เวลาที่สั่ง : {dateOrder(item.orderDate)} (
                    {timeOrder(item.orderDate)} น.)
                  </p>
                  <Form.Select defaultValue={item.orderDetailStatus} onChange={(e)=>handleSelect(e.target.value,item.orderID,item.menuID)}>
                    <option value="ปรุงสำเร็จ">ปรุงสำเร็จ</option>
                    <option value="กำลังเสริฟ">กำลังเสริฟ</option>
                   {/*} <option value="เสริฟแล้ว">เสริฟแล้ว</option>*/}
                  </Form.Select>
                </div>
              ))}
            </Card.Body>
          </Card>
          <Card style={{ width: "250px", height: "460px", marginRight: "5px" }}>
            <Card.Header as="h5" style={{ backgroundColor: "#7CF5FF" }}>
              {" "}
              กำลังเสริฟ
            </Card.Header>
            <Card.Body style={{ height: "345px", overflowX: "auto" }}>
              {serveStatus.map((item) => (
                <div
                  className="mb-3 border rounded-4 bg-white shadow-sm p-2"
                  key={item.orderID}
                >
                  <div className="d-flex flex-row justify-content-between">
                    <div
                      className="d-flex flex-column"
                      style={{ marginBottom: "0.1rem" }}
                    >
                      <p style={{ fontSize: "0.7rem", fontWeight: "bold" }}>
                        {item.menuName}
                      </p>
                      <p style={{ fontSize: "0.6rem", color: "gray" }}>
                        {" "}
                        {item.optionValue}
                      </p>
                    </div>
                    <p style={{ fontSize: "0.7rem", fontWeight: "bold" }}>
                      {item.orderID}
                    </p>
                  </div>
                  <div className="d-flex flex-row justify-content-around">
                    <p
                      style={{ fontSize: "0.7rem", textAlign: "center" }}
                      className="border border-primary rounded-4 p-1"
                    >
                      {item.tableID}
                    </p>
                    <p style={{ fontSize: "0.7rem", textAlign: "center" }}>
                      {item.quantity} ชิ้น
                    </p>
                  </div>
                  <p style={{ fontSize: "0.6rem" }}>
                    เวลาที่สั่ง : {dateOrder(item.orderDate)} (
                    {timeOrder(item.orderDate)} น.)
                  </p>
                  <Form.Select defaultValue={item.orderDetailStatus} onChange={(e)=>handleSelect(e.target.value,item.orderID,item.menuID)}>
                    <option value="กำลังเสริฟ">กำลังเสริฟ</option>
                    <option value="เสริฟแล้ว">เสริฟแล้ว</option>
                  </Form.Select>
                </div>
              ))}
            </Card.Body>
          </Card>
          <Card style={{ width: "250px", height: "460px", marginRight: "5px" }}>
            <Card.Header as="h5" style={{ backgroundColor: "#77E4C8" }}>
              {" "}
              เสริฟแล้ว
            </Card.Header>
            <Card.Body style={{ height: "345px", overflowX: "auto" }}>
              {finalStatus.map((item) => (
                <div
                  className="mb-3 border rounded-4 bg-white shadow-sm p-2"
                  key={item.orderID}
                >
                  <div className="d-flex flex-row justify-content-between">
                    <div
                      className="d-flex flex-column"
                      style={{ marginBottom: "0.1rem" }}
                    >
                      <p style={{ fontSize: "0.7rem", fontWeight: "bold" }}>
                        {item.menuName}
                      </p>
                      <p style={{ fontSize: "0.6rem", color: "gray" }}>
                        {" "}
                        {item.optionValue}
                      </p>
                    </div>
                    <p style={{ fontSize: "0.7rem", fontWeight: "bold" }}>
                      {item.orderID}
                    </p>
                  </div>
                  <div className="d-flex flex-row justify-content-around">
                    <p
                      style={{ fontSize: "0.7rem", textAlign: "center" }}
                      className="border border-primary rounded-4 p-1"
                    >
                      {item.tableID}
                    </p>
                    <p style={{ fontSize: "0.7rem", textAlign: "center" }}>
                      {item.quantity} ชิ้น
                    </p>
                  </div>
                  <p style={{ fontSize: "0.6rem" }}>
                    เวลาที่สั่ง : {dateOrder(item.orderDate)} (
                    {timeOrder(item.orderDate)} น.)
                  </p>
                  <Form.Select defaultValue={item.orderDetailStatus} onChange={(e)=>handleSelect(e.target.value,item.orderID,item.menuID)}>
                    <option value="เสริฟแล้ว">เสริฟแล้ว</option>
                  </Form.Select>
                </div>
              ))}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default OrderStatusManagementPage;
