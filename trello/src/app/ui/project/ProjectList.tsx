import React from 'react';
import ProjectStore from "~/app/service/ProjectStore";
import { inject, observer } from "mobx-react";
import ProjectItem from "~/app/ui/project/ProjectItem";

interface Props {
  projectStore?:ProjectStore;
}

@inject('projectStore')
@observer
class ProjectList extends React.Component<Props> {

  render(){
    let { projectList } = this.props.projectStore!;

    // let projectList1 = JSON.parse(localStorage.getItem('project')!);
    // console.log(projectList1);
    if(!projectList){
      projectList = [];
      this.props.projectStore!.setProjectNull();
    }

    return(
      <>
        {
          projectList.map((data:any,index:any) => (
            <ProjectItem projectTitle={data.title} index={data.index} key={data.index} />
          ))
        }
      </>
    )
  }
}

export default ProjectList;
