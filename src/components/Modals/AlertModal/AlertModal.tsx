import React, { Dispatch, SetStateAction } from 'react';
import { EnumAlertModalData } from '@/types/Modal';
import { SucsessfulAlert } from './SucsessfulAlert';
import { ErrorAlert } from './ErrorAlert';

interface IProps {
  setAlertModalStatus: Dispatch<SetStateAction<boolean>>;
  modalMode: EnumAlertModalData;
}

export const AlertModal: React.FC<IProps> = ({ modalMode, setAlertModalStatus }) => {
  const closeModal = () => setAlertModalStatus(false);

  const alertModalList = {
    [EnumAlertModalData.ERROR]: <ErrorAlert closeModal={closeModal} />,
    [EnumAlertModalData.SUCCESSFUL]: <SucsessfulAlert closeModal={closeModal} />,
  };

  return alertModalList[modalMode as EnumAlertModalData];
};
