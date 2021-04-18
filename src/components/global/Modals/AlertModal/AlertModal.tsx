import React from 'react';
import { EnumAlertModalData, IPropsModalComponent } from '@/types/Modal';
import { SucsessfulAlert } from './SucsessfulAlert';
import { ErrorAlert } from './ErrorAlert';

export const AlertModal: React.FC<IPropsModalComponent> = ({ dataModal, closeModal }) => {
  const alertModalList = {
    [EnumAlertModalData.ERROR]: <ErrorAlert closeModal={closeModal} />,
    [EnumAlertModalData.SUCCESSFUL]: <SucsessfulAlert closeModal={closeModal} />,
  };

  return alertModalList[dataModal as EnumAlertModalData];
};
