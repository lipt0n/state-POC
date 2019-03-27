
import * as steps from './steps'
import { select, put, takeLatest,delay,fork }  from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
beforeEach(() => {
    fetch.resetMocks()
  })

const stepsObj = [{"id":0,"operator_id":"load_int","last_executed_at":"2019-03-25T21:50:58.643Z","status":"up_to_date","configuration":[{"value":1}],"inputs":[],"outputs":[{"value":1}]},{"id":1,"operator_id":"increment_int","last_executed_at":"2019-03-25T22:00:41.906Z","status":"up_to_date","configuration":[{"increment":0}],"inputs":[{"other_step_id":0,"other_step_type_output_id":"value","step_type_input_id":"value"}],"outputs":[{"value":1}]},{"id":2,"operator_id":"increment_int","last_executed_at":"2019-03-25T22:01:11.145Z","status":"up_to_date","configuration":[{"increment":1}],"inputs":[{"other_step_id":1,"other_step_type_output_id":"value","step_type_input_id":"value"}],"outputs":[{"value":2}]},{"id":3,"operator_id":"increment_int","last_executed_at":"2019-03-25T22:01:13.904Z","status":"up_to_date","configuration":[{"increment":0}],"inputs":[{"other_step_id":2,"other_step_type_output_id":"value","step_type_input_id":"value"}],"outputs":[{"value":2}]}]

test('getSteps action creator',()=>{
    expect(steps.getSteps()).toMatchSnapshot()
})
test('setSteps action creator',()=>{
    expect(steps.setSteps(stepsObj)).toMatchSnapshot()
})
test('runStep action creator',()=>{
    expect(steps.runStep(1)).toMatchSnapshot()
})
test('changeStepConfig action creator',()=>{
    expect(steps.changeStepConfig(1,{"increment":0})).toMatchSnapshot()
})
test('stepsReducer',()=>{
    expect(steps.stepsReducer(undefined, {type:"something else"}).length).toEqual(0)
    expect(steps.stepsReducer(undefined,steps.setSteps(stepsObj))).toMatchSnapshot()
})
// normal testing using .next .next .next 
test('sagaFetch*',()=>{
    const sagaFetch = steps.sagaFetch(1,1)
    const getJsonMock = jest.fn()
    getJsonMock.mockReturnValue(stepsObj)
    sagaFetch.next() // yield fetch(...getStepsApi(activeProject,actinpm startveWorkflow))
    sagaFetch.next({
        json: getJsonMock,
      }) // yield steps.json()
    expect(getJsonMock).toBeCalled()
    const put = sagaFetch.next(stepsObj) // every time you call next you have to pass object or it will be undefined 
    expect(put.value.type).toEqual('PUT')
    expect(JSON.stringify(put.value.payload.action)).toEqual(JSON.stringify(steps.setSteps(stepsObj)))
    expect(sagaFetch.next().done).toBeTruthy()
})


test('sagaFetch* with plan!',()=>{
    fetch.mockResponse(JSON.stringify(stepsObj))
    return expectSaga(steps.sagaFetch, 1,1)
    .put(steps.setSteps(stepsObj))
    .run()
})

test('sagaInterval* ',()=>{
    const saga = steps.sagaInterval()
    expect(saga.next().value.type).toEqual('SELECT')
    expect(saga.next().value.type).toEqual('SELECT')
    expect(saga.next().value.type).toEqual('FORK') // test it like that
    const delayb = saga.next()
    expect(delayb.value.type).toEqual('CALL')
    expect(delayb.value).toEqual(delay(10000)) // or liker that! 
   // infinite loop
})