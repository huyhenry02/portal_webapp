import { fork } from 'redux-saga/effects';
import testSaga from './test.saga';
import manageProfileSaga from './manageProfile.saga';
import authenticateSaga from './authenticate.saga';
import sidebarSaga from './sidebar.saga';
import manageRoleSaga from './manageRole.saga';
import manageUserSaga from './manageUser.saga';
import appointmentSaga from './manageAppointment.saga';
import createProfileSaga from './createProfile.saga';
import manageLogSaga from './manageLog.saga';
import manageCompanySaga from './manageCompany.saga';
import manageAssetSaga from './manageAsset.saga';
import editProfileSaga from './editProfile.saga';

const rootSaga = function* () {
  yield fork(testSaga);
  yield fork(manageProfileSaga);
  yield fork(createProfileSaga);
  yield fork(authenticateSaga);
  yield fork(appointmentSaga);
  yield fork(sidebarSaga);
  yield fork(manageRoleSaga);
  yield fork(manageUserSaga);
  yield fork(manageLogSaga);
  yield fork(manageCompanySaga);
  yield fork(manageAssetSaga);
  yield fork(editProfileSaga);
};

export default rootSaga;
