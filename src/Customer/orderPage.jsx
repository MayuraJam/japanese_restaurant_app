import React from "react";
import SideBarCustomer from "../Component/sideNavigationCustomer";
import "../Component/sideNavigation.css";
import "../Customer/selectMenu.css";
import NavbarMenu from "../Component/navBarCustomer";
import "../Component/dataTeble.css"
import {
  Nav,
  Navbar,
  NavDropdown,
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import Picture2 from "../image/restuarant.jpg";

const OrderConfirmPage = () => {
  return (
    <div>
      <SideBarCustomer />
      <NavbarMenu />
      <div className="mainMenu border border-info">
        <div
          className="border border-black p-3 rounded-3 bg-white"
          style={{ Height: "525px" }}
        >
          <div
           >
            <div className="d-flex justify-content-between">
            <p>ติดตามรายการอาหาร</p>
            <div className="d-flex flex-column m-0">
            <p>รหัสการสั่งอาหาร : xxx</p>
            <p style={{ fontSize: "0.8rem", color: "gray" }}>วันเดือนปี เวลาที่สั่ง</p>
            </div>
            </div>
            <hr variant="secondary" />
            <table className="table table-striped border border-dark">
              <thead>
                <tr>
                  <th className="border border-info">ภาพเมนู</th>
                  <th>ชื่อเมนู</th>
                  <th>จำนวน</th>
                  <th>ราคา</th>
                  <th className="border border-info">สถานะ</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="border border-info">
                <tr>
                  <th>
                    <img
                      src={Picture2}
                      //alt={user.firstName}
                      className="img-fluid border border-dark mb-3 rounded-2"
                      style={{
                        width: "50px",
                        //width:"100%",
                        height: "50px",
                        objectFit: "cover",
                        alt: "MenuImage",
                      }}
                    />
                  </th>
                  <th>
                    <div className="d-flex flex-column m-0">
                      <p style={{ fontSize: "0.9rem" }}>ชื่อเมนู</p>
                      <p style={{ fontSize: "0.8rem", color: "gray" }}>
                        optionName
                      </p>
                    </div>
                  </th>
                  <th>จำนวนสินค้า</th>
                  <th>
                    <div style={{ fontSize: "0.9rem" }}>ราคา บาท</div>
                  </th>
                  <th>
                    <p style={{ fontSize: "0.9rem" }} className="bg-warning p-2 border rounded-3 d-flex justify-content-center">
                    กำลังปรุง
                    </p>
                  </th>
                  <th> <Button
                       variant="outline-danger"
                     >
                       <i class="bi bi-x-circle"></i>
                     </Button>
                  </th>
                </tr>
                <tr>
                  <th>
                    <img
                      src={Picture2}
                      //alt={user.firstName}
                      className="img-fluid border border-dark mb-3 rounded-2"
                      style={{
                        width: "50px",
                        //width:"100%",
                        height: "50px",
                        objectFit: "cover",
                        alt: "MenuImage",
                      }}
                    />
                  </th>
                  <th>
                    <div className="d-flex flex-column">
                      <p style={{ fontSize: "0.9rem" }}>ชื่อเมนู</p>
                      <p style={{ fontSize: "0.8rem", color: "gray" }}>
                        optionName
                      </p>
                    </div>
                  </th>
                  <th>จำนวนสินค้า</th>
                  <th>
                    <div style={{ fontSize: "0.9rem" }}>ราคา บาท</div>
                  </th>
                  <th>
                    <p style={{ fontSize: "0.9rem" }} className="bg-success text-warning p-2 border rounded-3 d-flex justify-content-center">
                    กำลังเสริฟ
                    </p>
                  </th>
                  <th> <Button
                       variant="outline-danger"
                     >
                       <i class="bi bi-x-circle"></i>
                     </Button>
                  </th>
                </tr>
                <tr>
                  <th>
                    <img
                      src={Picture2}
                      //alt={user.firstName}
                      className="img-fluid border border-dark mb-3 rounded-2"
                      style={{
                        width: "50px",
                        //width:"100%",
                        height: "50px",
                        objectFit: "cover",
                        alt: "MenuImage",
                      }}
                    />
                  </th>
                  <th>
                    <div className="d-flex flex-column">
                      <p style={{ fontSize: "0.9rem" }}>ชื่อเมนู</p>
                      <p style={{ fontSize: "0.8rem", color: "gray" }}>
                        optionName
                      </p>
                    </div>
                  </th>
                  <th>จำนวนสินค้า</th>
                  <th>
                    <div style={{ fontSize: "0.9rem" }}>ราคา บาท</div>
                  </th>
                  <th>
                    <p style={{ fontSize: "0.9rem" }} className="p-2 bg-danger text-warning border rounded-3 d-flex justify-content-center">
                    เมนูนี้ถูกยกเลิก
                    </p>
                  </th>
                  <th> <Button
                       variant="outline-danger"
                     >
                       <i class="bi bi-x-circle"></i>
                     </Button>
                  </th>
                </tr>
                <tr>
                  <th>
                    <img
                      src={Picture2}
                      //alt={user.firstName}
                      className="img-fluid border border-dark mb-3 rounded-2"
                      style={{
                        width: "50px",
                        //width:"100%",
                        height: "50px",
                        objectFit: "cover",
                        alt: "MenuImage",
                      }}
                    />
                  </th>
                  <th>
                    <div className="d-flex flex-column">
                      <p style={{ fontSize: "0.9rem" }}>ชื่อเมนู</p>
                      <p style={{ fontSize: "0.8rem", color: "gray" }}>
                        optionName
                      </p>
                    </div>
                  </th>
                  <th>จำนวนสินค้า</th>
                  <th>
                    <div style={{ fontSize: "0.9rem" }}>ราคา บาท</div>
                  </th>
                  <th>
                    <p style={{ fontSize: "0.9rem" }} className="p-2 bg-primary text-white border rounded-3 d-flex justify-content-center">
                    เสริฟสำเร็จ
                    </p>
                  </th>
                  <th> <Button
                       variant="outline-danger"
                     >
                       <i class="bi bi-x-circle"></i>
                     </Button>
                  </th>
                </tr>
              </tbody>
            </table>
            <hr variant="secondary" />
            <div className="d-flex justify-content-end">
              <Button variant="outline-primary"><i class="bi bi-coin me-2"></i>ชำระเงิน</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderConfirmPage;
