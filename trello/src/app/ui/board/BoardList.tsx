import React from "react";
import { Input } from "semantic-ui-react";
import ListItem from "~/app/ui/board/ListItem";
import ListStore from "~/app/service/ListStore";
import { inject, observer } from "mobx-react";
import autobind from "~/app/service/autobindDecorator";
import Card from "~/components/Card";

interface Props {
  listStore?: ListStore;
  title: string;
  boardIndex: number;
}

interface State {
  input: string;
  cards: any;
}

@inject("listStore")
@observer
@autobind
class BoardList extends React.Component<Props, State> {
  constructor (props: any) {
    super(props);
    this.state = {
      input: "",
      cards: [],
    };
  }

  componentDidMount () {
    // localStorage board에서 listItem 가져오기
    const board = JSON.parse(localStorage.getItem('board')!);
    const boardIndex = this.props.boardIndex;

    if(board !== null) {
      let list:any = [];
      board.forEach((data:any)=> {
        if(data.boardIndex === boardIndex) {
          list = data.cards;
        }
      })

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
    this.setState({cards:this.props.listStore!.card});
  }

  enterInput = (e:any) => {
    this.setState({input:e.currentTarget.value});
  }

  addList = (e: any) => {
    if (e.key === "Enter" && e.currentTarget.value !== "") {
      const item = e.currentTarget.value;
      const newCard = this.props.listStore!.addList(item, this.props.boardIndex);

      this.setState({
        input: "",
        cards: this.state.cards.concat(newCard),
      });
    }
  };

  render () {
    const { boardIndex, title, } = this.props;
    const { input, cards } = this.state;

    return (
      <>
        <div>
          <div className="list">
            <div className="title">
              {title}
            </div>
            <Input className="input" onKeyPress={this.addList} value={input} onChange={this.enterInput}/>
            {
              cards.map((data: any, index: any) => (
                data.boardIndex === boardIndex
                  ?
                  <Card id={data.listIndex} className={"card"} draggable="true" key={index} checked={data.checked} title={data.title}>
                  <ListItem
                    boardIndex={data.boardIndex}
                    listIndex={data.listIndex}
                    title={data.title}
                    checked={data.checked}
                    key={index}
                  />
                  </Card>
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
