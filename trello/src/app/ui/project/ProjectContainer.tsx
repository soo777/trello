import React from 'react';
import Project from "~/app/ui/project/Project";
import ProjectList from "~/app/ui/project/ProjectList";

class ProjectContainer extends React.Component {

  render(){

    return(
      <>
        <div className='flex_overflow'>
          <Project/>
          <ProjectList/>
        </div>
      </>
    )
  }

}

export default ProjectContainer;
