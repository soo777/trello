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

  checkItem = () => {
    const {boardIndex, listIndex, title, } = this.props;

    const board = JSON.parse(localStorage.getItem('board')!);

    let list:any = [];

    const projectIndex = this.props.listStore!.projectIndex;
    board.forEach((data:any) => {
      if(data.projectIndex === projectIndex){
        list = list.concat(data.cards);
      }
    });

    let newBoardIndex:any;
    list.forEach((data:any) => {
      if(data.listIndex === listIndex){
        newBoardIndex = data.boardIndex;
      }
    });

    list = [];
    board.forEach((data:any) => {
      if(data.boardIndex === Number.parseInt(newBoardIndex)){
        list = data.cards;
      }
    });

    let changeIndex = 0;
    for(let i=0; i<list.length; i++) {
      if(list[i].listIndex === listIndex) {
        changeIndex = i;
      }
    }

    let checked;
    list[changeIndex].checked ? checked = false : checked = true;

    const arr = { boardIndex: list[changeIndex].boardIndex, listIndex: listIndex, title: title, checked: checked };
    list.splice(changeIndex, 1, arr);

    this.setState({
      checked:checked,
    })

    this.props.listStore!.setListAfterDrag(list);

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
      </>
    )
  }
}

export default ListItem;
