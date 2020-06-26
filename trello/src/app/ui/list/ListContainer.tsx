import React from "react";
import { Button, Icon, Input } from "semantic-ui-react";
import autobind from "~/app/service/autobindDecorator";
import { inject, observer } from "mobx-react";
import ListStore from "~/app/service/ListStore";
import List from "~/app/ui/list/List";
import ListComponent from "~/components/ListComponent";

interface Props {
  listStore?: ListStore;
  match: any
}

interface State {
  addOn: boolean;
  list: any;
}

@inject("listStore")
@observer
@autobind
class ListContainer extends React.Component<Props, State> {
  constructor (props: any) {
    super(props);
    this.state = {
      addOn: true,
      list: [],
    };
  }

  componentDidMount () {
    let { match } = this.props;

    const boardIndex = match.params.boardIndex;
    const listStorage = JSON.parse(localStorage.getItem("list")!);

    this.props.listStore!.setCurrentBoardIndex(boardIndex);

    if (listStorage !== null) {
      const arr: any = [];
      listStorage.forEach(function (element: any) {
        if (element.boardIndex === boardIndex) {
          arr.push(element);
        }
      });
      this.setState({ list: arr });
      this.props.listStore!.setList(arr);
    }
  }

  addList = (e: any) => {
    if (e.key === "Enter" && e.currentTarget.value !== "") {
      const listTitle = e.currentTarget.value;
      const boardIndex = this.props.match.params.boardIndex;
      this.props.listStore!.addList(listTitle, boardIndex);
      this.setState({ addOn: true });
    }
    this.setState({ list: this.props.listStore!.list });
  };

  addOn = () => {
    this.setState({ addOn: false });
  };

  addOff = () => {
    this.setState({ addOn: true });
  };

  render () {
    const { addOn } = this.state;

    let { list } = this.props.listStore!;

    if (!list) {
      list = [];
      this.props.listStore!.setListNull();
    }

    return (
      <>
        <div className="flex_overflow">

          <ListComponent id="-1" className="">
            <div className="listContainer">
              {
                addOn
                  ? <div className="basic" onClick={this.addOn}>
                    <Icon name="plus" className="plus"/>
                  </div>
                  : <div className="addWrapper">
                    <Input className="input" onKeyPress={this.addList} placeholder="List title.."/>
                    <span className="close" onClick={this.addOff}>
                      <Icon name="plus" className="close"/>
                    </span>
                  </div>
              }
            </div>
          </ListComponent>

          {
            this.state.list.map((data: any, index: any) => (
              <ListComponent id={data.listIndex} className="listContainer" key={index}>
                <List
                  title={data.title}
                  listIndex={data.listIndex}
                  key={index}
                />
              </ListComponent>
            ))
          }

          {
            // 공백 board 영역
            <ListComponent id="-1" className="width100"/>
          }

        </div>
      </>
    );
  }

}

export default ListContainer;
