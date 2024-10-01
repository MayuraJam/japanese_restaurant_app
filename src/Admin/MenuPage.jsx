import React, { useState, useRef,useEffect } from "react";
import SideBarAdmin from "../Component/sideNavigationAdmin";
import "../CSS_file/sideNavigation.css";
import "../CSS_file/selectMenu.css";
import NavbarAdmin from "../Component/NavBarAdmin";
import { useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import ManageMenu from "./manageMenuPage";
import AddmenuCard from "./addMenuPage";

const AddMenuPage = () => {
  const { staftID } = useParams();
   //ส่วนของการโยกย้ายข้อมูล
   const [selectedData, setSelectedData] = useState(null);

   const handleSendData = (data) => {
    setSelectedData(data);
  };
  return (
    <>
      <SideBarAdmin staftID={staftID}/>
      <NavbarAdmin staftID={staftID}/>
      <div
        className="mainMenu "
        style={{ height: "calc(100vh - 50px)" }}
      >
        <h3 className="my-3">การเพิ่มรายการ</h3>
        <div className=" d-flex flex-row justify-content-center mt-3">
          {/*form ข้อมูล*/}
          <AddmenuCard selectData = {selectedData}/>
          {/*<div
            className="shadow-sm rounded-4 me-3"
            style={{
              height: "450px",
              //overflowY: "auto",
              width: "780px",
              backgroundColor: "white",
            }}
          >
            <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
              <Tab
                eventKey="เพิ่มเมนู"
                title="เพิ่มเมนู"
                className="p-3"
                style={{ overflowY: "auto", height: "380px" }}
              >
                <Form onSubmit={handleSubmit}>
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    {loading ? (
                      <div
                        style={{
                          width: "200px",
                          //width:"100%",
                          height: "200px",
                        }}
                        className="d-flex flex-column justify-content-center align-items-center"
                      >
                        <Spinner animation="border" />
                      </div>
                    ) : (
                      <img
                        src={formvalue.photoSrc}
                        //alt={user.firstName}
                        className="img-fluid border border-dark mb-3 rounded-2"
                        style={{
                          width: "200px",
                          //width:"100%",
                          height: "200px",
                          objectFit: "cover",
                          backgroundColor: "#ffff",
                          alt: "MenuImage",
                        }}
                      />
                    )}
                    <button
                      type="submit"
                      className="flex-center absolute botton-12 right-10 h-9 w-9 border border-rounded"
                      onClick={handleChangePhoto}
                    >
                      <i class="bi bi-pen me-2">อัปโหลดภาพ</i>
                    </button>
                    <input
                      type="file"
                      hidden
                      accept="image/jpeg, image/png"
                      ref={photoUploadRef}
                      onChange={uploadImage}
                      id="image_uoload"
                    />
                    {errors.photoSrc && (<div className="invalid-field" style={{fontSize:"0.8rem",color:"red"}}>{errors.photoSrc}</div>)}

                  </div>
                  <div className="d-flex flex-row">
                  <Form.Group className="mb-2 me-4">
                    <Form.Label style={{ fontSize: "0.8rem", color: "gray" }}>
                      ชื่อเมนู :
                    </Form.Label>
                    <Form.Control
                      type="text"
                      style={{width:'250px'}}
                      placeholder="กรอกชื่ออาหาร..."
                      name="manuName"
                      value={formvalue.manuName}
                      onChange={handleChange}
                    className={`${errors.manuName ? "is-invalid" : ""}`}
                    />
                    {errors.manuName && (<div className="error" style={{fontSize:"0.8rem",color:"red"}}>{errors.manuName}</div>)}
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label style={{ fontSize: "0.8rem", color: "gray" }}>
                      ประเภทอาหาร :
                    </Form.Label>
                    <Form.Select
                      style={{width:'250px'}}
                      name="categoryName"
                      value={formvalue.categoryName}
                      onChange={handleChange}
                    className={`${errors.categoryName ? "is-invalid" : ""}`}
                    >
                      <option>เลือกประเภทอาหาร</option>
                      {Menucategory?.map((item)=>(
                      <option key={item.categoryID} value={item.categoryName}>{item.categoryName}</option>
                      ))}
                    {errors.categoryName && (<div className="error" style={{fontSize:"0.8rem",color:"red"}}>{errors.categoryName}</div>)}
                    </Form.Select>
                  </Form.Group>
                  </div>
                  <Form.Group className="mb-2">
                    <Form.Label style={{ fontSize: "0.8rem", color: "gray" }}>
                      ส่วนประกอบเมนู :
                    </Form.Label>
                    <Form.Control
                      as="textarea" rows={3}
                      placeholder="กรอกส่วนประกอบเมนู..."
                      name="menuDescription"
                      style={{maxHeight:'600px',resize:'none'}}
                      value={menuDescription}
                      onChange={handleChangeSizeBox}
                    ></Form.Control>
                  </Form.Group>
                  <div className="d-flex flex-row">

                  <Form.Group className="mb-2 me-3">
                    <Form.Label style={{ fontSize: "0.8rem", color: "gray" }}>
                      ราคา :
                    </Form.Label>
                    <div className="d-flex flex-row">
                      <Form.Control
                        type="number"
                        placeholder="กรอกราคาอาหาร..."
                        style={{ width: "300px", marginRight: "10px" }}
                        name="unitPrice"
                        value={formvalue.unitPrice}
                        onChange={handleChange}
                      className={`${errors.unitPrice? "is-invalid" : ""}`}
                      />
                    {errors.unitPrice && (<div className="error" style={{fontSize:"0.8rem",color:"red"}}>{errors.unitPrice}</div>)}
                      <p> บาท</p>
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label style={{ fontSize: "0.8rem", color: "gray" }}>
                      จำนวน :
                    </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="กรอกจำนวนอาหาร..."
                        style={{ width: "300px", marginRight: "10px" }}
                        name="quantity"
                        value={formvalue.quantity}
                        onChange={handleChange}
                      className={`${errors.quantity? "is-invalid" : ""}`}

                      />
                    {errors.quantity && (<div className="error" style={{fontSize:"0.8rem",color:"red"}}>{errors.quantity}</div>)}
                  </Form.Group>
                  </div>
                  <Form.Group className="mb-4">
                    <Form.Label style={{ fontSize: "0.8rem", color: "gray" }}>
                      ทางเลือกเพิ่มเติม :
                    </Form.Label>
                    <Form.Select
                      name="optionID"
                      value={formvalue.optionID}
                      onChange={handleChange}
                    >
                      <option>เลือกตัวเลือกเพิ่มเติม</option>
                      {option.map((item)=>(
                      <option key={item.optionID} value={item.optionID}>{item.optionName}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <div className="d-flex flex-row justify-content-end">
                    <Button variant="secondary" className="me-3" onClick={handleClear}>
                      ยกเลิก
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>บันทึกข้อมูล</Button>
                  </div>
                </Form>
              </Tab>
              <Tab
                eventKey="เพิ่มตัวเลือก"
                title="เพิ่มตัวเลือก"
                className="p-3"
                style={{ overflowY: "auto", height: "380px" }}
              >
               <AddOptionComponent/>
              </Tab>
            </Tabs>
          </div>  */}
        </div>
        {/*ตารางข้อมูล*/}
          <ManageMenu onSentDataToEdit = {handleSendData}/>
      </div>
    </>
  );
};
export default AddMenuPage;
