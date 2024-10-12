import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../CSS_file/sideNavigation.css";
import { React, useState } from "react";
import NavbarMain from "../Component/navBarMain";
import {Row,Col} from 'react-bootstrap';
import "../CSS_file/selectMenu.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import backgroundPicture from '../image/circle.jpg'
import Picture1 from '../image/omairi5_ojisan.png';
import Picture2 from '../image/fashion_wafuku_middle_woman.png';
import Mainlogo from '../image/phapirun_logo2.jpg'
import { useNavigate } from "react-router-dom";

const ThankYouPage= ()=>{
    const toStartPage = useNavigate();
    return (
        <>
          <NavbarMain />
          <div style={{ marginTop: "50px", height: "calc(100vh - 50px)",backgroundImage: `url(${backgroundPicture})`,backgroundSize:'cover'}} className=" p-3 d-flex flec-column justify-content-center">
          <div style={{width: "750px"}} className="bg-white border border-dark">
        <div className="d-flex flex-row justify-content-center align-items-center">
          <img
              src={Picture1}
              alt="App logo"
              className="img-fluid "
              style={{
                width: "130px",
                height: "170px",
                objectFit: "contain",
              }}
            />
        <center className="p-3">
        <img
              src={Mainlogo}
              alt="App logo"
              className="img-fluid rounded-circle mb-4 mt-5"
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
            <center>
              <p>-- ขอบคุณที่ใช้บริการ --</p>
              <p>ありがとうございます</p>
            </center>
            <hr className="text-secondary" />
         <button className="btn btn-primary" onClick={()=>toStartPage("/")}>กลับไปหน้าเริ่มต้น</button>
          </center>
          <img
              src={Picture2}
              alt="App logo"
              className="img-fluid "
              style={{
                width: "130px",
                height: "170px",
                objectFit: "contain",
              }}
            />
        </div>
        </div>
          </div>
        </>
    );
}
export default ThankYouPage;