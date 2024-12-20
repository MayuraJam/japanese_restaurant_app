import React, { useState, useRef,useEffect ,forwardRef,useImperativeHandle} from "react";
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
  
   //การ scroll ข้อมูล
   const addMenuCardRef = useRef(null);
   //การส่งข้อมูล
   const handleSendData = (data) => {
    setSelectedData(data);

    // useRef ของการ Scorll
    if (addMenuCardRef.current) {
      addMenuCardRef.current.scrollToElement(); // เรียกฟังก์ชัน scrollToElement ใน AddmenuCard
    }
  };


  return (
    <>
      <SideBarAdmin staftID={staftID}/>
      <NavbarAdmin staftID={staftID}/>
      <div
        className="mainMenu "
        style={{ height: "calc(100vh - 50px)" }}
        
      >
        {/*<h3 className="my-3">การจัดการเมนูและเครื่องดื่ม</h3>
        <div className=" d-flex flex-row justify-content-center mt-3">
        </div>*/}

        {/*form ข้อมูล*/}
          <AddmenuCard selectData = {selectedData} ref={addMenuCardRef} /> {/*component เป้าหมายให้เลื่อนขึ้นไป*/}
        {/*ตารางข้อมูล*/}
          <ManageMenu onSentDataToEdit = {handleSendData}/>
      </div>
    </>
  );
};
export default AddMenuPage;
