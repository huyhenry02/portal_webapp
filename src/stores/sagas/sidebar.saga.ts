import { put, takeEvery } from 'redux-saga/effects';
import { sidebarActions } from '../slices/sidebar.slice';

const handleChangeMinimumSidebar = function* () {
  yield put({ type: sidebarActions.changeMinimumSidebar.type });
};

const sidebarSaga = function* () {
  yield takeEvery(
    `${sidebarActions.changeMinimumSidebar.type}_saga`,
    handleChangeMinimumSidebar,
  );
};

export default sidebarSaga;
