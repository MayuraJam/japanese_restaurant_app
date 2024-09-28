import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function PointPage() {
    const [lgShow, setLgShow] = useState(false);

  return (
    <>
     <Button onClick={() => setLgShow(true)}>ระบบสะสมแต้ม</Button>
     <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            หัวเรื่อง
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>ส่วนออกแบบ</Modal.Body>
      </Modal>
    </>
  );
}

export default PointPage;