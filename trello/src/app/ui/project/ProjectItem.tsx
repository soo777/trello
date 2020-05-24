import React from 'react'
import { Link } from "react-router-dom";

interface Props {
  projectTitle:string;
}

class ProjectItem extends React.Component<Props> {

  render () {
    const {projectTitle} = this.props;

    return(
      <div className='project'>
        <Link to={"/project/" + projectTitle}>
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
