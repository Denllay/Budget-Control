import * as AuthCheckActionCreators from './Auth/CheckAuth';
import * as AuthRegActionCreators from './Auth/RegAuth';
import * as AuthSignOutActionCreators from './Auth/SignOutAuth';
import * as AuthLoginActionCreators from './Auth/LoginAuth';
import * as AddBudgetActionCreators from './Budget/AddBudget';
import * as GetDataBudgetActionCreators from './Budget/GetDataBudget';
import * as RemoveBudgetActionCreators from './Budget/RemoveBudget';
import * as AddCategoryBudgetActionCreators from './Budget/AddCategoryBudget';
import * as GetCourseCurrencyBudgetActionCreators from './Budget/GetCourseCurrencyBudget';
import * as DeleteCategoryBudgetActionCreators from './Budget/DeleteCategoryBudget';
import * as UpdatePasswordBudgetActionCreators from './Auth/UpdatePassword';
import * as RemoveAllBudgetsActionCreators from './Budget/RemoveAllBudgets';
import * as ChangeViewAddBudgetModalActionCreators from './Modal/ChangeViewAddBudgetModal';
import * as ChangeViewAuthModalActionCreators from './Modal/ChangeViewAuthModal';
import * as ChangeViewProfModalActionCreators from './Modal/ChangeViewProfModal';
import * as CloseModalActionCreators from './Modal/CloseModal';
import * as GetBudgetsLengthActionCreators from './Budget/GetBudgetsLength';
export default {
  ...AuthCheckActionCreators,
  ...AuthRegActionCreators,
  ...AuthSignOutActionCreators,
  ...AuthLoginActionCreators,
  ...AddBudgetActionCreators,
  ...GetDataBudgetActionCreators,
  ...RemoveBudgetActionCreators,
  ...AddCategoryBudgetActionCreators,
  ...DeleteCategoryBudgetActionCreators,
  ...GetCourseCurrencyBudgetActionCreators,
  ...UpdatePasswordBudgetActionCreators,
  ...RemoveAllBudgetsActionCreators,
  ...ChangeViewAddBudgetModalActionCreators,
  ...ChangeViewAuthModalActionCreators,
  ...ChangeViewProfModalActionCreators,
  ...CloseModalActionCreators,
  ...GetBudgetsLengthActionCreators,
};
