import { observable, runInAction, action,flow } from "mobx"
import {getOperators} from '../api'
export default class OperatorsStore {
    constructor(rootStore) {
        this.rootStore = rootStore
        this.fetchProjects()
      }
    @observable operators = []
    @observable state = "pending" // "pending" / "done" / "error"
 
    fetchProjects = flow(function* () { 
        this.operators = []
        this.state = "pending"
        try {
            const operatorsRequest = yield fetch(...getOperators())
            const operators = yield operatorsRequest.json()
            // the asynchronous blocks will automatically be wrapped in actions and can modify state
            this.state = "done"
            this.operators = operators
        } catch (error) {
            this.state = "error"
        }
    }).bind(this)
}