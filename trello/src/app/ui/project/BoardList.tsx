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
    let { boardList } = this.props.boardStore!;

    // let boardList1 = JSON.parse(localStorage.getItem('board')!);
    // console.log(boardList1);
    if(!boardList){
      boardList = [];
      this.props.boardStore!.setBoardNull();
    }

    return(
      <>
        {
          // boardList.map((data,index) => (
          boardList.map((data:any,index:any) => (
            <BoardItem boardTitle={data.title} key={index}/>
          ))
        }
      </>
    )
  }
}

export default BoardList;
