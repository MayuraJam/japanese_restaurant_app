import { useState, useEffect } from "react";
import { Button, Modal, Alert } from "react-bootstrap";
import axios from "axios";
function NotificationModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [notiData, setNotiData] = useState([]);

  const fetchingFulldata = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7202/api/Admin/GetNotification`
      );
      console.log("response :", response.data.notiList);
      setNotiData(response.data.notiList);
    } catch (error) {
      console.log("ไม่สามารถดึงข้อมูลได้", error);
    }
  };
  useEffect(() => {
    fetchingFulldata();
  }, []);

  const handleDelete = async (notiID) => {
    try {
      const response = await axios.delete(
        `https://localhost:7202/api/Admin/DeleteNotification/${notiID}`
      );
      console.log("ลบข้อมูลสำเร็จ");
      fetchingFulldata();
    } catch (error) {
      console.log("ไม่สามารถดึงข้อมูลได้", error);
    }
  };
  const handleUpdate = async (notiID) => {
    try {
      const response = await axios.put(
        `https://localhost:7202/api/Admin/ReableNotification/${notiID}`
      );
      console.log("อ่านแล้ว");
      fetchingFulldata();
    } catch (error) {
      console.log("ไม่สามารถดึงข้อมูลได้", error);
    }
  };

   //วันและเวลา

   const timeOrder = (datetime) => {
    if (datetime) {
      const myArray = datetime.split("T");
      const date = myArray[0];
      const time = myArray[1];
      const timeOnly = time.substring(0, 5);
      return timeOnly;
    } else {
      console.error("orderDate ไม่ถูกกำหนดหรือเป็น undefined");
    }
  };
  const dateOrder = (datetime) => {
    if (datetime) {
      const formattedDate = new Date(datetime);
      const thaiFormatDate = formattedDate.toLocaleDateString("th-TH", {
        month: "long",
        day: "numeric",
        year: "numeric",
        weekday: "long",
      });
      return thaiFormatDate;
    } else {
      console.error("orderDate ไม่ถูกกำหนดหรือเป็น undefined");
    }
  };

  return (
    <>
      <Button variant="outline-dark" onClick={handleShow}>
        {notiData.isRead !== "ยังไมได้อ่าน" &&(
            <>
            <i class="bi bi-bell me-2"></i>แจ้งเตือน ({notiData.filter(noti=>noti.isRead==="ยังไม่ได้อ่าน").length})
            </>
        )}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <i class="bi bi-bell me-3"></i>แจ้งเตือน
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "350px", overflowY: "auto" }}>
          {notiData?.map((item) => (
            <Alert variant="warning">
              <div className="d-flex flex-row justify-content-between">
                <Alert.Heading style={{ fontSize: "1.2rem" }}>
                  {item.title}
                </Alert.Heading>

                <p
                  className="bg-danger text-warning p-1 border rounded-3"
                  style={{ fontSize: "0.7rem" }}
                >
                  NEW !
                </p>
              </div>
              <div className="d-flex justify-content-between">
                <p style={{ color: "gray", fontSize: "1rem" }}>
                  {item.message}
                </p>
                <p>โต๊ะที่ : {item.tableID}</p>
              </div>
              <div>
              <div className="d-flex ">
                <p style={{ color: "gray", fontSize: "0.8rem" }} className="me-2">
                  {dateOrder(item.createDate)}
                </p>
                <p style={{ color: "gray", fontSize: "0.8rem" }}>
                  {timeOrder(item.createDate)} น.
                </p>
              </div>
                <div className="d-flex justify-content-end">
                  <Button
                    variant="outline-primary"
                    className="me-3"
                    onClick={() => handleUpdate(item.notificationID)}
                    hidden={item.isRead === "อ่านแล้ว"}
                  >
                    อ่าน
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => handleDelete(item.notificationID)}
                  >
                    <i class="bi bi-x-circle"></i>
                  </Button>
                </div>
              </div>
            </Alert>
          ))}
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

export default NotificationModal;
