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

  componentDidMount () {
    const list = JSON.parse(localStorage.getItem('list')!);
    const boardIndex = this.props.boardIndex;

    if(list !== null) {
      const arr: any = [];
      list.forEach(function(element:any){
        if(element.boardIndex === boardIndex){
          arr.push(element);
        }
      })
      this.props.listStore!.setList(arr);
    }
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
    let { list } = this.props.listStore!;
    const { boardIndex, title } = this.props;
    const { input } = this.state;

    if (!list) {
      list = [];
      this.props.listStore!.setListNull();
    }

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
                  ? <ListItem title={data.title} key={index}/>
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
