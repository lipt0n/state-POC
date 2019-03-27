import { combineReducers } from 'redux'
import {activeProjectReducer} from './ducks/projects'
import {activeWorkflowReducer} from './ducks/workflows'
import {errorReducer} from './ducks/error'
import {operatorsReducer} from './ducks/operators'
import {stepsReducer} from './ducks/steps'
export default combineReducers({
    activeProject:activeProjectReducer,
    activeWorkflow:activeWorkflowReducer,
    error:errorReducer,
    operators:operatorsReducer,
    steps:stepsReducer


})