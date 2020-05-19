import React from 'react'

interface Props {
  boardTitle:string;
}

class BoardItem extends React.Component<Props> {

  render () {
    const {boardTitle} = this.props;

    return(
      <div className='board'>
        <div
          className='basic'
          // style={{display:this.state.boardDisplay}}
          // onClick={this.openCreateBoard}
        >
          {boardTitle}
        </div>
      </div>
    )
  }
}

export default BoardItem;
