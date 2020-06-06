import React from 'react';
import { Button, Icon, Input } from "semantic-ui-react";
import ProjectStore from "~/app/service/ProjectStore";
import { inject, observer } from "mobx-react";
import ListStore from "~/app/service/ListStore";

interface Props {
  projectStore?:ProjectStore;
  listStore?:ListStore;
}

@inject('projectStore', 'listStore')
@observer
class Project extends React.Component<Props> {

  componentDidMount () {
    const projects = JSON.parse(localStorage.getItem('project')!);

    if(projects) {
      this.props.projectStore!.setProjectList(projects);
    }

    console.log('home');
    this.props.listStore!.setListNull();
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
