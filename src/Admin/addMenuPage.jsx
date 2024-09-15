import React, { useState, useRef,useEffect } from "react";
import SideBarAdmin from "../Component/sideNavigationAdmin";
import "../Component/sideNavigation.css";
import "../Customer/selectMenu.css";
import NavbarAdmin from "../Component/NavBarAdmin";
//import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Tab,
  Tabs,
  Button,
  Spinner,
  Form,
} from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import photoDefault from "../image/default-product-img.jpg";
import ManageMenu from "./manageMenuPage";
import AddOptionComponent from "../Admin/addOptionComponent";
import Menucategory from "../Component/MenucagoryData";

const AddMenuPage = () => {
  const [key, setKey] = useState("เพิ่มเมนู");
  const photoUploadRef = useRef();
  const [loading, setLoading] = useState(false);
  const [formvalue, setformValue] = useState({
    manuName: "",
    //menuDescription:"",
    categoryName: "",
    //timeCooking: null,
    optionID: "",
    unitPrice: 0.0,
    imageName : "",
    imagefile:null,
    photoSrc : photoDefault,
    quantity : 1
  });
  const [errors,setError] = useState({});
  const [submitted,setSubmit] = useState(false);
  const [menuDescription, setDescription] = useState("");
  const [option,setOption] = useState([]);

  const getOptionData = async () => {
    try {
        const response = await axios.get(
          `https://localhost:7202/api/Admin/OptionGet`
        );
        console.log(response.data.optionList);
        setOption(response.data.optionList);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getOptionData();
  }, []);

  const uploadImage = (e) => {
   if(e.target.files && e.target.files[0]){
      let imageFiles =  e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setformValue({
          ...formvalue,
          imagefile: imageFiles, // Assign imageFiles to imagefile
          photoSrc: x.target.result
        });
      };
      reader.readAsDataURL(imageFiles);
   }else{
    setformValue({
      ...formvalue,
      imagefile : null,
      photoSrc : photoDefault
    });
   }
  };
  function handleChangePhoto(e) {
    e.preventDefault();
    photoUploadRef.current.click();
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformValue({
      ...formvalue,
      [name]: value,
    });
  };
  const handleChangeSizeBox=(e)=>{
    setDescription(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  }

  const validateValues = ()=>{
    let isValid = true;
    const error = {};
    if(!formvalue.manuName){
      error.manuName = "กรอกชื่ออาหารด้วย";
      isValid = false;
    }
    if(!formvalue.categoryName){
      error.categoryName = "เลือกประเภทออาหารด้วย";
      isValid = false;
    }
    if(!formvalue.unitPrice){
      error.unitPrice = "กรอกราคาด้วย";
      isValid = false;
    }
    else if(formvalue.unitPrice < 0){
      error.unitPrice = "ราคาต้องไม่ติดลบ";
      isValid = false;
      } 
    else if(formvalue.unitPrice > 10000){
      error.unitPrice = "ไม่ตั้งราคาเกิน 10000";
      isValid = false;
    }
    if(formvalue.photoSrc == photoDefault){
      error.photoSrc = "ใส่ภาพด้วย"
      isValid = false;
    }
    if(formvalue.categoryName == "เลือกประเภทอาหาร"){
      error.categoryName = "กรุณาเลือกประเภทอาหารด้วย"
      isValid = false;
    }
    if(formvalue.quantity == 0){
      error.quantity = "กรุณากรอกจำนวนอาหารด้วย"
      isValid = false;
    }
    else if(formvalue.quantity < 0){
      error.quantity = "จำนวนอาหารไม่ติดลบ";
      isValid = false;
    }
    else if(formvalue.quantity > 100){
      error.quantity = "จำนวนอาหารในคลังไม่เพียงพอ";
      isValid = false;
    }
      setError(error);
      return isValid;
  };

  const handleSubmit= async (e)=>{
    e.preventDefault();
    if (validateValues()) {

      const formData = new FormData();
      formData.append("menuName", formvalue.manuName);
      formData.append("menuDescription", menuDescription);
      formData.append("unitPrice", formvalue.unitPrice);
      formData.append("categoryName", formvalue.categoryName);
      formData.append("optionID", formvalue.optionID);
      formData.append("imageName", formvalue.imageName);
      formData.append("imageFile", formvalue.imagefile);
      formData.append("quantity", formvalue.quantity);
      try {
        const response = await axios.post(
          `https://localhost:7202/api/Admin/AddMenu`,formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
     console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
      setSubmit(true);
      Swal.fire({
        text: "คุณกรอกข้อมูลเรียบร้อย",
        icon: "success",
        confirmButtonText: "OK",
      });
      handleClear();
     } else {
    }
  }
  const finishSubmit = () => {
    console.log(formvalue);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitted) {
      finishSubmit();
    }
  }, [errors]);
  //time
   const handleClear=()=>{
     setformValue({
      manuName: "",
      menuDescription:"",
      categoryName: "",
      optionID: "",
      unitPrice: 0,
      imageName:"",
      imagefile: null,
      photoSrc:photoDefault,
      quantity : 1
     });
     setDescription("");
     setError({});
     setSubmit(false);
     
   };
  return (
    <>
      <SideBarAdmin />
      <NavbarAdmin />
      <div
        className="mainMenu "
        style={{ height: "calc(100vh - 50px)" }}
      >
        <h4 className="my-3">การเพิ่มรายการ</h4>
        <div className=" d-flex flex-row justify-content-center">
          <div
            className="border border-dark rounded-4 me-3"
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
                  {/*<Form.Group>
                  <Form.Label>เวลาที่ใช้ในการประกอบอาหาร : </Form.Label>
                  <DatePicker
                    selected={formvalue.timeCooking}
                    onChange={(date) => setformValue(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={1} // Time interval in minutes
                    timeCaption="Time"
                    dateFormat="HH:mm:ss" // Format for hours, minutes, and seconds
                  />
                </Form.Group>*/}
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
          </div>
        </div>
          <ManageMenu/>
      </div>
    </>
  );
};
export default AddMenuPage;
