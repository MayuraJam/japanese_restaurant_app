import { React, useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";

const ShowMenuStock = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [search, setSearch] = useState("");
  const [menuData, setMenuData] = useState([]);

  //แสดงข้อมูลเมนูทั้งหมด
  const fetchingFulldata = async () => {
    try {
      const response = await axios.post(
        `https://localhost:7202/api/Admin/GetMenu`,
        {
          menuName: search,
        }
      );
      console.log("response :", response.data.menuList);
      setMenuData(response.data.menuList);
    } catch (error) {
      console.log("ไม่สามารถดึงข้อมูลได้");
    }
  };
  useEffect(() => {
    fetchingFulldata();
  }, [search]);
  return (
    <>
      <Button variant="outline-primary" onClick={handleShow}>
        ตรวจสอบจำนวนอาหาร
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>ตรวจสอบจำนวนอาหารและเครื่องดื่ม</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "350px", overflowY: "auto" }}>
          <div
            className="search-container-box shadow-sm  "
            style={{ width: 300 }}
          >
            <div className="input-group ">
              <input
                type="text"
                id="search"
                placeholder="ค้นหารายการสั่ง..."
                name="search"
                className="form-control "
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <div className="input-group-append">
                <span
                  className="input-group-text bg-white border-0"
                  style={{ cursor: "pointer" }}
                >
                  <i className="bi bi-search"></i>
                </span>
              </div>
            </div>
          </div>
          <table
            className="table table-striped "
            aria-labelledby="tableLabel"
            style={{ marginTop: "35px" }}
          >
            <thead>
                <th style={{ width: "33%" }}></th>
                <th style={{ width: "33%" }}></th>
                <th style={{ width: "33%" }}></th>
            </thead>
            <tbody>
              {menuData.map((item) => (
                <tr key={menuData.menuID}>
                  <th>{item.menuName}</th>
                  <th style={{ fontSize: "0.7rem" }}>{item.categoryName}</th>
                  <th>{item.stockQuantity}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ShowMenuStock;
