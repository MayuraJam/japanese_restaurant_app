import { useState, useEffect } from "react";
import { Button, Modal, Alert, Row, Col, Card } from "react-bootstrap";
import SideBarAdmin from "../Component/sideNavigationAdmin";
import "../CSS_file/sideNavigation.css";
import "../CSS_file/selectMenu.css";
import NavbarAdmin from "../Component/NavBarAdmin";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import BestMenuCard from "../Component/BestMenuCard";
import OrderRangeChart from "../Component/OrderRangeChart";
import SaleChart from "../Component/saleChart";

const DashBoardPage = () => {
  const { staftID } = useParams();
  const [selectdate, setSelectDate] = useState(new Date());
  const [orderDetailData, setOrderDetailData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [customerData, setCustomerData] = useState([]);

  //ดึงข้อมูล order ทั้งหมด
  const fetchingFulldata = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7202/api/Admin/GetOrderStatusCount`
      );
      const response2 = await axios.get(
        `https://localhost:7202/api/Admin/GetTable`
      );
      const response3 = await axios.get(
        `https://localhost:7202/api/Admin/GetRevenue`
      );
      const statusLenght = response.data.orderList;
      console.log("response order :", statusLenght);
      setOrderDetailData(statusLenght);
      setCustomerData(response2.data.tableList);
      setRevenueData(response3.data.revenueList);
    } catch (error) {
      console.log("ไม่สามารถดึงข้อมูลได้");
    }
  };

  const fetchingOrderdata = async () => {
    try {
      const response = await axios.post(
        `https://localhost:7202/api/Admin/GetOrder`,
        {
          orderID: "",
        }
      );
      console.log("orderData", response.data.orders);
      setOrderData(response.data.orders);
    } catch (error) {
      console.log("ไม่สามารถดึงข้อมูลได้");
    }
  };
  useEffect(() => {
    fetchingOrderdata();
    fetchingFulldata();
  }, []);

  const filterOrderData = (orderStatus) => {
    console.log(orderStatus);
    return orderDetailData
      ? orderDetailData.filter((item) => item.orderDetailStatus === orderStatus)
          .length
      : 0;
  };

  const filtertebleData = () => {
    return customerData
      ? customerData.filter((item) => item.tableStatus === "มีลูกค้า").length
      : 0;
  };

  const month_name = (datetime) => {
    const date = new Date(datetime);
    const mlist = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฏาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ];
    return mlist[date.getMonth()];
  };

  return (
    <>
      <SideBarAdmin staftID={staftID} />
      <NavbarAdmin staftID={staftID} />
      <div className="mainMenu">
        <p
          className="my-3 border border-dark bg-white p-2 rounded-5 d-flex justify-content-center"
          style={{ maxWidth: "220px" }}
        >
          dashboard
        </p>

        <div className="d-flex flex-column justify-content-center align-items-center">
          <div
            style={{
              maxWidth: "1100px",
              MaxHeight: "1000px",
              backgroundColor: "#FDF2E9",
            }}
            className="p-3 mb-3 rounded-3 "
          >
            <div
              className="d-flex flex-row justify-content-center align-items-center"
              style={{ gap: "25px" }}
            >
              <div
                style={{
                  width: "220px",
                  height: "110px",
                  border: "1px solid #EB5B00",
                }}
                className=" shadow-sm rounded-3 p-3 bg-white"
              >
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <i class="bi bi-card-list" style={{ fontSize: "3rem" }}></i>
                  <div className="d-flex flex-column justify-content-between align-items-center">
                    <p
                      style={{
                        fontSize: "0.7rem",
                        color: "gray",
                        lineHeight: 1,
                      }}
                    >
                      ยอดขาย
                    </p>
                    <p style={{ fontSize: "1.5rem" }}>
                      {revenueData.reduce(
                        (totalAmount, currentItem) =>
                          totalAmount + currentItem.netAmount,
                        0
                      )}{" "}
                      บาท
                    </p>
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: "220px",
                  height: "110px",
                  border: "1px solid #EB5B00",
                }}
                className=" shadow-sm rounded-3 p-3 bg-white"
              >
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <i class="bi bi-card-list" style={{ fontSize: "3rem" }}></i>
                  <div className="d-flex flex-column justify-content-between align-items-center">
                    <p
                      style={{
                        fontSize: "0.7rem",
                        color: "gray",
                        lineHeight: 1,
                      }}
                    >
                      จำนวนรายการสั่ง
                    </p>
                    <p style={{ fontSize: "1.5rem" }}>
                      {orderData.length} รายการ
                    </p>
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: "220px",
                  height: "110px",
                  border: "1px solid #EB5B00",
                }}
                className="  shadow-sm rounded-3 p-3 bg-white"
              >
                {" "}
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <i class="bi bi-cash-coin" style={{ fontSize: "3rem" }}></i>
                  <div className="d-flex flex-column justify-content-between align-items-center">
                    <p
                      style={{
                        fontSize: "0.7rem",
                        color: "gray",
                        lineHeight: 1,
                      }}
                    >
                      รายได้
                    </p>
                    <p style={{ fontSize: "1.5rem" }}>
                      {revenueData.reduce(
                        (totalAmount, currentItem) =>
                          totalAmount + currentItem.netAmount,
                        0
                      )}{" "}
                      บาท
                    </p>
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: "220px",
                  height: "110px",
                  border: "1px solid #EB5B00",
                }}
                className=" shadow-sm rounded-3 p-3 bg-white"
              >
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <i class="bi bi-person" style={{ fontSize: "3rem" }}></i>
                  <div className="d-flex flex-column justify-content-between align-items-center">
                    <p
                      style={{
                        fontSize: "0.7rem",
                        color: "gray",
                        lineHeight: 1,
                      }}
                    >
                      จำนวนโต๊ะที่มีลูกค้าใช้บริการ
                    </p>
                    <p style={{ fontSize: "1.5rem" }}>
                      {filtertebleData()}/{customerData.length} โต๊ะ
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <Row
              className="mt-5 d-flex justify-content-center align-items-center"
              style={{ gap: "20px" }}
            >
              <Col
                xs={6}
                // style={{ maxHeight: "250px" }}
              >
                {/*<div
                  className=" bg-white shadow-sm rounded-3 p-3 mb-3"
                  style={{ height: "250px" }}
                >
                  <p>กราฟแสดงแนวโน้มยอดขายรายเดือน:</p>
                </div>*/}
                {/*} <SaleChart/>*/}
                {/*} <div
                  className=" bg-white shadow-sm rounded-3  p-3 mt-2"
                  style={{ height: "250px" }}
                >
                  <p>กราฟ ช่วงของการสั่ง order</p>
                </div>*/}
                <div
                  className="bg-white shadow-sm rounded-3 p-3 mt-2"
                  style={{ height: "300px" }}
                >
                  <p>กราฟแสดงแนวโน้มยอดขายรายเดือน:</p>
                </div>
                <OrderRangeChart />
              </Col>
              <Col
                xs={5}
                //style={{ maxHeight: "450px" }}
              >
                <BestMenuCard />

                <Card
                  className=" bg-white shadow-sm rounded-3 "
                  style={{ height: "230px", border: "1px solid #EB5B00" }}
                >
                  <Card.Header className="d-flex  align-items-center justify-content-between">
                    <p>สถานะของรายการ</p>
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
                        <p style={{ fontSize: "2rem", textAlign: "center" }}>
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
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};
export default DashBoardPage;
