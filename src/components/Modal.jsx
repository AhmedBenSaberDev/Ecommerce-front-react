import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const  ModalBackdrop = (props) =>  {


  const handleClose = () => props.handleClose();
  const deleteItem = () => props.deleteItem()

  return (
    <>
      <Modal
        show={props.showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you sure ? </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Do you really want to delete these records? This process cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={deleteItem}>Yes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalBackdrop;