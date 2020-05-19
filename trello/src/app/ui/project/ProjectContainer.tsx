import React from 'react';
import Board from "~/app/ui/project/Board";
import BoardList from "~/app/ui/project/BoardList";

class ProjectContainer extends React.Component {

  render(){

    return(
      <>
        <div className='title'>
          <img src='/images/light_64.png'/>
        </div>

        <div className='flex_overflow'>
          <Board/>
          <BoardList/>
        </div>
      </>
    )
  }

}

export default ProjectContainer;
