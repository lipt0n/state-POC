import Koa from 'koa'
import Router from  'koa-router'
import requestId  from '@kasa/koa-request-id'
import logging  from '@kasa/koa-logging'
import pino  from 'pino'
import bodyParser from 'koa-bodyparser'
import operators from './operators'
import steps_base from './steps'
const app = new Koa()
const router = new Router({'prefix':'/api'})

app.use(requestId())
app.use(bodyParser())
app.use(logging({ logger: pino({
  prettyPrint: true,
  colorize: true
}) }))

router.get('/operators', (ctx, next) => {
    ctx.body = operators
  });
let steps=[...steps_base]
router.get('/projects/:projectId/workflows/:workflowId/steps', (ctx, next) => {
  ctx.body = steps
});

router.post('/projects/:projectId/workflows/:workflowId/steps/:stepId/runs',(ctx,next)=>{
  const {stepId} = ctx.params
  let changed = false
  let last_result = true
  steps = steps.map(s=>{
    if(parseInt(stepId)===s.id){
      changed=true
      s.last_executed_at  =new Date()
      if(last_result) s.status = 'in_progress'
      else s.status='error'
      return s
    }
    if(changed) s.status = 'outdated'
    return s
  })

  ctx.body = {
    status :'success'
  }
})
router.put('/projects/:projectId/workflows/:workflowId/steps/:stepId/runs',(ctx,next)=>{
  const {stepId} = ctx.params
  const {configuration} = ctx.request.body
  let changed = false
  steps = steps.map(s=>{
    if(parseInt(stepId)===s.id){
      changed=true
      s.status = 'outdated'
      s.configuration = configuration
      return s
    }
    if(changed) s.status = 'outdated'
    return s
  })

  ctx.body = steps.filter(s=>parseInt(stepId)===s.id)[0]
})


setInterval(()=>{
  let value=steps[0].configuration[0].value 
  let last_status = 'up_to_date'
for(const s of steps){
  if(s.status === 'up_to_date' && s.outputs && s.outputs[0].value) value = s.outputs[0].value
  // up_to_date - pass
  if(s.status==='in_progress') {
    if(last_status!=='up_to_date'){
      s.outputs = []
      s.status = 'error'

    } else {
    s.status = 'up_to_date'
    if(s.configuration[0].increment) value++
    s.outputs = [
      {value}
    ]}
    break;
  }
 
  last_status = s.status
}
},10000)
app
  .use(router.routes())
  .use(router.allowedMethods());
app.listen(3001)