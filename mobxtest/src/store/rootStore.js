import ProjectsStore from './projects'
import OperatorsStore from './operators'
import StepsStore from './steps'

export class RootStore {
    constructor() {
      this.projectsStore = new ProjectsStore(this)
      this.operatorsStore = new OperatorsStore(this)
      this.stepsStore = new StepsStore(this)
    }
  }

export default new RootStore()