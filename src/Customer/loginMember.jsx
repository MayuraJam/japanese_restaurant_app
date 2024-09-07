import { useState ,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2";
import Picture2 from '../image/restuarant.jpg'
import {Row,Col} from 'react-bootstrap';
import RegisterMember from './registerMember';

function LoginMember({isOpen,openRegister}) {
  //console.log('isRegisterOpen:',openRegister); //register
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(isOpen); //isOpen = true

    const [loginOpen,setloginOpen] = useState(false); 
    const [registerOpen,setregisterOpen] = useState(false); 
    
    const openModal = (modalName)=>{
         if(modalName==="login"){
            setloginOpen(true);
            setregisterOpen(false);
         }else if(modalName=== "register"){
            setloginOpen(false);
            setregisterOpen(true);
         }
    console.log('loginOpen :' , loginOpen);
    console.log('registerOpen :' , registerOpen);
    };

  
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
   }if(!inputFields.password){
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
     Swal.fire({
       text: "คุณกรอกข้อมูลเรียบร้อย",
       icon: "success",
       confirmButtonText: "OK",
     });
     handleClear();
    }else{
     console.log(validateValues());
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
      <Button variant="primary" onClick={handleShow}>
        ระบบสะสมแต้ม
      </Button>

      <Modal show={show} 
      
      onHide={handleClose} 
      size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>เข้าสู่ระบบสะสมแต้ม</Modal.Title>
        </Modal.Header>
        <Modal.Body className='border border-info'>
        <Row>
          <Col xs={5} className='border border-info'>
        <img
              src={Picture2}
              //alt={user.firstName}
              className="img-fluid border border-dark mb-3"
              style={{
                width: "350px",
                //width:"100%",
                height: "350px",
                objectFit: "cover",
                backgroundColor: "#ffff",
              }}
            />
          </Col>
          <Col xs={6} className='border border-info' style={{marginLeft:'10px'}}>
          <center>
        <img
              //src=''
              //alt={user.firstName}
              className="img-fluid rounded-circle mb-4 mt-3"
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
                backgroundColor: "#ffff",
                border:'5px solid #EB5B00'
              }}
        />
                      <p className=" p-2 mb-2  border rounded-5" style={{backgroundColor:'#FDF2E9',width:'300px',fontSize:'0.8rem'}}>
                        <strong>
                        ชื่อร้านอาหารญี่ปุ่น
                        </strong>
                      </p>
            </center>
          <Form className="needs-validation d-flex flex-column justify-content-center align-items-center">
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Label style={{fontSize:'0.8rem',color:'gray'}}>อีเมลล์ ต้องเพิ่ม @*</Form.Label>
              <Form.Control
                type="email"
                placeholder="กรอกอีเมลล์ ..."
                autoFocus
                className={`${errors.email ? "is-invalid" : ""}`} style={{width:'350px'}}
                name='email'
                onChange={handleChange}
                value={inputFields.email}
              />
              {errors.email && <div className="error" style={{fontSize:'0.8rem',color:'red'}}>{errors.email}</div>}
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label style={{fontSize:'0.8rem',color:'gray'}}>รหัสผ่าน</Form.Label>
              <Form.Control
                type="password"
                placeholder="กรอกรหัสผ่าน ..."
                autoFocus
                className={`${errors.password ? "is-invalid" : ""}`} style={{width:'350px'}}
                name='password'
                onChange={handleChange}
                value={inputFields.password}
              />
              {errors.password && <div className="error" style={{fontSize:'0.8rem',color:'red'}}>{errors.password}</div>}
            </Form.Group>
          </Form>
          </Col>
        </Row>
        </Modal.Body>
        <Modal.Footer>
         <RegisterMember isOpen={openRegister}
          onClick={() => openModal(openRegister)} //register
         />
          {/*
            openRegister == true
          เข้าสู่หน้าการลงทะเบียน */}
          <Button variant="primary" onClick={handleSubmit}>
            เข้าสู่ระบบ
          </Button>
          {/*เข้าสู่หน้าสะสมแต้ม*/}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LoginMember;