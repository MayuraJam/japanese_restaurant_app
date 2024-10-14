import {React,useEffect,useState} from "react";
import SideBarAdmin from "../Component/sideNavigationAdmin";
import "../CSS_file/sideNavigation.css";
import "../CSS_file/selectMenu.css";
import NavbarAdmin from "../Component/NavBarAdmin";
import { Nav, Navbar, NavDropdown, Container, Row, Col,Card } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useParams } from "react-router-dom";
import axios from "axios";
const TablePage = () => {
  const { staftID } = useParams();
 const [tableData,setTableData] = useState([]);

  const fetchingTabledata = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7202/api/Admin/GetTable`
      );
      console.log("response :", response.data.tableList);
      setTableData(response.data.tableList);
    } catch (error) {
      console.log("ไม่สามารถดึงข้อมูลโต๊ะได้ :",error);
    }
  };
  useEffect(() => {
    fetchingTabledata();
  }, []);

  const freeTable = 
    tableData.filter(
      (item)=> item.tableStatus === "ว่าง"
    );
  

  const reservedTable = 
    tableData.filter(
      (item)=> item.tableStatus === "มีลูกค้า"
    );
  
  return (
    <div>
      <SideBarAdmin staftID={staftID}/>
      <NavbarAdmin staftID={staftID}/>
      <div
        className="mainMenu "
       style={{ height: "calc(100vh - 50px)" }}
      >
        <p
          className="my-3 border border-dark bg-white p-2 rounded-5 d-flex justify-content-center"
          style={{ maxWidth: "220px" }}
        >
          รายการโต๊ะ
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(480px,480px))",
            gap: "10px",
            marginLeft: "20px",
          }}
        >
          {freeTable.length===0?(
               <div className="shadow-sm p-2 rounded-3 bg-white" >
               <div className="d-flex flex-row justify-content-between align-items-center">
               <p>โต๊ะที่ไม่มีลูกค้า</p>  
               <p className="border p-2 rounded-3 bg-secondary text-warning ">{freeTable.length} โต๊ะ</p>
               </div>
                 <hr className="text-secondary" />
                 <div
                   className=" p-2"
                   style={{
                     display: "grid",
                     gridTemplateColumns: "repeat(auto-fill,minmax(12rem,12rem))",
                     gap: "10px",
                     height: "330px",
                     overflowY: "auto",
                   }}
                 >
                  <p>โต๊ะถูกจองหมดแล้ว</p>
                  </div>
                  </div>
          ):(
          <div className="shadow-sm p-2 rounded-3 bg-white" >
          <div className="d-flex flex-row justify-content-between align-items-center">
          <p>โต๊ะที่ไม่มีลูกค้า</p>  
          <p className="border p-2 rounded-3 bg-secondary text-warning ">{freeTable.length} โต๊ะ</p>
          </div>
            <hr className="text-secondary" />
            <div
              className=" p-2"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(12rem,12rem))",
                gap: "10px",
                height: "350px",
                overflowY: "auto",
              }}
            >
              {freeTable.map((item)=>(
            <Card border="primary" bg='secondary' text='warning' style={{ width: "12rem",height:"12rem" }}>
                <Card.Header style={{fontSize:'1rem'}}>รหัสโต๊ะ : {item.tableID}</Card.Header>
                <Card.Body>
                  <Card.Title>สถานะ : {item.tableStatus}</Card.Title>
                  <hr className="text-warning" />
                  <Card.Text style={{fontSize:'0.8rem'}}>
                 <p >จำนวนที่นั่ง : {item.seat} ที่นั่ง</p>
                 <p>รูปแบบที่นั่ง : {item.seatType}</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
            </div>
          </div>

          )}
          {reservedTable.length===0?(
            <div className="shadow-sm p-2 rounded-3 bg-white" >
            <div className="d-flex flex-row justify-content-between align-items-center">
            <p>โต๊ะที่มีลูกค้า</p>  
            <p className="border p-2 rounded-3 bg-warning text-secondary ">{reservedTable.length} โต๊ะ</p>
            </div>
              <hr className="text-secondary" />
              <div
                className=" p-2"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill,minmax(12rem,12rem))",
                  gap: "10px",
                  height: "350px",
                  overflowY: "auto",
                }}
              > 
              <p>ไม่มีโต๊ะที่ถูกจอง</p>
              </div>
              </div>
              ):(
          <div className="shadow-sm p-2 rounded-3 bg-white" >
          <div className="d-flex flex-row justify-content-between align-items-center">
          <p>โต๊ะที่มีลูกค้า</p>  
          <p className="border p-2 rounded-3 bg-warning text-secondary ">{reservedTable.length} โต๊ะ</p>
          </div>
            <hr className="text-secondary" />
            <div
              className=" p-2"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(12rem,12rem))",
                gap: "10px",
                height: "350px",
                overflowY: "auto",
              }}
            > 
              {reservedTable.map((item)=>(
            <Card border="primary" bg='warning' style={{ width: "12rem" ,height:"12rem"}}>
                <Card.Header style={{fontSize:'1rem'}}>รหัสโต๊ะ : {item.tableID}</Card.Header>
                <Card.Body>
                  <Card.Title style={{fontSize:'0.9rem'}}>รหัสลูกค้า : {item.customerID}</Card.Title>
                  <hr className="text-secondary" />
                  <Card.Text style={{fontSize:'0.8rem'}}>
                 <p >จำนวนที่นั่ง : {item.seat} ที่นั่ง</p>
                 <p>รูปแบบที่นั่ง : {item.seatType}</p>
                  </Card.Text>
                </Card.Body>
              </Card>
              ))}
           
            </div>
          </div>
           )}
        </div>
      </div>
    </div>
  );
};
export default TablePage;
