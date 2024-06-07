import { Modal as AntdModal, ModalProps as AntModalProps } from 'antd';
import React from 'react';
import * as S from './styles';
import { modalSizes } from './types';

export const {
  info: InfoModal,
  success: SuccessModal,
  warning: WarningModal,
  error: ErrorModal,
} = AntdModal;

interface ModalProps extends AntModalProps {
  size?: 'small' | 'medium' | 'large';
}

export const Modal: React.FC<ModalProps> = ({ size = 'medium', children, ...props }) => {
  const modalSize = Object.entries(modalSizes).find((sz) => sz[0] === size)?.[1];

  return (
    <S.Modal
      okButtonProps={{ style: { width: 200, height: 70 }, title: 'ок' }}
      cancelButtonProps={{ style: { width: 200, height: 70 }, title: 'Бекор қилиш' }}
      getContainer={false}
      width={modalSize}
      {...props}
    >
      {children}
    </S.Modal>
  );
};
