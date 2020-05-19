import React from 'react';
import BoardStore from "~/app/service/BoardStore";
import { inject, observer } from "mobx-react";
import BoardItem from "~/app/ui/project/BoardItem";

interface Props {
  boardStore?:BoardStore;
}

@inject('boardStore')
@observer
class BoardList extends React.Component<Props> {

  render(){
    const { boardList } = this.props.boardStore!;

    return(
      <>
        {
          boardList.map((data,index) => (
            <BoardItem boardTitle={data} key={index}/>
          ))
        }
      </>
    )
  }
}

export default BoardList;
