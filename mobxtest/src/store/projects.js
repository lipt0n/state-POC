import { observable, computed } from "mobx"

export default class ProjectsStore {
    constructor(rootStore) {
        this.rootStore = rootStore
      }
    @observable activeProject = 1
    @observable activeWorkflow = 1
}