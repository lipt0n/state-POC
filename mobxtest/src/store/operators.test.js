import o from './operators'
import operators_response from '../../../server/operators'
beforeEach(() => {
    fetch.resetMocks()
  })
test('operators',()=>{
    const oi = new o({})
    expect(oi.operators).toMatchSnapshot()
})
test('fetch operators',async ()=>{
    fetch.mockResponse(JSON.stringify(operators_response))
    const oi = new o({})
    const fetchMyData = await oi.fetchProjects()
    expect(oi.state).toEqual("done")  
})
test('fetch operators fail',async ()=>{
    fetch.mockReject(new Error('fake error message'))
    const oi = new o({})
    const fetchMyData = await oi.fetchProjects()
    expect(oi.state).toEqual("error")   
})