import React from "react";
import { Icon } from "semantic-ui-react";
import ListStore from "~/app/service/ListStore";
import { inject, observer } from "mobx-react";
import autobind from "~/app/service/autobindDecorator";

interface Props {
  listStore?: ListStore;
  cardIndex: string,
  title: string,
  checked: boolean,
}

interface State {
  checked: boolean,
}

@inject("listStore")
@observer
@autobind
class Card extends React.Component<Props, State> {
  constructor (props: any) {
    super(props);
    this.state = {
      checked: this.props.checked,
    };
  }

  checkItem = () => {
    const { cardIndex, title } = this.props;

    const listStorage = JSON.parse(localStorage.getItem("list")!);

    let list: any = [];

    const boardIndex = this.props.listStore!.currentBoardIndex;
    listStorage.forEach((data: any) => {
      if (data.boardIndex === boardIndex) {
        list = list.concat(data.cards);
      }
    });

    let newListIndex: any;
    list.forEach((data: any) => {
      if (data.cardIndex === cardIndex) {
        newListIndex = data.listIndex;
      }
    });

    list = [];
    listStorage.forEach((data: any) => {
      if (data.listIndex === Number.parseInt(newListIndex)) {
        list = data.cards;
      }
    });

    let changeIndex = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i].cardIndex === cardIndex) {
        changeIndex = i;
      }
    }

    let checked;
    list[changeIndex].checked ? checked = false : checked = true;

    const arr = { listIndex: list[changeIndex].listIndex, cardIndex: cardIndex, title: title, checked: checked };
    list.splice(changeIndex, 1, arr);

    this.setState({
      checked: checked,
    });

    this.props.listStore!.setCardAfterDrag(list);

    localStorage.setItem("list", JSON.stringify(listStorage));
  };

  render () {
    const { checked } = this.state;

    return (
      <>
        <div className="box">
          <div className={checked ? "item checked" : "item unchecked"}>
            {this.props.title}
            <span className="checkIcon" onClick={this.checkItem}>
              <Icon disabled name='check'/>
            </span>
          </div>
        </div>
      </>
    );
  }
}

export default Card;
