import { observable, action,flow } from "mobx"
import {getSteps,runStep,changeConfig} from '../api'

export default class StepsStore {
    constructor(rootStore) {
        this.rootStore = rootStore
      }
    fetchInterval = null;  
    @observable steps = []
    @observable state = "pending" // "pending" / "done" / "error"
    @action watchStart = ()=>{
        this.fetchInterval = setInterval(this.fetchSteps,10000)
    }
    @action watchStop = ()=>{
        clearInterval(this.fetchInterval)
    }
    fetchSteps = flow(function* () { 
        this.state = "pending"
        try {
            const {activeProject, activeWorkflow} = this.rootStore.projectsStore
            let steps = yield fetch(...getSteps(activeProject, activeWorkflow))
            steps = yield steps.json()
            this.state = "done"
            this.steps = steps
        } catch (error) {
            this.state = "error"
        }
    }).bind(this)
    runStep = flow(function*(stepId){
        const {activeProject, activeWorkflow} = this.rootStore.projectsStore
        try {
            const run = yield fetch(...runStep(activeProject, activeWorkflow,stepId))
            this.fetchSteps()
        } catch (error) {
            this.state = "error"
        }
    }).bind(this)
    changeStepConfig = flow(function*(stepId,config){
        const {activeProject, activeWorkflow} = this.rootStore.projectsStore
        try {
            const run = yield fetch(...changeConfig(activeProject, activeWorkflow,stepId,config))
            this.fetchSteps()
        } catch (error) {
            this.state = "error"
        }
    }).bind(this)
}