import React, { useState } from "react";
import LoginMember from "../Customer/loginMember";
import RegisterMember from "../Customer/registerMember";


const AuthenModel=()=>{
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

    const closeModal = (modalName) =>{
        if (modalName === "login") {
          setloginOpen(false);
        } else if (modalName === "register") {
          setregisterOpen(false);
        }
      };

    return(
    <div>
       {/*<button onClick={() => openModal("login")}>Open Login Modal</button>
       <button onClick={() => openModal("register")}>Open Signup Modal</button>*/}
       
       <LoginMember 
         isOpen={!loginOpen}
         //setOPen == true
         openRegister = {"register"}
         onClick={() => openModal("login")}
         //onClose={()=> closeModal("login")}
       /> 
       <RegisterMember 
         isOpen={registerOpen}
         //setOPen == true
         onClick={() => openModal("register")}
         //onClose={()=> closeModal("register")}
       />
    </div>
  );
}
export default AuthenModel;