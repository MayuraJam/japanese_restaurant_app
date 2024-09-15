import React, { useState, useRef } from "react";
import {
  Button,
  Form,
  Alert
} from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import Swal from "sweetalert2";

const AddOptionComponent = () => {
  const [errors, setError] = useState({});
  const [submitted, setSubmit] = useState(false);
  const [optionInput, setOptionInput] = useState({
    optionName: "",
    optionLists: [],
    optionValue: "",
  });
  const [newOption, setNewOption] = useState("");
  //ตัวอย่างข้อมูล option
  const optionList = [
    {
      obID: "op01",
      opName: "ระดับความเผ็ด",
      value: ["เผ็ดน้อย", "เผ็ดปานกลาง", "เผ็ดมาก"],
    },
    {
      obID: "op02",
      opName: "ระดับความเข้มข้นของน้ำซุป",
      value: ["เข้มน้อย", "เข้มปานกลาง", "เข้มมาก"],
    },
    {
      obID: "op03",
      opName: "ประเภทข้าว",
      value: ["ข้าวญี่ปุ่น", "ข้าวหอมมะลิ"],
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOptionInput({
      ...optionInput,
      [name]: value,
    });
  };
  const handleAdd = () => {
    if (newOption.trim() === "") return;
    /*const newItem = {
      id:uuidv4(),
      objItem:newOption,
    };*/
    setOptionInput((prevState) => ({
      ...prevState,
      optionLists: [...prevState.optionLists, newOption],
    }));
    setNewOption("");
  };
  const handleOptionValueCancel = () => {
    setNewOption("");
  };
  const handleChangeObjectValue = (e) => {
    setNewOption(e.target.value);
  };

  const handleDeleteList = (id) => {
    const updatedOptions = optionInput.optionLists.filter(
      (option) => option.id !== id
    );
    setOptionInput((prevState) => ({
      ...prevState,
      optionLists: updatedOptions,
    }));
  };

  const concatListToString = (list) => {
    if (!Array.isArray(list)) {
      console.log("Input มาเป็น array จร้า");
    } else {
      return list.join(",");
    }
  };

  const validateValues = () => {
    let isValid = true;
    const error = {};
    if (!optionInput.optionName) {
      error.optionName = "กรอกชื่อด้วย";
      isValid = false;
    }
    if (!optionInput.optionLists) {
      error.optionLists = "กรอกตัวเลือกย่อยด้วย";
      isValid = false;
    }
    setError(error);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateValues()) {
      optionInput.optionValue = concatListToString(optionInput.optionLists);
      console.log("Input data : ", optionInput);
      try {
        const response = await axios.post(
          `https://localhost:7202/api/Admin/AddOption`,
          {
            optionName: optionInput.optionName,
            value: optionInput.optionValue,
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
      setOptionInput({
        optionName: "",
        optionLists: [],
        optionValue: "",
      });
    }
  };
  const handleCLear = ()=>{
    setOptionInput({
      optionName: "",
      optionLists: [],
      optionValue: "",
    });
    setNewOption("");
  }
  return (
    <Form onSubmit={handleSubmit}>
    <div className="d-flex flex-row ">
      <div>
        <Form.Group className="mb-4">
          <Form.Label style={{ fontSize: "0.8rem", color: "gray" }}>
            ชื่อตัวเลือก :
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="กรอกชื่อตัวเลือก..."
            name="optionName"
            value={optionInput.optionName}
            onChange={handleChange}
            className={`${errors.optionName ? "is-invalid" : ""}`}
          />
          {errors.optionName && (
            <div className="error" style={{ fontSize: "0.8rem", color: "red" }}>
              {errors.optionName}
            </div>
          )}
        </Form.Group>
        <div
          className="border border-dark rounded-4"
          style={{ width: "350px" }}
        >
          {/*สำหรับเพิ่ม list*/}
          <Form className="p-3">
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: "0.8rem", color: "gray" }}>
                เพิ่มตัวเลือกย่อย :
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="กรอกชื่อตัวเลือกย่อย..."
                name="optionValue"
                onChange={handleChangeObjectValue}
                value={newOption}
                className={`${errors.optionLists ? "is-invalid" : ""}`}
              />
              {errors.optionLists && (
                <div
                  className="error"
                  style={{ fontSize: "0.8rem", color: "red" }}
                >
                  {errors.optionLists}
                </div>
              )}
            </Form.Group>
            {/*ชุดปุ่มย่อย*/}
            <div className="d-flex flex-row justify-content-end">
              <Button
                variant="secondary"
                className="me-2"
                onClick={handleOptionValueCancel}
              >
                ยกเลิก
              </Button>
              <Button variant="primary" onClick={handleAdd}>
                เพิ่ม
              </Button>
            </div>
          </Form>
          {/*พื้นที่แสดง list */}
          <ul>
            {optionInput.optionLists.map((item) => (
              <li key={item.id}>
                {item}
                {/*<Button variant="danger" onClick={()=>handleDeleteList(item.id)} >ลบ</Button>*/}
              </li>
            ))}
          </ul>
        </div>
      {/*ชุดปุ่มหลัก*/}
      <div className="d-flex flex-row justify-content-end mt-5">
        <Button on variant="secondary" className="me-3" onClick={handleCLear}>
          ยกเลิก
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          บันทึกข้อมูล
        </Button>
      </div>
      </div>
      <div style={{width:"600px"}} className=" m-3 mt-0">
      {/*ตัวอย่างการกรอก*/}
      <Alert variant="success">
        <Alert.Heading className="fs-5">ตัวอย่างตัวเลือกเพิ่มเติม</Alert.Heading>
       <hr/>
        <h4>เมนู : ซาซิมิ</h4>
        <p>- ขนาดของชิ้นปลา</p>
        <ul>
          <li>ปลาชิ้นหนา</li>
          <li>ปลาชิ้นปานกลาง</li>
          <li>ปลาชิ้นบาง</li>
        </ul>
        <hr/>
        <p style={{fontSize:"0.8rem"}}> หมายเหตุ : เป็นส่วนของการเพิ่มตัวเลือกให้กับลูกค้าเพิ่มเติม มีตั้งแต่การเลือกขนาดของชิ้น ความเข้มข้นของซุป ระดับความเผ็ดของแกง เพื่อให้เหมาะสมกับความชอบของแต่ละคน</p>
      </Alert>
      </div>
    </div>
    
    </Form>
  );
};
export default AddOptionComponent;
