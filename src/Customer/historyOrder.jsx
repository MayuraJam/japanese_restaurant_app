import React from "react";
import SideBarCustomer from "../Component/sideNavigationCustomer";
import "../Component/sideNavigation.css";
import "../Customer/selectMenu.css";
import NavbarMenu from "../Component/navBarCustomer";
import { Nav,  Button,Navbar, NavDropdown, Container, Row, Col } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../Component/dataTeble.css"
import Picture2 from "../image/restuarant.jpg";

const HistoryPage=()=>{
  return(
    <div>
      <SideBarCustomer />
      <NavbarMenu />
    <div className="mainMenu">
     <p className="p-3">
     ประวัติการสั่งอาหาร
      </p> 
    
        <div
          className="border border-black p-3 rounded-3 bg-white mb-3"
          style={{ Height: "525px" }}>
          <div>
            <div className="d-flex justify-content-end">
            <div className="d-flex flex-column m-0">
            <p>รหัสการสั่งอาหาร : xxx</p>
            <p style={{ fontSize: "0.8rem", color: "gray" }}>วันเดือนปี เวลาที่สั่ง</p>
            </div>
            </div>
            <hr variant="secondary" />
            <table className="table table-striped border border-dark">
              <thead>
                <tr>
                  <th>ภาพเมนู</th>
                  <th>ชื่อเมนู</th>
                  <th>จำนวน</th>
                  <th>ราคา</th>
                  <th>ให้คะแนน</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
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
                    <Button
                       variant="outline-success">
                       <i class="bi bi-star me-2"></i> ให้คะแนนและรีวิว
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
                    <Button
                       variant="outline-success">
                       <i class="bi bi-star me-2"></i> ให้คะแนนและรีวิว
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
                    <Button
                       variant="outline-success">
                       <i class="bi bi-star me-2"></i> ให้คะแนนและรีวิว
                     </Button>
                  </th>
                </tr>
              </tbody>
            </table>
            <hr variant="secondary" />

            <div className="d-flex flex-row justify-content-around">
                <h3>ราคารวม :</h3>
                <p>(จำนวน) รายการ</p>
                <h3 style={{ color: "red" }} className="me-3">
                  จำนวนเงินทั้งหมด บาท
                </h3>
                <p className="p-2 bg-primary text-white border rounded-3 d-flex justify-content-center">ชำระด้วย : QR code</p>
            </div>
          </div>
        </div>
        <div
          className="border border-black p-3 rounded-3 bg-white mb-5"
          style={{ Height: "525px" }}>
          <div>
            <div className="d-flex justify-content-end">
            <div className="d-flex flex-column m-0">
            <p>รหัสการสั่งอาหาร : xxx</p>
            <p style={{ fontSize: "0.8rem", color: "gray" }}>วันเดือนปี เวลาที่สั่ง</p>
            </div>
            </div>
            <hr variant="secondary" />
            <table className="table table-striped border border-dark">
              <thead>
                <tr>
                  <th >ภาพเมนู</th>
                  <th>ชื่อเมนู</th>
                  <th>จำนวน</th>
                  <th>ราคา</th>
                  <th>ให้คะแนน</th>
                  <th></th>
                </tr>
              </thead>
              <tbody >
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
                    <Button
                       variant="outline-success">
                       <i class="bi bi-star me-2"></i> ให้คะแนนและรีวิว
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
                    <Button
                       variant="outline-success">
                       <i class="bi bi-star me-2"></i> ให้คะแนนและรีวิว
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
                    <Button
                       variant="outline-success">
                       <i class="bi bi-star me-2"></i> ให้คะแนนและรีวิว
                     </Button>
                  </th>
                </tr>
              </tbody>
            </table>
            <hr variant="secondary" />

            <div className="d-flex flex-row justify-content-around">
                <h3>ราคารวม :</h3>
                <p>(จำนวน) รายการ</p>
                <h3 style={{ color: "red" }} className="me-3">
                  จำนวนเงินทั้งหมด บาท
                </h3>
                <p className="p-2 bg-primary text-white border rounded-3 d-flex justify-content-center">ชำระด้วย : เงินสด</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
export default HistoryPage;