import { React, useEffect, useState } from "react";
import SideBarAdmin from "../Component/sideNavigationAdmin";
import "../CSS_file/sideNavigation.css";
import "../CSS_file/selectMenu.css";
import NavbarAdmin from "../Component/NavBarAdmin";
import { Row, Col, Button, Card, Form } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useParams } from "react-router-dom";
import axios from "axios";
const MemberManagementPage = () => {
  const { staftID } = useParams();
  const colorCode = [
    "#FFE3E3",
    "#E4E0E1",
    "#FFF7D1",
    "#C1CFA1",
    "#F5EFFF",
    "#D2E0FB",
    "#FFF4EA",
    "#DEE5D4",
    "#EAE4DD",
    "#FF8A8A",
    "#D1E9F6",
    "#B5CFB7",
    "#91DDCF",
  ];
  //สุ่มเปล่ยนสีพื้นหลัง
  const [memberData, setMemberData] = useState([]);
  //const [showUsePoint,setUsePoint] = useState(0);
  //const [showGetPoint,setGetPoint] = useState(0);

  const fetchingTabledata = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7202/api/Auth/GetMember/${"ลูกค้า"}`
      );
      console.log("response :", response.data.customerList);
      setMemberData(response.data.customerList);
    } catch (error) {
      console.log("ไม่สามารถดึงข้อมูลได้ :", error);
    }
  };
  useEffect(() => {
    fetchingTabledata();
  }, []);

  const usePointSum = ()=>{
    const usePoint = memberData.pointlList?.filter((item) => item.description === "ใช้แต้มในการชำระสินค้า")
    .reduce((total, currentItem) => {
      return total + currentItem.currentPoint;
    }, 0); 
    return usePoint;
  }
  const usePoint = usePointSum();
  console.log("use Point",usePoint);

  {/*item.pointlList?.filter((condition)=>condition.description==="ใช้แต้มในการชำระสินค้า").reduce((total, currentItem)=>total + currentItem.currentPoint,0)*/};
  {/*item.orderDetailList.reduce(
    (totalQuant, currentItem) =>
      totalQuant + currentItem.quantity,
    0
  )*/}
  //setUsePoint(usePointSum);

    /*const getDateFormate=(datetime)=>{
      const day = datetime.getDate();
      const month = datetime.getMonth();
      const year = datetime.getFullYear();
      return `${day}/${month}/${year}`;
    }*/

      const genRandomBgColor=()=>{
        const ranColor =  colorCode[(Math.floor(Math.random()*colorCode.length))];
        return ranColor;
      }
  return (
    <div>
      <SideBarAdmin staftID={staftID} />
      <NavbarAdmin staftID={staftID} />
      <div className="mainMenu" style={{ height: "calc(100vh - 50px)" }}>
        <p
          className="my-3 border border-dark bg-white p-2 rounded-5 d-flex justify-content-center"
          style={{ maxWidth: "220px" }}
        >
          บัญชีลูกค้า
        </p>
        <div className="container p-4">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
            {memberData.map((item) => (
              <div
                className="col  rounded-3 p-2 bg-white me-2 mb-2"
                style={{
                  maxWidth: "280px",
                  height: "100%",
                  border: "1px solid #EB5B00",
                }}
              >
                <div className="d-flex" style={{ gap: "20px" }}>
                  <div
                    style={{ width: "60px", height: "60px" ,backgroundColor:genRandomBgColor()}}
                    className="border border-dark rounded-5 d-flex align-items-center justify-content-center"
                  >
                    <p
                      className="mb-0"
                      style={{ fontSize: "1.5rem", fontWeight: "bold"}}
                    >
                      {(item.firstname[0])}
                    </p>
                  </div>
                  <div className="p-1">
                    <p
                      style={{
                        fontSize: "1rem",
                        fontWeight: "bold",
                        lineHeight: "1rem",
                      }}
                    >
                      {item.firstname} {item.lastname}
                    </p>
                    <p style={{ fontSize: "0.8rem", lineHeight: "0.8rem" }}>
                      {item.email}
                    </p>
                    <p style={{ fontSize: "0.8rem", lineHeight: "0.8rem" }}>
                      {item.phone}
                    </p>
                 
                  </div>
                </div>
                <div
                  className="d-flex flex-row justify-content-center p-1 rounded-3"
                  style={{
                    gap: "10px",
                    backgroundColor: "#1A5276",
                    color: "#F9E79F",
                  }}
                >
                  <div className="d-flex flex-column justify-content-center align-items-center ">
                    <p style={{ fontSize: "0.8rem", lineHeight: "0.6rem" }}>
                      แต้มสะสมปัจจุบัน
                    </p>
                    <p
                      style={{ fontSize: "1rem", lineHeight: "0.6rem" }}
                      className="mb-2"
                    >
                      {item.pointlList?.filter(
                        (condition)=>condition.description==="ได้รับแต้ม" || condition.description==="ได้รับแต้ม เนื่องจากเป็นสมาชิกใหม่")
                        .reduce((total, currentItem)=>total + currentItem.currentPoint,0)-item.pointlList?.filter(
                        (condition)=>condition.description==="ใช้แต้มในการชำระสินค้า")
                        .reduce((total, currentItem)=>total + currentItem.currentPoint,0)}
                    </p>
                  </div>
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <p style={{ fontSize: "0.8rem", lineHeight: "0.6rem" }}>
                      ได้แต้ม
                    </p>
                    <p
                      style={{ fontSize: "1rem", lineHeight: "0.6rem" }}
                      className="mb-2"
                    >
                      {item.pointlList?.filter(
                        (condition)=>condition.description==="ได้รับแต้ม" || condition.description==="ได้รับแต้ม เนื่องจากเป็นสมาชิกใหม่")
                        .reduce((total, currentItem)=>total + currentItem.currentPoint,0)}
                    </p>
                  </div>
                  <div className="d-flex flex-column justify-content-center align-items-center ">
                    <p style={{ fontSize: "0.8rem", lineHeight: "0.6rem" }}>
                      ใช้แต้ม
                    </p>
                    <p
                      style={{ fontSize: "1rem", lineHeight: "0.6rem" }}
                      className="mb-2"
                    >
                      {item.pointlList?.filter((condition)=>condition.description==="ใช้แต้มในการชำระสินค้า").reduce((total, currentItem)=>total + currentItem.currentPoint,0)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div
              className="col  rounded-3 p-2 bg-white me-2"
              style={{
                maxWidth: "230px",
                height: "100%",
                border: "1px solid #EB5B00",
              }}
            >
              <div className="d-flex" style={{ gap: "20px" }}>
                <div
                  style={{ width: "60px", height: "60px" }}
                  className="border border-dark rounded-5 d-flex align-items-center justify-content-center"
                >
                  <p
                    className="mb-0"
                    style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                  >
                    4
                  </p>
                </div>
                <div className="p-1">
                  <p
                    style={{
                      fontSize: "1rem",
                      fontWeight: "bold",
                      lineHeight: "1rem",
                    }}
                  >
                    ชื่อ-นามสกุล
                  </p>
                  <p style={{ fontSize: "0.8rem", lineHeight: "0.8rem" }}>
                    @อีเมล :
                  </p>
                  <p style={{ fontSize: "0.8rem", lineHeight: "0.8rem" }}>
                    เบอร์โทรศัพท์ :
                  </p>
                 
                </div>
              </div>
              <div
                className="d-flex flex-row justify-content-center p-1 rounded-3"
                style={{
                  gap: "10px",
                  backgroundColor: "#1A5276",
                  color: "#F9E79F",
                }}
              >
                <div className="d-flex flex-column justify-content-center align-items-center ">
                  <p style={{ fontSize: "0.8rem", lineHeight: "0.6rem" }}>
                    แต้มรวม
                  </p>
                  <p
                    style={{ fontSize: "1rem", lineHeight: "0.6rem" }}
                    className="mb-2"
                  >
                    100
                  </p>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <p style={{ fontSize: "0.8rem", lineHeight: "0.6rem" }}>
                    ได้แต้ม
                  </p>
                  <p
                    style={{ fontSize: "1rem", lineHeight: "0.6rem" }}
                    className="mb-2"
                  >
                    60
                  </p>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center ">
                  <p style={{ fontSize: "0.8rem", lineHeight: "0.6rem" }}>
                    ใช้แต้ม
                  </p>
                  <p
                    style={{ fontSize: "1rem", lineHeight: "0.6rem" }}
                    className="mb-2"
                  >
                    40
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MemberManagementPage;
