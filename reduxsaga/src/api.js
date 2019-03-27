const url = '/api'
const getSteps = (project_id,workflow_id)=> [`${url}/projects/${project_id}/workflows/${workflow_id}/steps`]
const getOperators = ()=>[`${url}/operators`]
const runStep = (project_id,workflow_id,step_id)=>[`${url}/projects/${project_id}/workflows/${workflow_id}/steps/${step_id}/runs`,{method: "POST"}]
const changeConfig = (project_id,workflow_id,step_id,config)=>[`${url}/projects/${project_id}/workflows/${workflow_id}/steps/${step_id}/runs`,{method: "PUT", body:JSON.stringify(config), headers:{"Content-Type": "application/json"}}]


export {getSteps, getOperators,runStep,changeConfig}