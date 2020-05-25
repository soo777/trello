import React from 'react';
import { Button, Icon, Input } from "semantic-ui-react";
import ProjectStore from "~/app/service/ProjectStore";
import { inject, observer } from "mobx-react";

interface Props {
  projectStore?:ProjectStore;
}

@inject('projectStore')
@observer
class Project extends React.Component<Props> {

  componentDidMount () {
    const projects = JSON.parse(localStorage.getItem('project')!);

    if(projects) {
      this.props.projectStore!.setProjectList(projects);
    }

    // if(projects){
    //   for(let i=0; i<projects.length; i++){
    //     console.log(projects[i]);
    //   }
    // }
  }

  state = {
    projectDisplay: 'block',
    createProjectDisplay: 'none',
    projectTitle: '',
  };

  openCreateProject = () =>{
    this.setState({
      projectDisplay: 'none',
      createProjectDisplay: 'block'
    });
  };

  closeCreateProject = () => {
    this.setState({
      projectDisplay: 'block',
      createProjectDisplay: 'none',
      projectTitle: ''
    });
  }

  changeProjectInput = (e:React.FormEvent<HTMLInputElement>) => {
    this.setState({
      projectTitle:e.currentTarget.value
    })
  }

  createProject = () => {
    this.props.projectStore?.createProject(this.state.projectTitle);
    this.setState({
      projectDisplay: 'block',
      createProjectDisplay: 'none',
      projectTitle: '',
    });
  }

  render(){

    return(
      <div className='project'>

        <div
          className='basic'
          style={{display:this.state.projectDisplay}}
          onClick={this.openCreateProject}
        >
          Creating a new Project
        </div>

        <div
          className='wrapper'
          style={{display:this.state.createProjectDisplay}}
        >
          <div>
            <div className='box'>
              Creating Project
              <span className='closeIcon' onClick={this.closeCreateProject}>
                <Icon name='close'  />
              </span>
            </div>
            <Input className='box' focus placeholder='Project...' onChange={this.changeProjectInput} value={this.state.projectTitle}></Input>
            <div className='text_right box'>
              <Button content='Create' onClick={this.createProject}/>
              <Button content='Cancel' onClick={this.closeCreateProject}/>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default  Project;
