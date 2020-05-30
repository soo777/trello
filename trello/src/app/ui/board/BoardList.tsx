import React from 'react';
import { Input } from "semantic-ui-react";
import ListItem from "~/app/ui/board/ListItem";
import ListStore from "~/app/service/ListStore";
import { inject, observer } from "mobx-react";
import autobind from "~/app/service/autobindDecorator";

interface Props {
  listStore?: ListStore;
  title:string;
  boardIndex:number;
}

@inject("listStore")
@observer
@autobind
class BoardList extends React.Component<Props, any>{

  addList = (e: any) => {
    if (e.key === "Enter") {
      const item = e.currentTarget.value;
      this.props.listStore!.addList(item, this.props.boardIndex)
    }
  };

  render(){
    const { list } = this.props.listStore!;
    const { boardIndex, title } = this.props;

    return(
      <>
        <div className="board">
          <div className="list">
            <div className="title">
              {title}
            </div>
            <Input className="input" onKeyPress={this.addList}/>
            {
              list.map((data: any, index: any) => (
                <ListItem title={data.title}/>
              ))
            }
          </div>
        </div>
      </>
    )
  }
}

export default BoardList;
