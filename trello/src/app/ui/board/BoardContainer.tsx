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
    console.log(match.params.name);
    console.log(match.params.index);

    // store로 collection 만들어서 관리
    // const name = localStorage.getItem('name');
    // console.log(name);
  }

  addList = (e: any) => {
    if (e.key === "Enter") {
      const item = e.currentTarget.value;
      this.props.listStore!.addList(item)
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

    if(!boardList){
      boardList = [];
      this.props.listStore!.setBoardListNull();
    }

    return (
      <>
        <div className="flex_overflow">

          <div className="board">
            {
              addOn
                ? <div className="basic">
                  <span onClick={this.addOn}>
                    <Icon name="plus" className="plus"/>
                  </span>
                </div>
                : <div className="addWrapper">
                  <Input className="input" onKeyPress={this.addList}/>
                  <span className="close" onClick={this.addOff}>
                    <Icon name="plus" className="close"/>
                  </span>
                </div>
            }
          </div>

          <div className="board">
            <div className="wrapper">
              <Input className="input" onKeyPress={this.addList}/>
              {/*<span className="close">*/}
              {/*  <Icon name="plus" className="close"/>*/}
              {/*</span>*/}
            </div>
          </div>

          {
            boardList.map((data:any, index:any) => (
              <BoardList title={data.title}/>
            ))
          }

        </div>
      </>
    );
  }

}

export default BoardContainer;
