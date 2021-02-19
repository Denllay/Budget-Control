import * as AuthCheckActionCreators from './Auth/CheckAuth';
import * as AuthRegActionCreators from './Auth/RegAuth';
import * as AuthSignOutActionCreators from './Auth/SignOutAuth';
import * as AuthLoginActionCreators from './Auth/LoginAuth';
import * as ShowAddBudgetActionCreators from './Budget/ShowAddBudget';
import * as AddBudgetActionCreators from './Budget/AddBudget';
import * as GetDataBudgetActionCreators from './Budget/GetDataBudget';
export default {
  ...AuthCheckActionCreators,
  ...AuthRegActionCreators,
  ...AuthSignOutActionCreators,
  ...AuthLoginActionCreators,
  ...ShowAddBudgetActionCreators,
  ...AddBudgetActionCreators,
  ...GetDataBudgetActionCreators,
};
