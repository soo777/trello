import React from 'react'
import { Link } from "react-router-dom";

interface Props {
  projectTitle:string;
  index:number;
}

class ProjectItem extends React.Component<Props> {

  render () {
    const {projectTitle, index} = this.props;

    return(
      <div className='project'>
        <Link to={"/project/" + projectTitle + "/" + index}>
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
