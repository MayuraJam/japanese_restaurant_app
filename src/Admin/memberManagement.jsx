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

  //เก็บสีไว้
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
  const [memberData, setMemberData] = useState([]);
  const [menuSelect, setMenuSelect] = useState("all");
  const [fullData,setFullData] = useState([]);
  //const [showUsePoint,setUsePoint] = useState(0);
  //const [showGetPoint,setGetPoint] = useState(0);

  // การกรองด้วยช่วงตัวเลข มากสุกไปน้อยสุด
  const handleChanghSelect=(e)=>{
    const value = e.target.value;
    setMenuSelect(value);
    if (value !== "all") {
      const [minValue, maxValue] = value.split('-').map(Number);
      console.log("ช่วงที่เลือก:", minValue, "ถึง", maxValue);
      const filterData = fullData.filter((newitem) => {
        return newitem.totalPoint >= minValue && newitem.totalPoint <= maxValue;
      });
    console.log("filterData",filterData);
    setMenuSelect(value);
     setMemberData(filterData);
    } else if (value === "all") {
      console.log("เลือกทั้งหมด");
      setMenuSelect("all");
      setMemberData(fullData);
    }
}

//การดึงข้อมูลลูกค้า
  const fetchingMemberdata = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7202/api/Auth/GetMember/${"ลูกค้า"}`
      );
      console.log(response.data.customerList)
      setMemberData(response.data.customerList);
      setFullData(response.data.customerList);
    } catch (error) {
      console.log("ไม่สามารถดึงข้อมูลได้ :", error);
    }
  };
  useEffect(() => {
    fetchingMemberdata();
  }, []);

  //การคำนวณแต้มรวม
  const usePointSum = ()=>{
    const usePoint = memberData.pointlList?.filter((item) => item.description === "ใช้แต้มในการชำระสินค้า")
    .reduce((total, currentItem) => {
      return total + currentItem.currentPoint;
    }, 0); 
    return usePoint;
  }
  const usePoint = usePointSum();
  console.log("use Point",usePoint);
  
  //การสุ่มสีพื้นหลัง
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
        <div className="d-flex flex-row justify-content-end ms-auto" style={{width:"200px"}}>
        <select class="form-select form-select-sm me-3" onChange={handleChanghSelect} value={menuSelect}>
          <option selected value="all">ระดับคะแนนสะสมรวม</option>
          <option value="0-29">0-29</option>
          <option value="30-69">30-69</option>
          <option value="70-109">70-109</option>
          <option value="110-149">110-149</option>
          <option value="150-189">150-189</option>
          <option value="190-229">190-229</option>
          <option value="230-269">230-269</option>
          <option value="270-309">270-309</option>
          <option value="310-320">310-320</option>
        </select>
        </div>
        <div className="container p-4">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 d-flex">
            {memberData.map((item) => (
              <div
                className="col  rounded-3 p-2 bg-white me-2 mb-2"
                style={{
                  maxWidth: "240px",
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
          </div>
        </div>
      </div>
    </div>
  );
};
export default MemberManagementPage;
