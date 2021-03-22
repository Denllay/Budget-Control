import * as AuthCheck from './Auth/CheckAuth';
import * as AuthReg from './Auth/RegAuth';
import * as AuthSignOut from './Auth/SignOutAuth';
import * as AuthLogin from './Auth/LoginAuth';
import * as GetDataBudget from './Budget/GetDataBudget';
import * as AddCategoryBudget from './Budget/AddCategoryBudget';
import * as AddBudget from './Budget/AddBudget';
import * as ChangeDataCategory from './Budget/ChangeDataCategory';
import * as DeleteBudget from './Budget/DeleteBudget';
import * as DeleteCategory from './Budget/DeleteCategory';
import * as DeleteAllBudgets from './Budget/DeleteAllBudgets';
import * as UpdatePassword from './Auth/UpdatePassword';
import * as ChangeViewModal from './Modal/ChangeViewModal';
import * as CloseModal from './Modal/CloseModal';
import * as ClearVolatileData from './VolatileBudget/ClearVolatileData';
import * as SetVolatileInitialData from './VolatileBudget/SetVolatileInitialData';
export default {
  ...AuthCheck,
  ...AuthReg,
  ...AuthSignOut,
  ...AuthLogin,
  ...GetDataBudget,
  ...AddCategoryBudget,
  ...AddBudget,
  ...ChangeDataCategory,
  ...DeleteBudget,
  ...DeleteCategory,
  ...DeleteAllBudgets,
  ...UpdatePassword,
  ...ChangeViewModal,
  ...CloseModal,
  ...ClearVolatileData,
  ...SetVolatileInitialData,
};
