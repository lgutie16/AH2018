import React from 'react';
import { Modal as Modal_ant } from 'antd';

const Modal = ({
  title = "Game of drones",
  visible,
  onOk,
  onCancel,
  switchModal,
  okText = 'Confirm',
  cancelText = 'Cancel',
  children,
}) => (
  <Modal_ant
    title={title}
    visible={visible}
    onOk={onOk}
    onCancel={onCancel}
    okText={okText}
    cancelText={cancelText}
  >
   {children}
  </Modal_ant>
);

export default Modal;
