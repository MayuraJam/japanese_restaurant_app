import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Component/sideNavigation.css";
import { React, useState } from "react";
import NavbarMain from "../Component/navBarMain";
import {Row,Col} from 'react-bootstrap';
import "../Customer/selectMenu.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import backgroundPicture from '../image/circle.jpg'
import Picture1 from '../image/food.jpg'
import Picture2 from '../image/restuarant.jpg'
import { useNavigate } from "react-router-dom";

const CustomerLogin = () => {
  const toMenuPage = useNavigate();
  return (
    <>
      <NavbarMain />
      <div style={{ marginTop: "50px", height: "calc(100vh - 50px)",backgroundImage: `url(${backgroundPicture})`,backgroundSize:'cover'}} className=" p-3 d-flex flec-column justify-content-center">
        <Row className="justify-content-center">
         <Col>
         <div className="me-3" style={{width: "350px"}}>
         <img
              src={Picture2}
              //alt={user.firstName}
              className="img-fluid border border-dark mb-3 border-2"
              style={{
                width: "350px",
                //width:"100%",
                height: "300px",
                objectFit: "cover",
                backgroundColor: "#ffff",
              }}
            />
          <img
              src={Picture1}
              //alt={user.firstName}
              className="img-fluid border border-dark border-2"
              style={{
                width: "350px",
                //width:"100%",
                height: "180px",
                objectFit: "cover",
                backgroundColor: "#ffff",
              }}
            />
        </div>
         </Col>
        <Col className="border border-dark border-2 d-flex flex-column justify-content-center align-items-center bg-white">
        <div style={{width: "600px"}}>
        <center>
        <img
              //src=''
              //alt={user.firstName}
              className="img-fluid rounded-circle mb-4 mt-3"
              style={{
                width: "130px",
                height: "130px",
                objectFit: "cover",
                backgroundColor: "#ffff",
                border:'5px solid #EB5B00'
              }}
            />
                      <p className="border border-info p-2 mb-5">
                        <strong>
                        ชื่อร้านอาหารญี่ปุ่น
                        </strong>
                      </p>
         <button className="p-2 innerbutton" onClick={()=>toMenuPage("/Customer/menupage")}><i class="bi bi-egg-fried me-2"></i> เริ่มสั่งอาหาร</button>
          </center>
        </div>
        </Col>
        </Row>
      </div>
    </>
  );
};
export default CustomerLogin;
