import React from 'react';
import { Button, Input } from "semantic-ui-react";

class ProjectContainer extends React.Component {

  render(){

    return(
      <>
        <div className='title'>
          images
        </div>

        <div className='board'>
          Creating Board
          <Input focus placeholder='Board...' />
          <div className='text_right'>
            <Button content='Create' color='green' />
            <Button content='Cancel' />
          </div>
        </div>
      </>
    )
  }


}

export default ProjectContainer;
