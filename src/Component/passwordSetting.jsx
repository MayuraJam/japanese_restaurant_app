import React, { useState } from 'react';
import {Button,Col,Toast} from 'react-bootstrap';


function PasswordFormatGuide() {
  const [showA, setShowA] = useState(true);
  const toggleShowA = () => setShowA(!showA);

  return (
      <Col md={6} className="mb-2" style={{marginTop:"106px"}}>
        <Button onClick={toggleShowA} className="mb-2" variant='outline-primary'>
        <i class="bi bi-info-circle"></i>
        </Button>
        <Toast show={showA} onClose={toggleShowA}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto" style={{fontSize:"0.7rem"}}>รูปแบบการตั้งรหัสผ่านให้มีความปลอดภัย</strong>
            <small>by admin ;)</small>
          </Toast.Header>
          <Toast.Body>
            <ul>
                <li>ต้องมีตัวอักษรพิมพ์เล็กอย่างน้อย 1 ตัว</li>
                <li>ต้องมีตัวอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว</li>
                <li>ต้องมีตัวเลขอย่างน้อย 1 ตัว</li>
                <li>ต้องมีอักขระพิเศษอย่างน้อย 1 ตัว (เช่น !@#$%^&*)</li>
                <li>ความยาวต้องอยู่ระหว่าง 8 ถึง 16 ตัวอักษร</li>
            </ul>
          </Toast.Body>
        </Toast>
      </Col>
  );
}

export default PasswordFormatGuide;