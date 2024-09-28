import { React, useState } from "react";
import SideBarCustomer from "../Component/sideNavigationCustomer";
import "../CSS_file/sideNavigation.css";
import "../CSS_file/selectMenu.css";
import NavbarCustomer from "../Component/navBarCustomer";
import {
  Nav,
  Navbar,
  NavDropdown,
  Container,
  Button,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const ReviewPage = () => {
  const [rating, setRating] = useState(0);
  return (
    <>
      <SideBarCustomer />
      <NavbarCustomer />
      <div
        className="mainMenu border border-info p-3"
        style={{ height: "calc(100vh - 50px)" }}
      >
        <h4 className="my-3">ให้คะแนนและเขียนรีวิว</h4>
        <center>
          <div
            style={{ width: "800px", height: "100px" }}
            className="border border-dark rounded-3 p-3 bg-white" 
          >
            <div className="d-flex flex-row align-items-center justify-content-between">
              <div className="d-flex flex-row align-items-center ">
                <img
                  src={"Picture2"}
                  //alt={user.firstName}
                  className="img-fluid border border-dark mb-3 me-3"
                  style={{
                    width: "60px",
                    //width:"100%",
                    height: "60px",
                    objectFit: "cover",
                    backgroundColor: "#ffff",
                  }}
                />
                <h4>ชื่ออาหาร</h4>
              </div>
              <div className="d-flex flex-column align-items-between">
                <p style={{ fontSize: "0.9rem", color: "gray" }}>
                  หมายเลขรายการอาหาร : xxx{" "}
                </p>
                <p
                  style={{ fontSize: "0.9rem" }}
                  className="border border-info rounded-5"
                >
                  ประเภทเมนู
                </p>
              </div>
            </div>
          </div>
        </center>
        <div>
          <h5 className="my-4">ส่วนของการให้คะแนนความพึ่งพอใจ</h5>
          <center>
            <div
              style={{ width: "600px", height: "80px" }}
              className="border border-dark rounded-3 mb-4 d-flex align-items-center justify-content-center bg-white"
            >
              {[1, 2, 3, 4, 5].map((star) => {
                return (
                  <span
                    className="start"
                    style={{
                      cursor: "pointer",
                      color: rating >= star ? "gold" : "gray",
                      fontSize: `35px`,
                      marginRight: "20px",
                    }}
                    onClick={() => {
                      setRating(star);
                    }}
                  >
                    {"   "}★{"   "}
                  </span>
                );
              })}
            </div>
          </center>
        </div>
        <center>
          <div
            style={{ width: "600px", height: "180px" }}
            className="border border-dark rounded-3 mb-4 p-2 bg-white"
          >
            <h5><i class="bi bi-pen me-2"></i>ส่วนของการเขียนรีวิว</h5>
            <div className="d-flex align-items-center justify-content-center">
            <form>
              <textarea
                rows="4"
                cols="65"
                placeholder="พิมพ์ข้อความที่นี่..."
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  resize: "none", // ปิดการปรับขนาดของ textarea
                  marginRight:'10px',
                  fontSize:'1rem'
                }}
              />
            </form>
            <div className="btn btn-outline-info"><i class="bi bi-send"></i></div>
            </div>
          </div>
        </center>
      </div>
    </>
  );
};
export default ReviewPage;
