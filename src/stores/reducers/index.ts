import { combineReducers } from '@reduxjs/toolkit';
import testReducer from '../slices/test.slice';
import manageProfileReducer from '../slices/manageProfile.slice';
import manageAppointmentReducer from '../slices/manageAppointment.slice';
import AuthenticateReducer from '../slices/authenticate.slice';
import sidebarReducer from '../slices/sidebar.slice';
import manageRoleReducer from '../slices/manageRole.slice';
import manageUserReducer from '../slices/manageUser.slice';
import createProfileReducer from '../slices/createProfile.slice';
import manageCompanyReducer from '../slices/manageCompany.slice';
import manageLogReducer from '../slices/manageLog.slice';
import manageAssetReducer from '../slices/manageAsset.slice';
import editProfileReducer from '../slices/editProfile.slice';

const rootReducer = combineReducers({
  test: testReducer,
  manageProfile: manageProfileReducer,
  createProfile: createProfileReducer,
  manageAppointment: manageAppointmentReducer,
  authenticate: AuthenticateReducer,
  sidebar: sidebarReducer,
  manageRole: manageRoleReducer,
  manageUser: manageUserReducer,
  manageCompany: manageCompanyReducer,
  manageLog: manageLogReducer,
  manageAsset: manageAssetReducer,
  editProfile: editProfileReducer,
});

export default rootReducer;
