import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../CSS_file/sideNavigation.css";
import { React, useState } from "react";
import NavbarMain from "../Component/navBarMain";
import {Row,Col,Button} from 'react-bootstrap';
import "../CSS_file/selectMenu.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import backgroundPicture from '../image/circle.jpg'
import Picture1 from '../image/food.jpg'
import Picture2 from '../image/restuarant.jpg'
import Mainlogo from '../image/phapirun_logo2.jpg'
import { useNavigate } from "react-router-dom";
import sideBannerPicture from "../image/japanese-wave.jpg";

const CustomerLogin = () => {
  const toMenuPage = useNavigate();
  return (
    <>
      <NavbarMain />
      <div style={{ marginTop: "50px", height: "calc(100vh - 50px)",backgroundImage: `url(${backgroundPicture})`,backgroundSize:'cover'}} className=" p-3 d-flex flec-column justify-content-center">
        <Row className="justify-content-center">
        <Col style={{width:"100px",height:"vh-100-20"}}> 
          <img 
            src={sideBannerPicture}
            alt="ลายประกอบ"
            className="img-fluid"
            style={{width:"100%",height:"100%",objectFit: "cover"}}
          />
          </Col>
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
              src={Mainlogo}
              alt="App logo"
              className="img-fluid rounded-circle mb-4 mt-3"
              style={{
                width: "130px",
                height: "130px",
                objectFit: "contain",
                backgroundColor: "#ffff",
                border:'5px solid #EB5B00'
              }}
            />
            <div className="d-flex flex-column align-items-center m-0 mb-2">
                      <p className=" p-2 fs-3" style={{color:"#EB5B00"}}>
                        <strong>
                        {/*Kaset Japanese restaurant*/}
                        Daigoku japanese restaurant
                        </strong>
                      </p>
                      <p className="fs-5" >
                        <strong>
                        {/*Kaset Japanese restaurant*/}
                        ร้านอาหารญี่ปุ่นไดโกกุ
                        </strong>
                      </p>
            </div>
            <hr className="text-secondary" />
         <Button  variant="primary" className="text-warning" onClick={()=>toMenuPage("/Customer/menupage")}><i class="bi bi-egg-fried me-2"></i> เริ่มสั่งอาหาร</Button>
          </center>
        </div>
        </Col>
        </Row>
      </div>
    </>
  );
};
export default CustomerLogin;
