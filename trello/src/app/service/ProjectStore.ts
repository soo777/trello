import { action, observable } from "mobx";

class ProjectStore {

  @observable
  projectDisplay: string = "display";

  @observable
  createProjectDisplay: string = "none";

  @observable
  projectList: { projectIndex: number, title: string }[] = [];

  @observable
  projectIndex: number = 0;

  @action
  createProject (projectTitle: string) {
    let index = parseInt(localStorage.getItem("projectIndex")!);
    if (index >= 0) {
      index += 1;
      localStorage.setItem("projectIndex", index.toString());
      this.projectIndex = index;
    } else {
      localStorage.setItem("projectIndex", "0");
      index = 0;
      this.projectIndex = index;
    }

    const project = [{ "projectIndex": this.projectIndex, "title": projectTitle }];
    this.projectList = this.projectList.concat(project);

    let list = this.projectList;
    localStorage.setItem("project", JSON.stringify(list));
  }

  @action
  setProjectNull () {
    this.projectList = [];
  }

  @action
  setProjectList (projects: any) {
    this.projectList = projects;
  }
}

export default ProjectStore;
