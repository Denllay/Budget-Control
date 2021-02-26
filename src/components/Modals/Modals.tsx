import React from 'react';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { EnumModalAction } from '@/store/types/Modal/Modal';
import { AddBudgetModal } from './AddBudgetModal/AddBudgetModal';
import { AuthModal } from './AuthModal/AuthModal';
import { ProfModule } from './ProfModule/ProfModule';

export const Modals: React.FC = () => {
  const { modalStatus, currentModalStatus = null } = useTypedSelector((state) => state?.modal);
  let modal;
  switch (modalStatus) {
    case EnumModalAction.SHOW_ADD_BUDGET_MODAL:
      modal = <AddBudgetModal statusModal={!!modalStatus} />;
      break;
    case EnumModalAction.SHOW_AUTH_MODAL:
      modal = <AuthModal statusModal={currentModalStatus} />;
      break;
    case EnumModalAction.SHOW_PROF_MODAL:
      modal = <ProfModule statusModal={!!modalStatus} />;
      break;
    default:
      modal = null;
  }
  return <>{modal}</>;
};
