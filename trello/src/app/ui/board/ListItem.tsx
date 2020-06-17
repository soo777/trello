import React from 'react';
import { Icon } from "semantic-ui-react";
import ListStore from "~/app/service/ListStore";
import { inject, observer } from "mobx-react";
import autobind from "~/app/service/autobindDecorator";


interface Props {
  listStore?: ListStore;
  boardIndex:string,
  listIndex:string,
  title:string,
  checked:boolean,
}

interface State {
  checked:boolean,
}

@inject("listStore")
@observer
@autobind
class ListItem extends React.Component<Props, State>{
  constructor (props:any) {
    super(props);
    this.state = {
      checked: this.props.checked,
    };
  }

  // checkItem = () => {
  //   const {boardIndex, listIndex, title, } = this.props;
  //
  //   const board = JSON.parse(localStorage.getItem('board')!);
  //   console.log(board);
  //
  //   console.log(boardIndex);
  //   console.log(listIndex);
  //
  //   console.log('projectIndex - ' + this.props.listStore!.projectIndex);
  //
  //   // let list:any = [];
  //   // board.forEach((data:any) => {
  //   //   if(data.boardIndex === Number.parseInt(boardIndex)){
  //   //     list = data.cards;
  //   //   }
  //   // });
  //
  //   let list:any = [];
  //   const projectIndex = this.props.listStore!.projectIndex;
  //   board.forEach((data:any) => {
  //     console.log(data)
  //     if(data.projectIndex === projectIndex){
  //       list = list.concat(data.cards);
  //     }
  //   });
  //
  //   console.log(list);
  //
  //   // list = this.props.listStore!.card;
  //
  //   let changeIndex = 0;
  //   for(let i=0; i<list.length; i++) {
  //     console.log(i + " -- " + list[i].title + ': ' + list[i].boardIndex + " - " + list[i].listIndex + " - " + list[i].checked)
  //     if(list[i].listIndex === listIndex) {
  //       changeIndex = i;
  //     }
  //   }
  //   console.log(changeIndex)
  //
  //   let checked;
  //   list[changeIndex].checked ? checked = false : checked = true;
  //
  //   console.log(checked)
  //   const arr = { boardIndex: list[changeIndex].boardIndex, listIndex: listIndex, title: title, checked: checked };
  //   list.splice(changeIndex, 1, arr);
  //
  //   for(let i=0; i<list.length; i++) {
  //     console.log(i + " -- " + list[i].title + ': ' + list[i].boardIndex + " - " + list[i].listIndex + " - " + list[i].checked)
  //   }
  //
  //   this.setState({
  //     checked:checked,
  //   })
  //
  //   this.props.listStore!.setListAfterDrag(list);
  //
  //   console.log(board);
  //   localStorage.setItem("board", JSON.stringify(board));
  //
  // }

  // checkItem = () => {
  //   const {boardIndex, listIndex, title, } = this.props;
  //
  //   const board = JSON.parse(localStorage.getItem('board')!);
  //
  //   let list:any = [];
  //   board.forEach((data:any) => {
  //     if(data.boardIndex === Number.parseInt(boardIndex)){
  //       list = data.cards;
  //     }
  //   });
  //
  //   let changeIndex = 0;
  //   for(let i=0; i<list.length; i++) {
  //     if(list[i].listIndex === listIndex) {
  //       changeIndex = i;
  //     }
  //   }
  //
  //   let checked;
  //   list[changeIndex].checked ? checked = false : checked = true;
  //
  //   const arr = { boardIndex: boardIndex, listIndex: listIndex, title: title, checked: checked };
  //   list.splice(changeIndex, 1, arr);
  //   localStorage.setItem("board", JSON.stringify(board));
  //
  //   this.setState({
  //     checked:checked,
  //   })
  // }

  checkItem = () => {
    const {boardIndex, listIndex, title, } = this.props;

    const board = JSON.parse(localStorage.getItem('board')!);
    console.log(board);

    console.log(boardIndex);
    console.log(listIndex);

    console.log('projectIndex - ' + this.props.listStore!.projectIndex);

    let list:any = [];
    // list = this.props.listStore!.card;

    const projectIndex = this.props.listStore!.projectIndex;
    board.forEach((data:any) => {
      console.log(data)
      if(data.projectIndex === projectIndex){
        list = list.concat(data.cards);
      }
    });

    let newBoardIndex:any;
    list.forEach((data:any) => {
      console.log( " -- " + data.title + ': ' + data.boardIndex + " - " + data.listIndex + " - " + data.checked)
      if(data.listIndex === listIndex){
        newBoardIndex = data.boardIndex;
      }
    });
    console.log(newBoardIndex);

    list = [];
    board.forEach((data:any) => {
      if(data.boardIndex === Number.parseInt(newBoardIndex)){
        list = data.cards;
      }
    });

    // let list:any = [];
    // const projectIndex = this.props.listStore!.projectIndex;
    // board.forEach((data:any) => {
    //   console.log(data)
    //   if(data.projectIndex === projectIndex){
    //     list = list.concat(data.cards);
    //   }
    // });

    console.log(list);

    // list = this.props.listStore!.card;

    let changeIndex = 0;
    for(let i=0; i<list.length; i++) {
      console.log(i + " -- " + list[i].title + ': ' + list[i].boardIndex + " - " + list[i].listIndex + " - " + list[i].checked)
      if(list[i].listIndex === listIndex) {
        changeIndex = i;
      }
    }
    console.log(changeIndex)

    let checked;
    list[changeIndex].checked ? checked = false : checked = true;

    console.log(checked)
    const arr = { boardIndex: list[changeIndex].boardIndex, listIndex: listIndex, title: title, checked: checked };
    list.splice(changeIndex, 1, arr);

    for(let i=0; i<list.length; i++) {
      console.log(i + " -- " + list[i].title + ': ' + list[i].boardIndex + " - " + list[i].listIndex + " - " + list[i].checked)
    }

    this.setState({
      checked:checked,
    })

    this.props.listStore!.setListAfterDrag(list);

    console.log(board);
    localStorage.setItem("board", JSON.stringify(board));
  }

  render () {
    const { checked } = this.state;

    return (
      <>
        <div className="box">
          <div className={checked ? "item checked" : "item unchecked"}>
            {this.props.title}
            <span className="checkIcon" onClick={this.checkItem}>
              <Icon disabled name='check' />
            </span>
          </div>
        </div>
        {/*{this.props.title}*/}
      </>
    )
  }
}

export default ListItem;
