import React from "react";
import { Button, Icon, Input } from "semantic-ui-react";
import autobind from "~/app/service/autobindDecorator";
import { inject, observer } from "mobx-react";
import ListStore from "~/app/service/ListStore";
import ListItem from "~/app/ui/board/ListItem";
import BoardList from "~/app/ui/board/BoardList";
import ProjectItem from "~/app/ui/project/ProjectItem";
import Board from "~/components/Board";

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
class BoardContainer extends React.Component<Props, State> {
  constructor (props: any) {
    super(props);
    this.state = {
      addOn: true,
      list: [],
    };
  }

  componentDidMount () {
    let { match } = this.props;

    const projectIndex = match.params.projectIndex;
    const boardList = JSON.parse(localStorage.getItem('board')!);

    this.props.listStore!.setProjectIndex(projectIndex);

    if(boardList !== null) {
      const arr: any = [];
      boardList.forEach(function(element:any){
        if(element.projectIndex === projectIndex){
          arr.push(element);
        }
      })
      this.setState({list:arr})
      this.props.listStore!.setBoardList(arr);
    }
  }

  addBoard = (e: any) => {
    if (e.key === "Enter" && e.currentTarget.value !== '') {
      const boardTitle = e.currentTarget.value;
      const projectIndex = this.props.match.params.projectIndex
      this.props.listStore!.addBoard(boardTitle, projectIndex);
      this.setState({ addOn: true });
    }
    this.setState({list:this.props.listStore!.boardList})
  };

  addOn = () => {
    this.setState({ addOn: false });
  };

  addOff = () => {
    this.setState({ addOn: true });
  };

  render () {
    const { addOn } = this.state;

    let { boardList, } = this.props.listStore!;

    if (!boardList) {
      boardList = [];
      this.props.listStore!.setBoardListNull();
    }

    return (
      <>
        <div className="flex_overflow">

          <Board id="-1" className="">
            <div className="board">
              {
                addOn
                  ? <div className="basic" onClick={this.addOn}>
                    <Icon name="plus" className="plus"/>
                  </div>
                  : <div className="addWrapper">
                    <Input className="input" onKeyPress={this.addBoard} placeholder="List title.."/>
                    <span className="close" onClick={this.addOff}>
                      <Icon name="plus" className="close"/>
                    </span>
                  </div>
              }
            </div>
          </Board>

          {
            this.state.list.map((data: any, index: any) => (
              <Board id={data.boardIndex} className="board" key={index}>
              <BoardList
                title={data.title}
                boardIndex={data.boardIndex}
                key={index}
              />
              </Board>
            ))
          }

          {
            // 공백 board 영역
            <Board id="-1" className="width100"/>
          }

        </div>
      </>
    );
  }

}

export default BoardContainer;
