import React from 'react'
import { Link } from "react-router-dom";

interface Props {
  boardTitle:string;
}

class BoardItem extends React.Component<Props> {

  render () {
    const {boardTitle} = this.props;

    return(
      <div className='board'>
        <Link to={"/board/" + boardTitle}>
          <div
            className='basic'
            // style={{display:this.state.boardDisplay}}
            // onClick={this.openCreateBoard}
          >
            {boardTitle}
          </div>
        </Link>
      </div>
    )
  }
}

export default BoardItem;
