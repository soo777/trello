import React from "react";
import { Link } from "react-router-dom";

interface Props {
  boardTitle: string;
  boardIndex: number;
}

class BoardItem extends React.Component<Props> {

  render () {
    const { boardTitle, boardIndex } = this.props;

    return (
      <div className='board'>
        <Link to={"/board/" + boardTitle + "/" + boardIndex}>
          <div className='basic'>
            {boardTitle}
          </div>
        </Link>
      </div>
    );
  }
}

export default BoardItem;
