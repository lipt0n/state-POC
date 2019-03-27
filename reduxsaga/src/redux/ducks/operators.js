import { put, takeLatest }  from 'redux-saga/effects'
import {showError} from './error'
import {getOperators as getOperatorsApi} from '../../api'
const TYPES = {
    get:'OPERATORS:GET',
    set:'OPERATORS:SET',
}

export const getOperators = () => ({
    type:TYPES.get
})
export const setOperators = (operators) => ({
    type:TYPES.set,
    payload:operators
})
export const operatorsReducer = (state=[], action) => {
    if(action.type === TYPES.set) return action.payload
    return state
}
function* saga(){
try {
    let operators = yield fetch(...getOperatorsApi())
    operators = yield operators.json()
    yield put(setOperators(operators))
  } catch (error) {
    yield put(showError(error))
  }
}

export function* initOperatorsSagas() {
  yield takeLatest(TYPES.get, saga)
}
export const selectOperators = state => state.operators