import { useState, useEffect } from "react";
import { Button, Modal, Alert, Row, Col, Card } from "react-bootstrap";
import SideBarAdmin from "../Component/sideNavigationAdmin";
import "../CSS_file/sideNavigation.css";
import "../CSS_file/selectMenu.css";
import NavbarAdmin from "../Component/NavBarAdmin";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const BestMenuCard = ()=>{
    const [selectnumber, setSelectNumber] = useState(5);
    const [menuData, setMenuData] = useState([]);

    //ดึงข้อมูลเมนูทั้งหมด
    const fetchingMenudata = async (number) => {
        try {
          const response = await axios.post(
            `https://localhost:7202/api/Admin/GetBestMenu`,{
              number : number
            },
          );
          console.log("response :", response.data.menuList);
          setMenuData(response.data.menuList);
        } catch (error) {
          console.log("ไม่สามารถดึงข้อมูลได้");
        }
      };
    
      useEffect(() => {
        fetchingMenudata(selectnumber);
      }, []);
    
      //การเลือกช่วงเพื่อดูความนิยมของลูกค้า
      const handleSelectNumberTop = (value) => {
        console.log("number :",value)
        setSelectNumber(value);
        fetchingMenudata(value);
      };
   return(
    <>
        <Card
                  className=" bg-white shadow-sm rounded-3 mb-3"
                  style={{ height: "430px", border:"1px solid #EB5B00" }}
                >
                  <Card.Header>เมนูยอดฮิต</Card.Header>
                  <Card.Text className="p-2 shadow-sm d-flex justify-content-around align-items-center">
                    <button
                      style={{
                        border:
                          selectnumber === 5 ? "none" : "1px solid #EB5B00",
                        color: selectnumber === 5 ? "#F9E79F" : "#EB5B00",
                        fontSize: "0.8rem",
                        backgroundColor:
                          selectnumber === 5 ? "#EB5B00" : "#F9E79F",
                      }}
                      className="p-2 rounded-3 px-3 "
                      onClick={() => {
                        handleSelectNumberTop(5);
                      }}
                    >
                      5 ลำดับ
                    </button>
                    <button
                      style={{
                        border:
                          selectnumber === 10 ? "none" : "1px solid #EB5B00",
                        color: selectnumber === 10 ? "#F9E79F" : "#EB5B00",
                        fontSize: "0.8rem",
                        backgroundColor:
                          selectnumber === 10 ? "#EB5B00" : "#F9E79F",
                      }}
                      className="p-2 rounded-3 px-3 "
                      onClick={() => {
                        handleSelectNumberTop(10);
                      }}
                    >
                      10 ลำดับ
                    </button>
                    <button
                      style={{
                        border:
                          selectnumber === 15 ? "none" : "1px solid #EB5B00",
                        color: selectnumber === 15 ? "#F9E79F" : "#EB5B00",
                        fontSize: "0.8rem",
                        backgroundColor:
                          selectnumber === 15 ? "#EB5B00" : "#F9E79F",
                      }}
                      className="p-2 rounded-3 px-3 "
                      onClick={() => {
                        handleSelectNumberTop(15);
                      }}
                    >
                      15 ลำดับ
                    </button>
                  </Card.Text>
                  <Card.Text className="p-3" style={{ overflowY: "auto" }}>
                    <table className="table table-striped">
                     
                      <tbody>
                        {menuData?.map((item) => (
                          <tr key={menuData.menuID}>
                            <th>
                              <img
                                src={item.imageSrc}
                                //alt={user.firstName}
                                className="img-fluid  mb-3 rounded-2"
                                style={{
                                  width: "50px",
                                  //width:"100%",
                                  height: "50px",
                                  objectFit: "cover",
                                  alt: "MenuImage",
                                }}
                              />
                            </th>
                            <th>{item.menuName}</th>
                            <th>{(item.rating).toFixed(2)}</th>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Card.Text>
                </Card>
    </>
   );
}
export default BestMenuCard;