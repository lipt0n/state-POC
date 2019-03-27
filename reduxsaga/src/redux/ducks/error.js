const type = 'ERROR'

export const showError = (error)=>({
    type,
    payload:error
})
export const hideError = ()=>({
    type,
    payload:{}
})

export const errorReducer=(state={},action)=>{
    if(action.type===type) return action.payload
    return state
}