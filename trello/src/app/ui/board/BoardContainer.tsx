import React from "react";
import { Button, Icon, Input } from "semantic-ui-react";
import autobind from "~/app/service/autobindDecorator";
import { inject, observer } from "mobx-react";
import ListStore from "~/app/service/ListStore";
import ListItem from "~/app/ui/board/ListItem";
import BoardList from "~/app/ui/board/BoardList";

interface Props {
  listStore?: ListStore;
  match: any
}

interface State {
  addOn: boolean;
}

@inject("listStore")
@observer
@autobind
class BoardContainer extends React.Component<Props, State> {
  constructor (props: any) {
    super(props);
    this.state = {
      addOn: true,
    };
  }

  componentDidMount () {
    let { match } = this.props;
    console.log(match);
    // console.log(match.params.name);
    // console.log(match.params.projectIndex);

    // store로 collection 만들어서 관리
    // const name = localStorage.getItem('name');
    // console.log(name);
  }

  addBoard = (e: any) => {
    if (e.key === "Enter" && e.currentTarget.value !== '') {
      const item = e.currentTarget.value;
      this.props.listStore!.addBoard(item);
      this.setState({ addOn: true });
    }
  };

  addOn = () => {
    this.setState({ addOn: false });
  };

  addOff = () => {
    this.setState({ addOn: true });
  };

  render () {
    const { addOn } = this.state;

    let { boardList, list } = this.props.listStore!;

    if (!boardList) {
      boardList = [];
      this.props.listStore!.setBoardListNull();
    }

    return (
      <>
        <div className="flex_overflow">

          <div className="board">
            {
              addOn
                ? <div className="basic" onClick={this.addOn}>
                  <Icon name="plus" className="plus"/>
                </div>
                : <div className="addWrapper">
                  <Input className="input" onKeyPress={this.addBoard}/>
                  <span className="close" onClick={this.addOff}>
                    <Icon name="plus" className="close"/>
                  </span>
                </div>
            }
          </div>

          {
            boardList.map((data: any, index: any) => (
              <BoardList
                title={data.title}
                boardIndex={data.index}
              />
            ))
          }

        </div>
      </>
    );
  }

}

export default BoardContainer;
