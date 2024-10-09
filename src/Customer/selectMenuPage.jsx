import React, { useState, useEffect } from "react";
import SideBarCustomer from "../Component/sideNavigationCustomer";
import "../CSS_file/sideNavigation.css";
import "../CSS_file/selectMenu.css";
import NavbarCustomer from "../Component/navBarCustomer";
import { Row, Col, Card } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import Picture2 from "../image/restuarant.jpg";
import axios from "axios";
import "../CSS_file/stepperInputDesign.css";
import Menucategory from "../Component/MenucagoryData";
import Swal from "sweetalert2";

const SelectMenuPage = ({ tableID }) => {
  tableID = "T001";
  const customerID = "CUS000001";
  const [inputOrder, setInputOrder] = useState({
    option: "",
    tableID: "",
    menuID: "",
    unitPrice: 0.0,
  });

  const [menuData, setMenuData] = useState([]);
  const [originalmenuData, setOriginalMenuData] = useState([]);
  const [menuSelect, setMenuSelect] = useState([]);
  const [search, setSearch] = useState("");
  //ดึงข้อมูลเมนูทั้งหมด
  const fetchingFulldata = async () => {
    try {
      const response = await axios.post(
        `https://localhost:7202/api/Admin/GetMenu`,
        {
          menuName: search,
        }
      );
      console.log("response :", response.data.menuList);
      setMenuData(response.data.menuList);
      setOriginalMenuData(response.data.menuList);
    } catch (error) {
      console.log("ไม่สามารถดึงข้อมูลได้", error);
    }
  };
  useEffect(() => {
    fetchingFulldata();
  }, [search]);
  //ปุ้มเพิ่มจำนวน
  //filter
  const filterItem = (categoryName) => {
    console.log("category input:", categoryName);

    // ใช้ originalMenuData ในการกรองเสมอ
    if (categoryName === "all") {
      // แสดงเมนูทั้งหมดเมื่อเลือก "all"
      setMenuData(originalmenuData);
    } else {
      // กรองข้อมูลตาม categoryName
      const newItem = originalmenuData.filter(
        (newval) => newval.categoryName.trim() === categoryName.trim()
      );
      console.log("Filtered item:", newItem);
      setMenuData(newItem);
    }
  };
  //การแบ่งจาก string => array item
  const SlitStringToArray = (txt) => {
    if (!txt) return;
    const arrayTXT = txt.split(",");
    return arrayTXT;
  };

  const handleAddCart = async (menuIDSelect, optionValue, unitPrice) => {
    console.log("Add option value: ", optionValue, typeof optionValue);
    try {
      const response = await axios.post(
        "https://localhost:7202/api/Customer/AddCart",
        {
          menuID: menuIDSelect,
          tableID: tableID, //ใส่ตรง URL
          optionValue: optionValue,
          unitPrice: unitPrice,
          customerID: customerID, //ใส่ตรง URL
        }
      );
      console.log("Add cart response: ", response.data);
      clearmenuData();
      Swal.fire({
        text: "เพิ่มรายการสำเร็จ",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.log("เกิดข้อผิดผลาดในการดึงข้อมูล", error);
    }
  };

  const clearmenuData = () => {
    setInputOrder({
      option: "",
      tableID: "",
      menuID: "",
    });
  };

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
              <button
                className="innerbutton hoverCard"
                value="ทั้งหมด"
                onClick={() => {
                  filterItem("all");
                }}
              >
                ทั้งหมด
              </button>

              {Menucategory.map((item) => (
                <button
                  className="innerbutton hoverCard"
                  onClick={() => {
                    filterItem(item.categoryName);
                  }}
                  type="button"
                >
                  <img
                    src={item.icon}
                    alt={item.categoryName}
                    className="img-fluid rounded-circle me-2"
                    style={{
                      width: "20px",
                      height: "20px",
                      objectFit: "cover",
                    }}
                  />
                  {item.categoryName}
                </button>
              ))}
            </div>

            <div>
              <Row>
                <Col
                //</Row>xs={7}
                >
                  <div
                    className="shadow-sm p-3 rounded-3 bg-white"
                    //style={{ maxHeight: "410px" }}
                  >
                    <div className="d-flex justify-content-end" style={{position:"sticky"}}>
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
                            value={search}
                            onChange={(e) => {
                              setSearch(e.target.value);
                            }}
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
                        marginTop: "10px",
                      }}
                    >
                      <p>เมนูอาหาร</p>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns:
                            "repeat(auto-fill, minmax(16rem, 1fr))",
                          gap: "10px",
                          marginLeft: "10px",
                        }}
                        className="mb-3"
                      >
                        {menuData.map((item) => (
                          <Card
                            style={{
                              width: "16rem",
                              minHeight: "20rem",
                              cursor: "pointer",
                              transition: "border-color 0.3s",
                              position: "relative",
                              //opacity: item.stockQuantity === 0 ? 0.5 : 1,
                            }}
                            className="hoverCard"
                          >
                            {item.stockQuantity === 0&&(
                            <div  style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              backgroundColor: "rgba(0,0,0,0.5)",
                              color: "white",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              fontSize: "1rem",
                              fontWeight: "bold",
                              zIndex: 1,
                              borderRadius:"5px"
                            }}>
                              เมนูนี้หมดแล้วค่ะ ขออภัยด้วย
                            </div>
                            )}
                            <Card.Img
                              variant="top"
                              src={item.imageSrc}
                              style={{
                                width: "16rem",
                                height: "1ุ30px",
                                backgroundSize: "cover",
                              }}
                              className="img-fluid"
                            />
                            <Card.Body>
                              <div className="d-flex flex-row justify-content-between">
                                <Card.Title style={{ fontSize: "1rem" ,fontWeight:"bold"}}>{item.menuName}</Card.Title>
                                <p
                                  style={{ fontSize: "0.5rem" }}
                                  className="border p-2 rounded-5 bg-warning fw-bold"
                                >
                                  {item.categoryName}
                                </p>
                              </div>
                              <div className="d-flex flex-row justify-content-between">
                                <Card.Text style={{ fontSize: "1rem",fontWeight:"bold"}} className="text-primary">
                                  {item.unitPrice} บาท
                                </Card.Text>
                                <p style={{ fontSize: "0.7rem" }}>
                                <i class="bi bi-star-half"></i> {(item.rating).toFixed(2)}
                                </p>
                              </div>
                              <hr className="text-secondary" />
                              <p style={{ fontSize: "1rem" }}>
                                {item.optionName}
                              </p>
                              {SlitStringToArray(item.value) &&
                                Array.isArray(SlitStringToArray(item.value)) &&
                                SlitStringToArray(item.value).map(
                                  (optionValue, index) => (
                                    <div key={index} className="radio-group">
                                      <input
                                        type="radio"
                                        name="optionValue"
                                        checked={
                                          inputOrder.option === optionValue
                                        }
                                        value={optionValue}
                                        onChange={(e) =>
                                          setInputOrder({
                                            ...inputOrder,
                                            option: e.target.value,
                                          })
                                        }
                                      />

                                      <label
                                        style={{ fontSize: "1rem" }}
                                        htmlFor={`option-${index}`}
                                      >
                                        <span>{optionValue}</span>
                                      </label>
                                      <br />
                                    </div>
                                  )
                                )}
                              <hr className="text-secondary" />
                              <div className="button-area">
                                {/*ปุ่มเพื่อจำนวนจาน*/}
                                <div className=" d-flex justify-content-end">
                                  <div>
                                    <button
                                      type="button"
                                      className="addButtomMenu"
                                      onClick={() => {
                                        handleAddCart(
                                          item.menuID,
                                          inputOrder.option,
                                          item.unitPrice
                                        );
                                      }}
                                    >
                                      <i class="bi bi-patch-plus me-2"></i>
                                      เพิ่มรายการ
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                        ))}
                       
                      </div>
                    </div>
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
export default SelectMenuPage;
