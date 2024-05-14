import { put, takeEvery } from 'redux-saga/effects';
import { testActions } from '../slices/test.slice';

const handleIncrement = function* (action) {
  try {
    yield put({ type: testActions.increment.type, payload: action.payload });
  } catch (e) {
    yield put({ type: testActions.resetState.type });
  }
};

const handleDecrement = function* (action) {
  try {
    yield put({ type: testActions.decrement.type, payload: action.payload });
  } catch (e) {
    yield put({ type: testActions.resetState.type });
  }
};

const testSaga = function* () {
  yield takeEvery(`${testActions.increment.type}_saga`, handleIncrement);
  yield takeEvery(`${testActions.decrement.type}_saga`, handleDecrement);
};

export default testSaga;
