import React from "react";
import SideBarAdmin from "../Component/sideNavigationAdmin";
import "../CSS_file/sideNavigation.css";
import "../CSS_file/selectMenu.css";
import NavbarAdmin from "../Component/NavBarAdmin";
import { Row, Col, Button, Card ,Form} from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useParams } from "react-router-dom";

const MemberManagementPage = () => {
  const { staftID } = useParams();
  return (
    <div>
      <SideBarAdmin staftID={staftID} />
      <NavbarAdmin staftID={staftID} />
      <div className="mainMenu border border-info">
        <p
          className="my-3 border border-dark bg-white p-2 rounded-5 d-flex justify-content-center"
          style={{ maxWidth: "220px" }}
        >
          บัญชีลูกค้า
        </p>
      
        
    
    
      </div>
    </div>
  );
};
export default MemberManagementPage;
