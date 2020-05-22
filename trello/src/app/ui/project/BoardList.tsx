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

    let boardList1 = JSON.parse(localStorage.getItem('board')!);
    console.log(boardList1);
    if(!boardList1){
      boardList1 = [];
    }

    console.log(this.props.boardStore!.boardList);

    return(
      <>
        {
          // boardList.map((data,index) => (
          boardList1.map((data:any,index:any) => (
            <BoardItem boardTitle={data} key={index}/>
          ))
        }
      </>
    )
  }
}

export default BoardList;
