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
        <h3 className="my-3">การจัดการเมนูและเครื่องดื่ม</h3>
        <div className=" d-flex flex-row justify-content-center mt-3">
          {/*form ข้อมูล*/}
          <AddmenuCard selectData = {selectedData}/>
        </div>
        {/*ตารางข้อมูล*/}
          <ManageMenu onSentDataToEdit = {handleSendData}/>
      </div>
    </>
  );
};
export default AddMenuPage;
