import { useState, useEffect } from "react";
import { Row, Col, Card, Button, Modal } from "react-bootstrap";
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
import MenuStatusCard from "../Component/menuStatusCard";

const DashBoardPage = () => {
  const { staftID } = useParams();
  const [revenueData, setRevenueData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [originalOrderData,setOriginalOrderdata] = useState([]);
  const [originalRevenueData,setOriginalRevenuedata] = useState([]);
  const [filterdate, setFilterDate] = useState(new Date());
  const [selectMonth, setSelectMonth] = useState(new Date());

  //ดึงข้อมูล order ทั้งหมด
  const fetchingFulldata = async () => {
    try {
      const response2 = await axios.get(
        `https://localhost:7202/api/Admin/GetTable`
      );
      const response3 = await axios.get(
        `https://localhost:7202/api/Admin/GetRevenue`
      );
      setCustomerData(response2.data.tableList);
      setRevenueData(response3.data.revenueList);
      console.log("revenue",response3.data.revenueList);
      setOriginalRevenuedata(response3.data.revenueList)
      
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
     
      setOrderData(response.data.orders);
      setOriginalOrderdata(response.data.orders)
    } catch (error) {
      console.log("ไม่สามารถดึงข้อมูลได้");
    }
  };
  useEffect(() => {
    fetchingOrderdata();
    fetchingFulldata();
  }, []);

  const filtertebleData = () => {
    return customerData
      ? customerData.filter((item) => item.tableStatus === "มีลูกค้า").length
      : 0;
  };
   //กำหนดหลักโดยจุด
   function seperateNumber (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}
  
  useEffect(() => {
    filterDataByMonth(selectMonth);
  },[selectMonth])

  const filterDataByMonth = (selectMonth)=>{
    if(!selectMonth){
      setOrderData(originalOrderData);
      setRevenueData(originalRevenueData);
    }else{ 
    const orderFilter = originalOrderData?.filter((order)=>{
      const orderDate = new Date(order.orderDate);
      const orderMY = `${orderDate.getFullYear()}-${(orderDate.getMonth()+1).toString().padStart(2, '0')}`;
     return selectMonth ? orderMY === selectMonth : true;
    })
    const revenueFilter = originalRevenueData?.filter((revenue)=>{
      const revenueDate = new Date(revenue.createDate);
      const revenueMY = `${revenueDate.getFullYear()}-${(revenueDate.getMonth()+1).toString().padStart(2, '0')}`;
     return selectMonth ? revenueMY === selectMonth : true;
    })

    setOrderData(orderFilter);
    setRevenueData(revenueFilter);
   }
  }

  const openInNewTab = (nextPageUrl) => {
    const newWindow = window.open();
    newWindow.location.href = nextPageUrl;
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  
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
        <div className="d-flex justify-content-end">
          <label style={{ fontSize: "0.8rem", color: "gray" }} className="me-2">เลือกดูตามเดือน</label>
          <input type="month" style={{fontSize:"0.8rem"}} 
               value={selectMonth} 
               onChange={(e)=>setSelectMonth(e.target.value)}
               />
     
        </div>

      
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
                      {seperateNumber(revenueData.reduce(
                        (totalAmount, currentItem) =>
                          totalAmount + currentItem.netAmount,
                        0
                      ))}{" "}
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
                    {seperateNumber(revenueData.reduce(
                        (totalAmount, currentItem) =>
                          totalAmount + currentItem.netAmount,
                        0
                      ))}{" "}
                      บาท
                    </p>
                  </div>
                </div>
              </div>
              <div style={{width:"1px",height:"20px",backgroundColor:"#EB5B00"}} className="mx-1"></div>
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
                {/*<input
                  type="month"
                  style={{ fontSize: "0.8rem" }}
                  value={selectMonth}
                  onChange={(e) => setSelectMonth(e.target.value)}
                />*/}
                <SaleChart selectMonth={selectMonth} />
                <OrderRangeChart selectMonth={selectMonth} />
              </Col>

              <Col
                xs={5}
                //style={{ maxHeight: "450px" }}
              >
                <BestMenuCard />
                <MenuStatusCard />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};
export default DashBoardPage;
