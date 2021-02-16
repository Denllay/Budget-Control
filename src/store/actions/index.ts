import * as AuthCheckActionCreators from './Auth/CheckAuth';
import * as AuthRegActionCreators from './Auth/RegAuth';
import * as AuthSignOutActionCreators from './Auth/SignOutAuth';
import * as AuthLoginActionCreators from './Auth/LoginAuth';
export default {
  ...AuthCheckActionCreators,
  ...AuthRegActionCreators,
  ...AuthSignOutActionCreators,
  ...AuthLoginActionCreators,
};
