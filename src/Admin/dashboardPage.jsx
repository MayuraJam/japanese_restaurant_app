import { useState, useEffect } from "react";
import { Button, Modal, Alert } from "react-bootstrap";
import SideBarAdmin from "../Component/sideNavigationAdmin";
import "../CSS_file/sideNavigation.css";
import "../CSS_file/selectMenu.css";
import NavbarAdmin from "../Component/NavBarAdmin";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";

const DashBoardPage = () => {
  const { staftID } = useParams();
  const [selectdate,setSelectDate] = useState(new Date());
   return (
    <>
      <SideBarAdmin staftID={staftID} />
      <NavbarAdmin staftID={staftID} />
      <div className="mainMenu " style={{ height: "calc(100vh - 50px)" }}>
        <p
          className="my-3 border border-dark bg-white p-2 rounded-5 d-flex justify-content-center"
          style={{ maxWidth: "220px" }}
        >
          dashboard
        </p>
        <DatePicker
          showIcon
          selected={selectdate}
          onChange={(date) => setSelectDate(selectdate)}
        />
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div
            style={{ maxWidth: "1100px" }}
            className="shadow-sm bg-white p-3 mb-3 rounded-3"
          >
            <p style={{ fontSize: "1rem" }}>
              ชื่อรายงาน Lorem ipsum, dolor sit amet consectetur adipisicing
              elit. Rem beatae, aspernatur incidunt eos quos dolorem error aut
              molestias harum distinctio, earum voluptate laboriosam nemo vero
              quidem sed provident quaerat obcaecati.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default DashBoardPage;
