import { React, useState } from "react";
import { Button, Modal, Accordion } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const FAQModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="outline-dark me-4" onClick={handleShow}>
        <i class="bi bi-question-circle me-2"></i>คำถามที่พบบ่อย
      </Button>
      <Modal show={show} onHide={handleClose} style={{ height: "580px" }}>
        <Modal.Header closeButton>
          <Modal.Title>
            <i class="bi bi-question-circle me-2"></i>คำถามที่พบบ่อย
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-end mb-3">
            <div
              className="search-container-box"
              style={{ width: 300 }}
            >
                <div className="d-flex flex-column ">
                <label
                  className="form-label text-secondary"
                  style={{ fontSize: "0.7rem" }}
                >
                  เลือกจากประเภทคำถาม
                </label>
                <select
                  className="form-select"
                  //defaultValue={inputData.jobType}
                  name="jobType"
                 // onChange={handleInputChange}
                 // value={inputData.jobType}
                >
                    <option>
                     ประเภทของคำถาม1
                    </option> 
                    <option>
                     ประเภทของคำถาม2
                    </option><option>
                     ประเภทของคำถาม3
                    </option>
                </select>

                </div>
             
            </div>
          </div>

          <Accordion defaultActiveKey="0" className="mb-2">
            <Accordion.Item eventKey="1">
              <Accordion.Header>คำถามที่ 1</Accordion.Header>
              <Accordion.Body>
                <p
                  style={{ fontSize: "0.8rem", textAlign: "center" }}
                  className="border border-secondary rounded-3 p-2"
                >
                  ประเภทของคำถาม
                </p>
                คำตอบ Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Fugit reiciendis provident, ad ex fugiat laudantium natus rem.
                Ea quas, asperiores quibusdam molestiae, veritatis numquam non
                quos inventore dolorum eligendi dolore!\
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Accordion defaultActiveKey="0" className="mb-2">
            <Accordion.Item eventKey="1">
              <Accordion.Header>คำถามที่ 1</Accordion.Header>
              <Accordion.Body>
                คำตอบ Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Fugit reiciendis provident, ad ex fugiat laudantium natus rem.
                Ea quas, asperiores quibusdam molestiae, veritatis numquam non
                quos inventore dolorum eligendi dolore!
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Accordion defaultActiveKey="0" className="mb-2">
            <Accordion.Item eventKey="1">
              <Accordion.Header>คำถามที่ 1</Accordion.Header>
              <Accordion.Body>
                คำตอบ Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Fugit reiciendis provident, ad ex fugiat laudantium natus rem.
                Ea quas, asperiores quibusdam molestiae, veritatis numquam non
                quos inventore dolorum eligendi dolore!
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Accordion defaultActiveKey="0" className="mb-2">
            <Accordion.Item eventKey="1">
              <Accordion.Header>คำถามที่ 1</Accordion.Header>
              <Accordion.Body>
                คำตอบ Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Fugit reiciendis provident, ad ex fugiat laudantium natus rem.
                Ea quas, asperiores quibusdam molestiae, veritatis numquam non
                quos inventore dolorum eligendi dolore!
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Accordion defaultActiveKey="0" className="mb-2">
            <Accordion.Item eventKey="1">
              <Accordion.Header>คำถามที่ 1</Accordion.Header>
              <Accordion.Body>
                คำตอบ Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Fugit reiciendis provident, ad ex fugiat laudantium natus rem.
                Ea quas, asperiores quibusdam molestiae, veritatis numquam non
                quos inventore dolorum eligendi dolore!
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Accordion defaultActiveKey="0" className="mb-2">
            <Accordion.Item eventKey="1">
              <Accordion.Header>คำถามที่ 1</Accordion.Header>
              <Accordion.Body>
                คำตอบ Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Fugit reiciendis provident, ad ex fugiat laudantium natus rem.
                Ea quas, asperiores quibusdam molestiae, veritatis numquam non
                quos inventore dolorum eligendi dolore!
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};
export default FAQModal;
