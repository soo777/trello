import React from 'react';
import Board from "~/app/ui/project/Board";

class ProjectContainer extends React.Component {

  render(){

    return(
      <>
        <div className='title'>
          <img src='/images/light_64.png'/>
        </div>

        <Board/>
      </>
    )
  }


}

export default ProjectContainer;
