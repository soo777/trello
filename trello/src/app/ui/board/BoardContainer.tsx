import React from "react";
import Board from "~/app/ui/board/Board";

class BoardContainer extends React.Component {

  render () {

    return (
      <>
        <div className='flex_overflow'>
          <Board/>
        </div>
      </>
    );
  }

}

export default BoardContainer;
