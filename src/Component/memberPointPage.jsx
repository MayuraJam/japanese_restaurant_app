import { useState, useEffect, react } from "react";
import { Button, Modal, Alert, Row, Col, Card } from "react-bootstrap";
import axios from "axios";

const MemberPointComponent = ({ memberdata }) => {
  console.log("memberDAta", memberdata);

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
      const formatter = new Intl.DateTimeFormat("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      const thaiFormatDate = formatter.format(formattedDate);
      return thaiFormatDate;
    } else {
      console.error("orderDate ไม่ถูกกำหนดหรือเป็น undefined");
    }
  };
  const ThaidateOrder = (datetime) => {
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
      <div className="d-flex justify-content-between">
        <p
          className=" p-2 rounded-5  me-3"
          style={{
            maxWidth: "200px", // ปรับให้แคบลง
            backgroundColor: "#4A4947",
            color: "#F9E79F",
            border: "2px solid #F9E79F",
            textAlign: "center", // ตัวอักษรอยู่ตรงกลาง
          }}
        >
          <i class="bi bi-person-raised-hand"></i> {memberdata[0]?.firstname}{" "}
          {memberdata[0]?.lastname}
        </p>
        <p className=" p-2 rounded-5 d-flex justify-content-center me-3 border border-success text-success">
          <i class="bi bi-balloon-heart text-success me-2"></i>กำลังอยู่ในระบบ
        </p>
      </div>
      <div className="d-flex flex-row justify-content-end">
        <div
          className="my-3 p-3 rounded-5 d-flex justify-content-center"
          style={{
            maxWidth: "220px",
            backgroundColor: "#4A4947",
            color: "#F9E79F",
            border: "2px solid #F9E79F",
          }}
        >
          <i class="bi bi-stars me-2"></i>แต้มทั้งหมด:&nbsp;
          <span style={{fontSize:"1rem"}}> 
         <strong>{memberdata[0]?.totalPoint}</strong>
          </span>&nbsp;คะแนน
        </div>
      </div>
      <Row
        className="mt-2 d-flex justify-content-center align-items-center"
        style={{ gap: "20px", margin: 0 }}
      >
        <Col xs={5} style={{ height: "450px" }}>
          <div
            className="shadow-sm rounded-3 d-flex justify-content-around align-items-center  p-2"
            style={{ width: "300px", gap: "10px", backgroundColor: "#1A5276" }}
          >
            <div style={{ color: "#F9E79F" }}>
              <p>
                {" "}
                <i class="bi bi-stars me-2"></i>แต้มที่ได้รับล่าสุด
              </p>
            </div>
            <div style={{ color: "#F9E79F" }}>
              <p style={{ fontSize: "0.5rem", marginBottom: 0 }}>
                {ThaidateOrder(memberdata[0]?.pointlList[0].createDate)}{" "}
                {timeOrder(memberdata[0]?.pointlList[0].createDate)} น.
              </p>
              <p style={{ fontSize: "3rem", marginTop: 0 }}>
                + {memberdata[0]?.pointlList[0].currentPoint}
              </p>
            </div>
          </div>
          <div
            className="mt-3 shadow-sm rounded-3 p-2 bg-white"
            style={{
              width: "300px",
              height: "300px",
              border: "1px solid #EB5B00",
            }}
          >
            <p>เงื่อนไขการได้รับแต้ม</p>
            <hr />
            <div style={{ maxHeight: "220px", overflowY: "auto" }}>
              <p> <i class="bi bi-stars me-2"></i>ระดับการสะสมแต้ม</p>
              <div >
            <div
          className="my-2 p-1 rounded-5 d-flex justify-content-center mb-2"
          style={{
            maxWidth: "300px",
            backgroundColor: "#4A4947",
            color: "#F9E79F",
          
          }}
        >
          <i class="bi bi-stars me-2"></i>ราคารวมมากกว่า 600 บาทขึ้นไป 
          <span style={{fontSize:"1rem"}}>
          </span>
        </div>
        <div
          className="my-2 p-1 rounded-2 d-flex justify-content-center"
          style={{
            maxWidth: "300px",
            backgroundColor: "white",
            color: "#4A4947",
             border:"1px solid #4A4947"
          }}
        >
          <i class="bi bi-stars me-2"></i>แลกได้ 20%
          <span style={{fontSize:"1rem"}}>
          </span>
        </div>
        <div
          className="my-2 p-1 rounded-5 d-flex justify-content-center"
          style={{
            maxWidth: "300px",
            backgroundColor: "#4A4947",
            color: "#F9E79F",
            
          }}
        >
          <i class="bi bi-stars me-2"></i>ราคารวมตั้งแต่ 600 - 301 บาท
          <span style={{fontSize:"1rem"}}>
          </span>
        </div>
        <div
          className="my-2 p-1 rounded-2 d-flex justify-content-center"
          style={{
            maxWidth: "300px",
            backgroundColor: "white",
            color: "#4A4947",
             border:"1px solid #4A4947"
          }}
        >
          <i class="bi bi-stars me-2"></i>แลกได้ 15%
          <span style={{fontSize:"1rem"}}>
          </span>
        </div>
        <div
          className="my-2 p-1 rounded-5 d-flex justify-content-center"
          style={{
            maxWidth: "300px",
            backgroundColor: "#4A4947",
            color: "#F9E79F",
           
          }}
        >
          <i class="bi bi-stars me-2"></i>ราคารวมตั้งแต่ 300 - 150 บาท 
          <span style={{fontSize:"1rem"}}>
          </span>
        </div>
        <div
          className="my-2 p-1 rounded-2 d-flex justify-content-center"
          style={{
            maxWidth: "300px",
            backgroundColor: "white",
            color: "#4A4947",
             border:"1px solid #4A4947"
          }}
        >
          <i class="bi bi-stars me-2"></i>แลกได้ 10%
          <span style={{fontSize:"1rem"}}>
          </span>
        </div> 
        <div
          className="my-2 p-1 rounded-5 d-flex justify-content-center"
          style={{
            maxWidth: "300px",
            backgroundColor: "#4A4947",
            color: "#F9E79F",
           
          }}
        >
          <i class="bi bi-stars me-2"></i>ราคารวมตั้งแต่ 150 - 80 บาท 
          <span style={{fontSize:"1rem"}}>
          </span>
        </div>
        <div
          className="my-2 p-1 rounded-2 d-flex justify-content-center"
          style={{
            maxWidth: "300px",
            backgroundColor: "white",
            color: "#4A4947",
             border:"1px solid #4A4947"
          }}
        >
          <i class="bi bi-stars me-2"></i>แลกได้ 5%
          <span style={{fontSize:"1rem"}}>
          </span>
        </div>
        <div
          className="my-2 p-1 rounded-5 d-flex justify-content-center"
          style={{
            maxWidth: "300px",
            backgroundColor: "#4A4947",
            color: "#F9E79F",
           
          }}
        >
          <i class="bi bi-stars me-2"></i>ราคารวมไม่เกิน 80 บาท
          <span style={{fontSize:"1rem"}}>
          </span>
        </div>
        <div
          className="my-2 p-1 rounded-2 d-flex justify-content-center"
          style={{
            maxWidth: "300px",
            backgroundColor: "white",
            color: "#4A4947",
             border:"1px solid #4A4947"
          }}
        >
          <i class="bi bi-stars me-2"></i>ไม่ได้แต้ม
          <span style={{fontSize:"1rem"}}>
          </span>
        </div>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={6}>
          <div>
            <p style={{ fontSize: "1rem", fontWeight: "bold" }}>
              {" "}
              <i class="bi bi-stars me-2"></i>ประวัติการสะสมแต้ม
            </p>
            <div
              style={{
                height: "400px",
                overflowY: "auto",
                border: "1px solid #EB5B00",
              }}
              className="shadow-sm rounded-3 p-3 d-flex flex-column  bg-white "
            >
              {memberdata[0]?.pointlList?.map((item) => (
                <div
                  style={{
                    width: "330px",
                    height: "60px",
                    backgroundColor: "#F9E79F",
                  }}
                  className=" rounded-3 p-2 d-flex justify-content-around align-items-center mb-3 shadow-sm "
                >
                  {item.description === "ได้รับแต้ม เนื่องจากเป็นสมาชิกใหม่" ||
                  item.description === "ใช้แต้มในการชำระสินค้า" ? (
                    <>
                      <p
                        style={{
                          fontSize: "0.7rem",
                          fontWeight: "bold",
                          width: "100px",
                        }}
                      >
                        {item.description}
                      </p>
                      <p style={{ fontSize: "0.8rem", color: "gray" }}>
                        {dateOrder(item.createDate)}{" "}
                        {timeOrder(item.createDate)} น.
                      </p>
                      {item.description === "ใช้แต้มในการชำระสินค้า" && (
                        <>
                          <p
                            style={{
                              fontSize: "1.5rem",
                              fontWeight: "bold",
                              color: "red",
                            }}
                          >
                            - {item.currentPoint}
                          </p>
                        </>
                      )}
                      {item.description ===
                        "ได้รับแต้ม เนื่องจากเป็นสมาชิกใหม่" && (
                        <>
                          <p
                            style={{
                              fontSize: "1.5rem",
                              fontWeight: "bold",
                              color: "blue",
                            }}
                          >
                            + {item.currentPoint}
                          </p>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <p
                        style={{
                          fontSize: "1rem",
                          fontWeight: "bold",
                          width: "100px",
                        }}
                      >
                        {item.description}
                      </p>
                      <p style={{ fontSize: "0.8rem", color: "gray" }}>
                        {dateOrder(item.createDate)}{" "}
                        {timeOrder(item.createDate)} น.
                      </p>
                      <p
                        style={{
                          fontSize: "1.5rem",
                          fontWeight: "bold",
                          color: "blue",
                        }}
                      >
                        + {item.currentPoint}
                      </p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};
export default MemberPointComponent;
