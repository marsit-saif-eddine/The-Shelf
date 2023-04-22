
import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";


const ConfirmationModal = (props) => {

    return (
        <Modal
          isOpen={props.isOpen}
          toggle={() => props.setOpenModal(false)}
          className='modal-dialog-centered'
          modalClassName="modal-danger"
        >
          <ModalHeader toggle={() => props.setOpenModal(false)}>Confirmation</ModalHeader>
          <ModalBody>
            {props.body}
          </ModalBody>
          <ModalFooter>
          <Button color="secondary" className="me-1" onClick={() => props.setOpenModal(false)}>
              Cancel
            </Button>
            <Button color="danger" onClick={props.confirmAction}>
              {props.buttonText}
            </Button>
          </ModalFooter>
        </Modal>
    )
}

export default ConfirmationModal;