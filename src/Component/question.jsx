import { React, useState } from "react";
import { Button, Modal, Accordion } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import QuestionItem from "../Component/questionAndAnswerDataList";
import "../CSS_file/FAQ.css";
const FAQModal = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline-dark me-4" onClick={handleShow}>
        <i class="bi bi-question-circle me-2"></i>คำถามที่พบบ่อย
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        style={{ height: "580px" }}
        size="lg"
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#EB5B00", color: "#F9E79F" }}
        >
          <Modal.Title>
            <i class="bi bi-question-circle me-2"></i>คำถามที่พบบ่อย
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#1A5276" }}>
          <div className="d-flex justify-content-end mb-3">
            <div className="search-container-box" style={{ width: 300 }}></div>
          </div>
          {/*QuestionItem.map((item)=>(
          <Accordion defaultActiveKey="0" className="mb-2 shadow-sm" key={item.questionID} style={{borderLeft:"5px solid #EB5B00"}}>
            <Accordion.Item eventKey="1">
              <Accordion.Header >{item.questionMassage} </Accordion.Header>
              <Accordion.Body>
                <p
                  style={{ fontSize: "0.8rem", textAlign: "center",backgroundColor:"#F1F3C2" }}
                  className="rounded-3 p-2"
                >
                 <strong>{item.questionType}</strong>
                </p>
                <u>
                คำตอบ
                </u> <br/> 
                <p style={{fontSize:"0.8rem",textIndent: "30px",color:"blue"}}>
                {item.answer}
                </p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          ))*/}
          <section>
            <div className="container">
              <div className="accordion">
                {QuestionItem.map((item)=>(
                <div className="accordion-item" id={item.questionID} key={item.questionID}>
                  <a href={`#${item.questionID}`} className="accordion-link">
                  {item.questionMassage}<i class="bi bi-plus-circle"></i>
                    <i class="bi bi-x-circle"></i>
                  </a>
                  <div className="answer">
                    <p>
                    {item.answer}
                    </p>
                  </div>
                </div>
                ))}
              </div>
            </div>
          </section>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#EB5B00" }}></Modal.Footer>
      </Modal>
    </>
  );
};
export default FAQModal;
