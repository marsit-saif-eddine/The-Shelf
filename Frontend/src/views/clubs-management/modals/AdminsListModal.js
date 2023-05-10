import React from "react";
import { MessageCircle, User } from "react-feather";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { addChatBox } from "../../../redux/chat";

const AdminsListModal = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

  return (
    <Modal
      isOpen={props.isOpen}
      toggle={() => props.setOpenModal(false)}
      className="modal-dialog-centered modal-sm"
      modalClassName="modal-primary"
    >
      <ModalHeader toggle={() => props.setOpenModal(false)}>
        Administrators
      </ModalHeader>
      <ModalBody>
        {props.admins?.map((x, index) => {
          return (
            <div className="row mb-1" key={index}>
              <div className="col-auto">
                <img
                  src={"http://localhost:5000/" + x.photo}
                  className="rounded"
                  width="40px"
                  height="40px"
                />
              </div>
              <div className="col d-flex flex-column justify-content-center">
                <span>{x.lastname + ' ' + x.firstname}</span>
              </div>
              <div className="col-auto d-flex flex-row">
                <button className="btn btn-flat-success btn-sm" onClick={() => {dispatch(addChatBox(x)); props.setOpenModal(false)}} style={{height: '30px'}}>
                    <MessageCircle size={15}/>
                </button>

                <button className="btn btn-flat-primary btn-sm" onClick={() => navigate("/pages/profile/" + x._id)} style={{height: '30px'}}>
                    <User size={15}/>
                </button>
              </div>
            </div>
          );
        })}
      </ModalBody>
      <ModalFooter>
        <Button
          color="secondary"
          onClick={() => props.setOpenModal(false)}
        >
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AdminsListModal;
