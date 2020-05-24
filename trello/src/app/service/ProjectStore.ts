import { action, observable } from "mobx";

class ProjectStore {

  @observable
  projectDisplay: string = "display";

  @observable
  createProjectDisplay: string = "none";

  @observable
  projectList: { index: number, title: string }[] = [];

  @observable
  projectIndex: number = 0;

  @action
  createProject (projectTitle: string) {
    let index = parseInt(localStorage.getItem("index")!);
    if (index >= 0) {
      index += 1;
      localStorage.setItem("index", index.toString());
      this.projectIndex = index;
    } else {
      localStorage.setItem('index', '0');
      index = 0;
      this.projectIndex = index;
    }

    const project = [{ "index": this.projectIndex, "title": projectTitle }];
    this.projectList = this.projectList.concat(project);

    let list = this.projectList;
    console.log(list);
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
