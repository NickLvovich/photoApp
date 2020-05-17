import {takeEvery} from 'redux-saga'
import {PHOTO_LIST} from '../types'
import {hideLoader, showAlert, showLoader} from '../actions'

export function* sagaWatcher() {
    yield takeEvery(PHOTO_LIST, sagaWorker)
}

function* sagaWorker() {
    try {
      yield put(showLoader())
      const payload = yield call(fetchPosts)
      yield put({ type: PHOTO_LIST, payload })
      yield put(hideLoader())
    } catch (e) {
      yield put(showAlert('Что-то пошло не так'))
      yield put(hideLoader())
    }
  }



  