import * as AuthCheckActionCreators from './Auth/CheckAuth';
import * as AuthRegActionCreators from './Auth/RegAuth';
import * as AuthSignOutActionCreators from './Auth/SignOutAuth';
import * as AuthLoginActionCreators from './Auth/LoginAuth';
import * as ChangeViewAddBudgetModalActionCreators from './Modal/ChangeViewAddBudgetModal';
import * as ChangeViewAuthModalActionCreators from './Modal/ChangeViewAuthModal';
import * as ChangeViewProfModalActionCreators from './Modal/ChangeViewProfModal';
import * as CloseModalActionCreators from './Modal/CloseModal';
import * as GetDataBudgetActionCreators from './Budget/GetDataBudget';
import * as AddCategoryBudgetActionCreators from './Budget/AddCategoryBudget';
import * as AddBudgetActionCreators from './Budget/AddBudget';
import * as ChangeCategoryActionCreators from './Budget/ChangeCategory';
import * as DeleteBudgetActionCreators from './Budget/DeleteBudget';
import * as DeleteCategoryActionCreators from './Budget/DeleteCategory';
import * as DeleteAllBudgetsActionCreators from './Budget/DeleteAllBudgets';
export default {
  ...AuthCheckActionCreators,
  ...AuthRegActionCreators,
  ...AuthSignOutActionCreators,
  ...AuthLoginActionCreators,
  ...ChangeViewAddBudgetModalActionCreators,
  ...ChangeViewAuthModalActionCreators,
  ...ChangeViewProfModalActionCreators,
  ...CloseModalActionCreators,
  ...GetDataBudgetActionCreators,
  ...AddCategoryBudgetActionCreators,
  ...AddBudgetActionCreators,
  ...ChangeCategoryActionCreators,
  ...DeleteBudgetActionCreators,
  ...DeleteCategoryActionCreators,
  ...DeleteAllBudgetsActionCreators,
};
