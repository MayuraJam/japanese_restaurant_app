import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Picture2 from "../image/isakaya.jpg";
import ProfilePicture from "../image/Green-tea.jpg";
import axios from "axios";
import Swal from "sweetalert2";
//import "../Component/flipCard.css";

function AdminProfileModal({staftID}) {
  const [show, setShow] = useState(false);
  const [showModal2, setShowModal2] = useState(false); 

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose2 = () => showModal2(false);
  const handleShow2 = () => showModal2(true);

  const [staftData, setStaftData] = useState([]);
  const [inputData, setInputData] = useState({
    lastName: "",
    jobType: "",
    email: "",
    phone: "",
  });
  const [firstName, setFirstName] = useState("");

  // ตัวอย่าง staftID : STAFT00001
 //var staftID = "STAFT00003";
  //ดึงข้อมูลพนักงานทั้งหมด
  const fetchingFulldata = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7202/api/Admin/GetStaftData?staftID=${staftID}`
      );
      console.log("response :", response.data.staftItem);
      const data = response.data.staftItem;
      setStaftData(data);
      setInputData(data);
      setFirstName(data.firstName);
      
    } catch (error) {
      console.log("ไม่สามารถดึงข้อมูลได้");
    }
  };
  useEffect(() => {
    fetchingFulldata();
  }, []);

  const TypeJob = [
    {
      jobTID: 1,
      jobTypeName: "ประจำ",
    },
    {
      jobTID: 2,
      jobTypeName: "ชั่วคราว",
    },
  ];
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const editStaftData = async () => {
    try {
      const response = await axios.put(
        "https://localhost:7202/api/Admin/UpdateStaftData",
        {
          staftID: staftID,
          firstName: firstName,
          lastName: inputData.lastName,
          phone: inputData.phone,
          email: inputData.email,
          jobType: inputData.jobType,
        }
      );
      if (response) {
        console.log(response.data.staftItem);
        handleSwitchToModal1();
        Swal.fire({
          text: "แก้ไจข้อมูลเรียบร้อย",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.log("ไม่สามารถแก้ไขข้อมูลได้เนื่องจาก :", error);
    }
  };
const handleSwitchToModal2 = () => {
    setShow(false); // Hide Modal1
    setShowModal2(true);  // Show Modal2
  };
  const handleSwitchToModal1 = () => {
    setShow(true); // Hide Modal1
    setShowModal2(false);  // Show Modal2
  };
  return (
    <>
      <Button className="btn btn-outline-warning" onClick={handleShow}>
        ชื่อพนักงาน : {staftData.firstName}
      </Button>
      {/*ด้านหน้า*/}

        <Modal show={show} onHide={handleClose} animation={false} id="card">
          <Modal.Header closeButton>
            <Modal.Title>
              <i class="bi bi-person-circle me-3"></i>รายละเอียดพนักงาน
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={Picture2}
              alt="backgound-ing"
              className="img-fluid rounded-2 me-2"
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
              }}
            />
            <div style={{ textAlign: "center" }}>
              <img
                src={ProfilePicture}
                alt="profile-pic"
                className="img-fluid rounded-circle me-2 shadow-lg mb-3"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  zIndex: 1,
                  marginTop: "-50px",
                }}
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: "0.8rem" }}>
                รหัสประจำตัวพนักงาน : {staftData.staftID}
              </p>
              <h4>
                {staftData.firstName} {staftData.lastName}
              </h4>
              <p>
                ประเภทของงาน : {staftData.roleName} {staftData.jobType}
              </p>
            </div>
            <center>
              <div
                className="d-flex flex-column justify-content-center align-items-center border border-secondary rounded-3 p-2"
                style={{ maxWidth: "250px", fontSize: "0.8rem" }}
              >
                <p>
                  <i class="bi bi-envelope me-3"></i>email : {staftData.email}
                </p>
                <p>
                  <i class="bi bi-telephone me-3"></i>เบอร์โทรศัพท์ :{" "}
                  {staftData.phone}
                </p>
              </div>
            </center>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-primary" onClick={handleSwitchToModal2}><i class="bi bi-pen-fill me-2"></i> แก้ไขประวัติส่วนตัว</Button>
          </Modal.Footer>
        </Modal>
      

      {/*ด้านหลัง*/}
       <Modal show={showModal2} animation={false} >
          <Modal.Header >
            <Modal.Title>
              <i class="bi bi-pen-fill me-3"></i>แก้ไขรายละเอียดพนักงาน{" "}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-end">
              <p
                style={{ fontSize: "0.8rem" }}
                className="border border-dark p-1"
              >
                รหัสประจำตัวพนักงาน : {staftData.staftID}
              </p>
            </div>
            <p>แบบฟอร์มการแก้ไข</p>
            <form>
              <div className="mb-3 ">
                <label
                  className="form-label text-secondary"
                  style={{ fontSize: "0.7rem" }}
                >
                  ชื่อ
                </label>
                <input
                  type="text"
                  className="form-control mb-1"
                  placeholder="กรอกชื่อ"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
                <label
                  className="form-label text-secondary"
                  style={{ fontSize: "0.7rem" }}
                >
                  นามสกุล
                </label>
                <input
                  type="text"
                  className="form-control mb-1"
                  placeholder="กรอกนามสกุล"
                  name="lastName"
                  onChange={handleInputChange}
                  value={inputData.lastName}
                />
                <label
                  className="form-label text-secondary"
                  style={{ fontSize: "0.7rem" }}
                >
                  เลือกประเภทงาน
                </label>
                <select
                  className="form-select"
                  defaultValue={inputData.jobType}
                  name="jobType"
                  onChange={handleInputChange}
                  value={inputData.jobType}
                >
                  {TypeJob?.map((item) => (
                    <option value={item.jobTypeName} key={item.jobTID}>
                      {item.jobTypeName}
                    </option>
                  ))}
                </select>
                <label
                  className="form-label text-secondary"
                  style={{ fontSize: "0.7rem" }}
                >
                  อีเมลล์ @email
                </label>
                <input
                  type="text"
                  className="form-control mb-1"
                  placeholder="emailName@example.com"
                  name="email"
                  onChange={handleInputChange}
                  value={inputData.email}
                />
                <label
                  className="form-label text-secondary"
                  style={{ fontSize: "0.7rem" }}
                >
                  เบอร์โทรศัพท์
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="xxx-xxx-xxxx"
                  name="phone"
                  onChange={handleInputChange}
                  value={inputData.phone}
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            
            <Button variant="outline-primary" onClick={editStaftData}>
              บันทึกการแก้ไข
            </Button>
          </Modal.Footer>
        </Modal>
    
    </>
  );
}

export default AdminProfileModal;
