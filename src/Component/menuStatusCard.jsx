import { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
const MenuStatusCard = () => {
  const [orderDetailData, setOrderDetailData] = useState([]);

  //ดึงข้อมูลทั้งหมดที่เป็น order
  const fetchingdata = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7202/api/Admin/GetOrderStatusCount`
      );
      const statusLenght = response.data.orderList;
      console.log("response order :", statusLenght);
      setOrderDetailData(statusLenght);
    } catch (error) {
      console.log("ไม่สามารถดึงข้อมูลได้");
    }
  };
  useEffect(() => {
    fetchingdata();
  }, []);

    //การกรองข้อมูลที่แยกตามสถานะ order
  const filterOrderData = (orderStatus) => {
    console.log(orderStatus);
    return orderDetailData
      ? orderDetailData.filter((item) => item.orderDetailStatus === orderStatus)
          .length
      : 0;
  };
  return (
    <>
      <Card
        className=" bg-white shadow-sm rounded-3 "
        style={{ height: "230px", border: "1px solid #EB5B00" }}
      >
        <Card.Header className="d-flex  align-items-center justify-content-between">
          <p>สถานะของรายการในแต่ละสถานะ</p>
        </Card.Header>
        <Card.Text
          className="p-3 d-flex  align-items-center justify-content-center"
          style={{ gap: "10px" }}
        >
          <div
            className="rounded-3 p-1 shadow-sm"
            style={{
              width: "80px",
              height: "120px",
              borderTop: "6px solid #FF9100",
              backgroundColor: "#F5E8DD",
            }}
          >
            <div className="p-3 d-flex flex-column align-items-between justify-content-center">
              <p style={{ fontSize: "2rem", textAlign: "center" }}>
                {filterOrderData("กำลังปรุง")}
              </p>
              <p
                style={{
                  fontSize: "0.6rem",
                  color: "gray",
                  fontWeight: "bold",
                }}
              >
                กำลังปรุง
              </p>
            </div>
          </div>
          <div
            className="rounded-3 p-1 shadow-sm"
            style={{
              width: "80px",
              height: "120px",
              borderTop: "6px solid #FCCD2A",
              backgroundColor: "#F6F193",
            }}
          >
            <div className="p-3 d-flex flex-column align-items-between justify-content-center">
              <p style={{ fontSize: "2rem", textAlign: "center" }}>
                {filterOrderData("ปรุงสำเร็จ")}
              </p>
              <p
                style={{
                  fontSize: "0.5rem",
                  color: "gray",
                  fontWeight: "bold",
                }}
              >
                ปรุงสำเร็จ
              </p>
            </div>
          </div>
          <div
            className="rounded-3 p-1 shadow-sm"
            style={{
              width: "80px",
              height: "120px",
              borderTop: "6px solid #7CF5FF",
              backgroundColor: "#E3F4F4",
            }}
          >
            <div className="p-3 d-flex flex-column align-items-between justify-content-center">
              <p style={{ fontSize: "2rem", textAlign: "center" }}>
                {filterOrderData("กำลังเสริฟ")}
              </p>
              <p
                style={{
                  fontSize: "0.5rem",
                  color: "gray",
                  fontWeight: "bold",
                }}
              >
                กำลังเสริฟ
              </p>
            </div>
          </div>
          <div
            className="rounded-3 p-1 shadow-sm"
            style={{
              width: "80px",
              height: "120px",
              borderTop: "6px solid #77E4C8",
              backgroundColor: "#DDFFBB",
            }}
          >
            <div className="p-3 d-flex flex-column align-items-between justify-content-center">
              <p style={{ fontSize: "1.5rem", textAlign: "center" }}>
                {filterOrderData("เสริฟแล้ว")}
              </p>
              <p
                style={{
                  fontSize: "0.6rem",
                  color: "gray",
                  fontWeight: "bold",
                }}
              >
                เสริฟแล้ว
              </p>
            </div>
          </div>
        </Card.Text>
      </Card>
    </>
  );
};
export default MenuStatusCard;
