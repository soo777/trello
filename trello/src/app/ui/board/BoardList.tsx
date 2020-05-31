import React from "react";
import { Input } from "semantic-ui-react";
import ListItem from "~/app/ui/board/ListItem";
import ListStore from "~/app/service/ListStore";
import { inject, observer } from "mobx-react";
import autobind from "~/app/service/autobindDecorator";
import { values } from "mobx";

interface Props {
  listStore?: ListStore;
  title: string;
  boardIndex: number;
}

interface State {
  input: string;
}

@inject("listStore")
@observer
@autobind
class BoardList extends React.Component<Props, State> {

  constructor (props: any) {
    super(props);
    this.state = {
      input: "",
    };
  }

  enterInput = (e:any) => {
    this.setState({input:e.currentTarget.value});
  }

  addList = (e: any) => {
    if (e.key === "Enter" && e.currentTarget.value !== "") {
      const item = e.currentTarget.value;
      this.props.listStore!.addList(item, this.props.boardIndex);

      this.setState({ input: "" });
    }
  };

  render () {
    const { list } = this.props.listStore!;
    const { boardIndex, title } = this.props;
    const { input } = this.state;

    return (
      <>
        <div className="board">
          <div className="list">
            <div className="title">
              {title}
            </div>
            <Input className="input" onKeyPress={this.addList} value={input} onChange={this.enterInput}/>
            {
              list.map((data: any, index: any) => (
                data.boardIndex === boardIndex
                  ? <ListItem title={data.title}/>
                  : ""
              ))
            }
          </div>
        </div>
      </>
    );
  }
}

export default BoardList;
