import React from "react";
import SideBarCustomer from "../Component/sideNavigationCustomer";
import "../Component/sideNavigation.css";
import "../Customer/selectMenu.css";
import NavbarCustomer from "../Component/navBar";
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
import Picture2 from "../image/restuarant.jpg";

const MenuPage = () => {
  return (
    <div>
      <SideBarCustomer />
      <NavbarCustomer />
      <div>
        <div className="mainMenu">
          {" "}
          {/*เปรียบเสมือนกรอบนอกสุด*/}
          <Col>
            <div
              className="mb-2 p-1 d-flex justify-content-start align-items-center"
              style={{ height: "110px", maxWidth: "1300px", overflowX: "auto" }}
            >
              <button className="p-2 innerbutton hoverCard">ทั้งหมด</button>
              <button className="p-2 innerbutton hoverCard">เมนูข้าว</button>
              <button className="p-2 innerbutton hoverCard">เมนูเส้น</button>
              <button className="p-2 innerbutton hoverCard">เมนูอาหารทะเล</button>
              <button className="p-2 innerbutton hoverCard">เมนูทานเล่น</button>
              <button className="p-2 innerbutton hoverCard">เมนูของหวาน</button>
              <button className="p-2 innerbutton hoverCard">
                <i class="fas fa-glass-whiskey me-2"></i>เครื่องดื่มทั่วไป
              </button>
              <button className="p-2 innerbutton hoverCard">
                <i className="fas fa-beer me-2"></i>เครื่องดื่มแอลกอฮอร์
              </button>
              <button className="p-2 innerbutton hoverCard">เครื่องดื่มชา</button>
            </div>
            <div>
              <Row>
                <Col xs={8}>
                  <div
                    className="border border-black border-2 p-3 rounded-3 bg-white"
                    style={{ maxHeight: "410px" }}
                  >
                    <div className="d-flex justify-content-end">
                      <div
                        className="search-container-box shadow-sm"
                        style={{ width: 300 }}
                      >
                        <div className="input-group ">
                          <input
                            type="text"
                            id="search"
                            placeholder="ค้นหาเมนูอาหาร..."
                            name="search"
                            className="form-control "
                            /*value={"search"}
                            onChange={handleInputChange}
                            onKeyDown={handleSearch}*/
                          />
                          <div className="input-group-append">
                            <span className="input-group-text bg-white border-0">
                              <i className="bi bi-search"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        maxHeight: "340px",
                        overflowY: "auto",
                        marginTop: "10px",
                      }}
                    >
                      <p>เมนูทั้งหมด</p>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns:
                            "repeat(auto-fill, minmax(16rem, 1fr))",
                          gap: "10px",
                          marginLeft:'10px'
                        }}
                        className="mb-3"
                      >
                        <Card style={{ width: "16rem" ,cursor:'pointer',transition: "border-color 0.3s"}} onClick={'#'} className="hoverCard">
                          <Card.Img variant="top" src={Picture2} style={{width:'16rem',height:'130px',backgroundSize:'cover'}}/>
                          <Card.Body>
                            <div className="d-flex flex-row justify-content-between">
                            <Card.Title>ชื่อเมนู</Card.Title>
                            <p style={{fontSize:'0.7rem'}} className="border p-2 rounded-5 bg-warning fw-bold">ประเภทเมนู</p>
                            </div>
                            <div className="d-flex flex-row justify-content-between">
                            <Card.Text style={{fontSize:'1rem'}}>
                              ราคาอาหาร บาท
                            </Card.Text>
                            <p style={{fontSize:'0.7rem'}}>rating</p>
                              
                            </div>
                          </Card.Body>
                        </Card>
                        <Card style={{ width: "16rem" }}>
                          <Card.Img variant="top" src="holder.js/100px180" />
                          <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                              Some quick example text to build on the card title
                              and make up the bulk of the card's content.
                            </Card.Text>
                           
                          </Card.Body>
                        </Card>
                        <Card style={{ width: "16rem" }}>
                          <Card.Img variant="top" src="holder.js/100px180" />
                          <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                              Some quick example text to build on the card title
                              and make up the bulk of the card's content.
                            </Card.Text>
                       
                          </Card.Body>
                        </Card>
                        <Card style={{ width: "16rem" }}>
                          <Card.Img variant="top" src="holder.js/100px180" />
                          <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                              Some quick example text to build on the card title
                              and make up the bulk of the card's content.
                            </Card.Text>
                            
                          </Card.Body>
                        </Card>
                      </div>
                      <p>เมนูข้าว</p>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns:
                            "repeat(auto-fill, minmax(16rem, 1fr))",
                          gap: "10px",
                          marginLeft:'10px'
                        }}
                        className="mb-3"
                      >
                        <Card style={{ width: "16rem",height:'320px' ,cursor:'pointer',transition: "border-color 0.3s"}} onClick={'#'} className="hoverCard">
                          <Card.Img variant="top" src={Picture2} style={{width:'16rem',height:'130px',backgroundSize:'cover'}}/>
                          <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                              Some quick example text to build on the card title
                              and make up the bulk of the card's content.
                            </Card.Text>
                          </Card.Body>
                        </Card>
                        <Card style={{ width: "16rem" }}>
                          <Card.Img variant="top" src="holder.js/100px180" />
                          <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                              Some quick example text to build on the card title
                              and make up the bulk of the card's content.
                            </Card.Text>
                           
                          </Card.Body>
                        </Card>
                        <Card style={{ width: "16rem" }}>
                          <Card.Img variant="top" src="holder.js/100px180" />
                          <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                              Some quick example text to build on the card title
                              and make up the bulk of the card's content.
                            </Card.Text>
                       
                          </Card.Body>
                        </Card>
                        <Card style={{ width: "16rem" }}>
                          <Card.Img variant="top" src="holder.js/100px180" />
                          <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                              Some quick example text to build on the card title
                              and make up the bulk of the card's content.
                            </Card.Text>
                            
                          </Card.Body>
                        </Card>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xs={4}>
                  <div
                    className="border border-black border-2 p-3 rounded-3 bg-white"
                    style={{ maxHeight: "410px", overflowY: "auto" }}
                  >
                   <center><h4 className="mb-4">ส่วนรายละเอียดเมนู</h4>
                    <Card.Img variant="top" src={Picture2} style={{width:'16rem',height:'130px',backgroundSize:'cover',borderRadius:'10px'}} className="mb-4"/>
                    <p>
                      Some text to enable scrolling.. Lorem ipsum dolor sit
                      amet, illum definitiones no quo, maluisset concludaturque
                      et eum, altera fabulas ut quo. Atqui causae gloriatur ius
                      te, id agam omnis evertitur eum. Affert laboramus
                      repudiandae nec et. Inciderint efficiantur his ad. Eum no
                      molestiae voluptatibus.
                    </p>
                    <hr className = "text-secondary"/>
                    <p>เพิ่มเติม</p>
                    <hr className = "text-secondary"/>
                    <h3 style={{color:'red'}}>ราคา บาท</h3>
                    <button className="p-2 innerbutton hoverCard mt-4"><i class="bi bi-egg-fried me-2"></i>เพิ่มรายการอาหาร</button>
                    </center>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </div>
      </div>
    </div>
  );
};
export default MenuPage;
