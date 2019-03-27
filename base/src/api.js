const url = '/api'
const get_steps = (project_id,workflow_id)=> fetch(`${url}/projects/${project_id}/workflows/${workflow_id}/steps`)
const get_operators = ()=>fetch(`${url}/operators`)
const run_step = (project_id,workflow_id,step_id)=>fetch(`${url}/projects/${project_id}/workflows/${workflow_id}/steps/${step_id}/runs`,{method: "POST"})
const change_config = (project_id,workflow_id,step_id,config)=>fetch(`${url}/projects/${project_id}/workflows/${workflow_id}/steps/${step_id}/runs`,{method: "PUT", body:JSON.stringify(config), headers:{"Content-Type": "application/json"}})


export {get_steps, get_operators,run_step,change_config}