import { spawn }  from 'redux-saga/effects'

import {initOperatorsSagas} from './ducks/operators'
import {initStepsSagas} from './ducks/steps'

export default function*(){
    yield spawn(initOperatorsSagas)
    yield spawn(initStepsSagas)

}