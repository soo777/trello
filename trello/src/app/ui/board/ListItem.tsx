import React from 'react';
import { Icon } from "semantic-ui-react";


interface Props {
  boardIndex:string,
  listIndex:string,
  title:string,
  checked:boolean,
}

interface State {
  checked:boolean,
}

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
    board.forEach((data:any) => {
      if(data.boardIndex === Number.parseInt(boardIndex)){
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

    const arr = { boardIndex: boardIndex, listIndex: listIndex, title: title, checked: checked };
    list.splice(changeIndex, 1, arr);
    localStorage.setItem("board", JSON.stringify(board));

    this.setState({
      checked:checked,
    })
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
