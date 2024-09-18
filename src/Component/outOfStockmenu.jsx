import React, { useState, useRef, useEffect } from "react";
import { Card } from "react-bootstrap";

const OutOfStock = ({ menuID }) => {
  [];
  return (
    <>
      <Card
        style={{
          width: "16rem",
          height: "auto",
          cursor: "pointer",
          transition: "border-color 0.3s",
        }}
        className="hoverCard"
      >
        <Card.Img
          variant="top"
          src={item.imageSrc}
          style={{
            width: "16rem",
            height: "130px",
            backgroundSize: "cover",
          }}
        />
        <Card.Body>
          <div className="d-flex flex-row justify-content-between">
            <Card.Title>{item.menuName}</Card.Title>
            <p
              style={{ fontSize: "0.7rem" }}
              className="border p-2 rounded-5 bg-warning fw-bold"
            >
              {item.categoryName}
            </p>
          </div>
          <div className="d-flex flex-row justify-content-between">
            <Card.Text style={{ fontSize: "1rem" }}>
              {item.unitPrice} บาท
            </Card.Text>
            <p style={{ fontSize: "0.7rem" }}>rating : {item.rating}</p>
          </div>
          <hr className="text-secondary" />
          <div className="button-area">
            {/*ปุ่มเพื่อจำนวนจาน*/}
            <div className=" d-flex justify-content-between">
              <div>
                <button
                  type="button"
                  className="addButtomMenu"
                  onClick={() => {
                    handleAddCart(
                      item.menuID,
                      inputOrder.option,
                      item.unitPrice
                    );
                  }}
                >
                  <i class="bi bi-patch-plus me-2"></i>
                  เพิ่มรายการ
                </button>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};
export default OutOfStock;
