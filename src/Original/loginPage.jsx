import "bootstrap/dist/css/bootstrap.min.css";
import "../Component/sideNavigation.css";
import { React, useState , useEffect} from "react";
import {Row,Col,Button} from 'react-bootstrap';
import "../Customer/selectMenu.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import backgroundPicture from '../image/circle.jpg'
import Picture1 from '../image/food.jpg'
import Picture2 from '../image/restuarant.jpg'
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import LoginMember from "../Customer/loginMember";
import RegisterMember from "../Customer/registerMember";
const LoginPage = () => {

  const navigate = useNavigate();
  const toPage=(path) =>{
    navigate(path);
  } 
  const [inputFields,setInputFields] = useState({
     email:'',
     password:''
  });
  const [errors,setErrors] = useState({});
  const [submitting,setSubmitting] = useState(false);
  
  const validateValues = ()=>{
    let isValid = true;
    const error = {};
    if(!inputFields.email){
      error.email = "กรุณากรอกอีเมลล์ด้วย";
      isValid =false;
    }
    if(!inputFields.password){
      error.password = "กรุณากรอกรหัสผ่านด้วย";
      isValid =false;
    }
     else if(inputFields.password < 5){
      error.password = "กรุณากรอกรหัสให้มากกว่า 5 ตัวอักษร";
      isValid =false;
     } 
     setErrors(error);
     return isValid;
  };


  const handleChange = (e)=>{
    const {name,value} = e.target;
    setInputFields({
      ...inputFields,[name]:value
    });

  };
  function handleSubmit(e){
     e.preventDefault();
     if(validateValues()){
      console.log("Input data : ",inputFields);
      setSubmitting(true);
      toPage('/Admin/table');
      Swal.fire({
        text: "คุณกรอกข้อมูลเรียบร้อย",
        icon: "success",
        confirmButtonText: "OK",
      });
      
      handleClear();
     }else{
    }
  };
  const finishSubmit=()=>{
    console.log(inputFields);
  };

  useEffect(()=>{
    if(Object.keys(errors).length===0&&submitting){
      finishSubmit();
    }
  },[errors]);
  //const isInputValid = Object.keys(errors).length===0;

  const handleClear=()=>{
    setInputFields({
      email:'',
     password:''
    });
    setErrors({});
    setSubmitting(false);
  }
  return (
    <>
      <div style={{height: "100vh",backgroundImage: {backgroundPicture},backgroundSize:'cover'}} className=" p-3 d-flex flec-column justify-content-center">
        <Row className="justify-content-center">
         <Col>
         <div className="me-3" style={{width: "350px"}}>
         <img
              src={Picture2}
              //alt={user.firstName}
              className="img-fluid border border-dark mb-3 border-2"
              style={{
                width: "350px",
                //width:"100%",
                height: "300px",
                objectFit: "cover",
                backgroundColor: "#ffff",
              }}
            />
          <img
              src={Picture1}
              //alt={user.firstName}
              className="img-fluid border border-dark border-2"
              style={{
                width: "350px",
                //width:"100%",
                height: "240px",
                objectFit: "cover",
                backgroundColor: "#ffff",
              }}
            />
        </div>
         </Col>
        <Col className="border border-dark border-2 d-flex flex-column justify-content-center align-items-center bg-white">
        <div style={{width: "600px"}}>
        
          <center>
        <img
              //src=''
              //alt={user.firstName}
              className="img-fluid rounded-circle mb-4 mt-3"
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                backgroundColor: "#ffff",
                border:'5px solid #EB5B00'
              }}
        />
             <p className=" p-2" style={{width:'300px'}}>
                        <strong>
                        เข้าสู่ระบบของพนักงาน
                        </strong>
                      </p>
                      <p className=" p-2 mb-2 fs-4 border rounded-5" style={{backgroundColor:'#FDF2E9',width:'300px'}}>
                        <strong>
                        ชื่อร้านอาหารญี่ปุ่น
                        </strong>
                      </p>
            </center>
          <form className="needs-validation d-flex flex-column justify-content-center align-items-center">
            <div className="form-group mb-2">
              <label htmlFor="title" className="form-label" style={{fontSize:'0.8rem',color:'gray'}}>อีเมลล์ ต้องมี @ ด้วย *</label>
              <input type="email" name="email" value={inputFields.email} onChange={handleChange} placeholder="ใส่อีเมลล์ของคุณ" className={`form-control ${errors.email ? "is-invalid" : ""}`} style={{width:'350px'}}/>
              {errors.email && <div className="error" style={{fontSize:'0.8rem',color:'red'}}>{errors.email}</div>}
            </div>
            <div className="form-group mb-4">
              <label htmlFor="title" className="form-label" style={{fontSize:'0.8rem',color:'gray'}}>รหัสผ่าน *</label>
              <input type="password" name="password" value={inputFields.password} onChange={handleChange} placeholder="ใส่รหัสผ่านของคุณ" className={`form-control ${errors.password ? "is-invalid" : ""}`} style={{width:'350px'}}/>
              {errors.password && <div className="error" style={{fontSize:'0.8rem',color:'red'}}>{errors.password}</div>}
            </div>
          <div>
          <RegisterMember/>
          <Button variant="primary" className="mx-3" onClick={handleSubmit} type="submit" style={{ cursor: "pointer" }}><i class="bi bi-egg-fried me-2"></i>เข้าสู่ระบบ</Button>
          <LoginMember/>
          </div>
          </form>
        </div>
        </Col>
        </Row>
      </div>
    </>
  );
};
export default LoginPage;
