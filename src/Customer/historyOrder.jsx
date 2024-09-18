import React from "react";
import SideBarCustomer from "../Component/sideNavigationCustomer";
import "../Component/sideNavigation.css";
import "../Customer/selectMenu.css";
import NavbarMenu from "../Component/navBarCustomer";
import { Nav,  Button,Card} from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../Component/dataTeble.css"
import Picture2 from "../image/restuarant.jpg";

const HistoryPage=()=>{
  return(
    <div>
      <SideBarCustomer />
      <NavbarMenu />
    <div className="mainMenu">
    <p
          className="my-3 border border-dark bg-white p-3 rounded-5 d-flex justify-content-center"
          style={{ maxWidth: "220px" }}
        >
          ประวัติรายการอาหาร
        </p>
    
        <div
          className="border border-black p-3 rounded-3 bg-white mb-3"
          style={{ Height: "525px" }}>
          <div>
            <div className="d-flex justify-content-end">
            <div className="d-flex flex-column m-0">
            <p style={{fontSize:"1rem"}}>รหัสการสั่งอาหาร : xxx</p>
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

            <div className="d-flex justify-content-end">
            <Card border="secondary" style={{ width: "25rem" }}>
              <Card.Header>รายละเอียด</Card.Header>
              <Card.Body>
                {/*<Card.Title>ราคารวม</Card.Title>*/}
                <Card.Text>
                  <div className="d-flex flex-row justify-content-between">
                <p style={{fontSize:"0.8rem"}}>จำนวน () รายการ</p>
                <p style={{fontSize:"1rem"}}>ราคาสินค้า บาท</p>
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                <p style={{fontSize:"0.8rem"}}>ภาษีมุลค่าเพิ่ม (7%) :</p>
                <p style={{fontSize:"0.8rem"}}>ภาษี บาท</p>
                  </div>
                <hr variant="secondary" />
                <div className="d-flex flex-row justify-content-between">
                <p style={{fontSize:"1.3rem"}}>ราคาสุทธิ :</p>
                <p style={{fontSize:"1.3rem"}}>ราคาสุทธิ บาท</p>
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                <p style={{fontSize:"0.8rem"}}>ชำระด้วย :</p>
                <p style={{fontSize:"0.8rem"}}>QR code</p>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
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

            <div className="d-flex justify-content-end">
            <Card border="secondary" style={{ width: "25rem" }}>
              <Card.Header>รายละเอียด</Card.Header>
              <Card.Body>
                {/*<Card.Title>ราคารวม</Card.Title>*/}
                <Card.Text>
                  <div className="d-flex flex-row justify-content-between">
                <p style={{fontSize:"1rem"}}>จำนวน () รายการ</p>
                <p>ราคาสินค้า บาท</p>
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                <p style={{fontSize:"1rem"}}>ภาษีมุลค่าเพิ่ม (7%) :</p>
                <p style={{fontSize:"1rem"}}>ภาษี บาท</p>
                  </div>
                <hr variant="secondary" />
                <div className="d-flex flex-row justify-content-between">
                <p style={{fontSize:"1.3rem"}}>ราคาสุทธิ :</p>
                <p style={{fontSize:"1.3rem"}}>ราคาสุทธิ บาท</p>
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                <p style={{fontSize:"1rem"}}>ชำระด้วย :</p>
                <p style={{fontSize:"1rem"}}>เงินสด</p>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
export default HistoryPage;