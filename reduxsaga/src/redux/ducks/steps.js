import {showError} from './error'
import {getSteps as getStepsApi, runStep as runStepApi, changeConfig as changeConfigApi} from '../../api'
import {getActiveProject} from './projects'
import {getActiveWorkflow} from './workflows'
import { select, put, takeLatest,delay,fork }  from 'redux-saga/effects'

export const TYPES = {
    get:'STEPS:GET',
    set:'STEPS:SET',
    change:'STEPS:CHANGE',
    run:'STEPS:RUN'
}

export const getSteps = () => ({
    type:TYPES.get
})
export const setSteps= (steps) => ({
    type:TYPES.set,
    payload:steps
})
export const runStep= (stepId) => ({
    type:TYPES.run,
    payload:{
        stepId
    }
})
export const changeStepConfig= (stepId,config) => ({
    type:TYPES.change,
    payload:{
        stepId,
        config
    }
})
export const stepsReducer = (state=[], action) => {
    if(action.type === TYPES.set) return action.payload
    return state
}
export function* sagaFetch(activeProject,activeWorkflow){
    let steps = yield fetch(...getStepsApi(activeProject,activeWorkflow))
    steps = yield steps.json()
    yield put(setSteps(steps))
}
export function* sagaInterval(){
try {
    const activeProject = yield select(getActiveProject)
    const activeWorkflow = yield select(getActiveWorkflow)
    while(true){
        yield fork(sagaFetch,activeProject,activeWorkflow)
        yield delay(10000)
    }
  } catch (error) {
    yield put(showError(error))
  }
}
export function* sagaRun(action){
    try {
        const activeProject = yield select(getActiveProject)
        const activeWorkflow = yield select(getActiveWorkflow)
        yield fetch(...runStepApi(activeProject,activeWorkflow,action.payload.stepId))
        yield fork(sagaFetch,activeProject,activeWorkflow)

      } catch (error) {
        yield put(showError(error))
      }
}
export function* sagaChangeConfig(action){
    try {
        const activeProject = yield select(getActiveProject)
        const activeWorkflow = yield select(getActiveWorkflow)
        yield fetch(...changeConfigApi(activeProject,activeWorkflow,action.payload.stepId, action.payload.config))
        yield fork(sagaFetch,activeProject,activeWorkflow)

        } catch (error) {
        yield put(showError(error))
        }
}
export function* initStepsSagas() {
  yield takeLatest(TYPES.get, sagaInterval)
  yield takeLatest(TYPES.run, sagaRun)
  yield takeLatest(TYPES.change, sagaChangeConfig)

}
export const selectSteps = state => state.steps