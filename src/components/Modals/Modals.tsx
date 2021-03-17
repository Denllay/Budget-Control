import React from 'react';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { AddBudgetModal } from './AddBudgetModal/AddBudgetModal';
import { AuthModal } from './AuthModal/AuthModal';
import { ProfModule } from './ProfModule/ProfModule';
import { EnumModalAction, TModalAuthStatus } from '@/types/Modal';
import { AlertModal } from './AlertModal/AlertModal';
export const Modals: React.FC = () => {
  const { modalStatus, dataModal } = useTypedSelector((state) => state?.modal);
  switch (modalStatus) {
    case EnumModalAction.SHOW_ADD_BUDGET_MODAL: {
      return <AddBudgetModal />;
    }
    case EnumModalAction.SHOW_AUTH_MODAL: {
      return <AuthModal statusModal={dataModal as TModalAuthStatus} />;
    }
    case EnumModalAction.SHOW_PROF_MODAL: {
      return <ProfModule />;
    }
    case EnumModalAction.SHOW_ALERT_MODAL: {
      return <AlertModal headerText={dataModal as string} />;
    }
    default:
      return null;
  }
};
