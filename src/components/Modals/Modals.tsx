import React from 'react';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { EnumModalAction } from '@/store/types/Modal/Modal';
import { AddBudgetModal } from './AddBudgetModal/AddBudgetModal';
import { AuthModal } from './AuthModal/AuthModal';
import { ProfModule } from './ProfModule/ProfModule';
import { TModalAuth } from '@/types/ModalAuth';

export const Modals: React.FC = () => {
  const { modalStatus, currentModalStatus } = useTypedSelector((state) => state?.modal);
  switch (modalStatus) {
    case EnumModalAction.SHOW_ADD_BUDGET_MODAL:
      return <AddBudgetModal statusModal={!!modalStatus} />;

    case EnumModalAction.SHOW_AUTH_MODAL:
      return <AuthModal statusModal={currentModalStatus as TModalAuth} />;

    case EnumModalAction.SHOW_PROF_MODAL:
      return <ProfModule statusModal={!!modalStatus} />;
    default:
      return null;
  }
};
