import React from 'react'
import { Link } from "react-router-dom";

interface Props {
  projectTitle:string;
  projectIndex:number;
}

class ProjectItem extends React.Component<Props> {

  render () {
    const {projectTitle, projectIndex} = this.props;

    return(
      <div className='project'>
        <Link to={"/project/" + projectTitle + "/" + projectIndex}>
          <div
            className='basic'
            // style={{display:this.state.projectDisplay}}
            // onClick={this.openCreateProject}
          >
            {projectTitle}
          </div>
        </Link>
      </div>
    )
  }
}

export default ProjectItem;
