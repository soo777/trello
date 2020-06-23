import React from 'react';
import ProjectStore from "~/app/service/ProjectStore";
import { inject, observer } from "mobx-react";
import ProjectItem from "~/app/ui/project/ProjectItem";
import { Button, Icon, Modal } from "semantic-ui-react";
import ListStore from "~/app/service/ListStore";

interface Props {
  projectStore?:ProjectStore;
  listStore?:ListStore;
}

interface State {
  open:boolean;
}

@inject('projectStore', 'listStore')
@observer
class ProjectList extends React.Component<Props, State> {
  constructor (props:any) {
    super(props);
    this.state = {
      open: false,
    };
  }

  resetLocalStorage = () => {
    this.setState({open:false});

    localStorage.clear();
    this.props.projectStore!.setProjectNull();
    this.props.listStore!.setBoardListNull();
  }

  closeTrashModal = () => {
    this.setState({open:false});
  }

  openModal = () => {
    this.setState({open:true})
  }

  render(){
    const {open} = this.state;

    let { projectList } = this.props.projectStore!;

    if(!projectList){
      projectList = [];
      this.props.projectStore!.setProjectNull();
    }

    return(
      <>
        {
          projectList.map((data:any,index:any) => (
            <ProjectItem projectTitle={data.title} projectIndex={data.projectIndex} key={index} />
          ))
        }
        {
          projectList.length !== 0
            ?
            <div className="project">
              <Icon
                className="trash alternate outline"
                size="big"
                onClick={this.openModal}
              />
            </div>
            :
            ''
        }

        <Modal size="mini" open={open} onClose={this.closeTrashModal}>
          <Modal.Header>Delete Your Data</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete all data?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button content="No" onClick={this.closeTrashModal}/>
            <Button
              positive
              icon='checkmark'
              labelPosition='right'
              content='Yes'
              onClick={this.resetLocalStorage}
            />
          </Modal.Actions>
        </Modal>
      </>
    )
  }
}

export default ProjectList;
