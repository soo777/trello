import React from "react";
import { Input } from "semantic-ui-react";
import ListItem from "~/app/ui/board/ListItem";
import ListStore from "~/app/service/ListStore";
import { inject, observer } from "mobx-react";
import autobind from "~/app/service/autobindDecorator";

interface Props {
  listStore?: ListStore;
  title: string;
  boardIndex: number;
}

interface State {
  input: string;
}

let placeholder = document.createElement("div");
placeholder.className = "placeholder";

@inject("listStore")
@observer
@autobind
class BoardList extends React.Component<Props, State> {
  private dragged: any;
  private over: any;
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

  dragStart = (e:any) => {
    this.dragged = e.currentTarget;
    console.log(this.dragged);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html',this.dragged);
  }

  dragEnd = (e:any) => {
    console.log(e.target.parentNode);
    this.dragged.style.display = 'block';
    console.log(this.dragged);
    console.log(this.dragged.parentElement);
    // console.log(placeholder);

    // this.dragged.parentNode.removeChild(placeholder);
    this.dragged.parentElement.removeChild(placeholder);

    // const data = this.state.colors;
    // const from = Number(this.dragged.dataset.id);
    // let to = Number(this.over.dataset.id);
    // if(from < to) to--;
    // data.splice(to, 0, data.splice(from, 1)[0]);
    // this.setState({colors:data})
  }


  dragOver = (e:any) => {
    e.preventDefault();
    this.dragged.style.display = 'none';
    if(e.target.className === 'placeholder') return;
    this.over = e.target;
    console.log(e.target.parentElement.parentElement.parentElement);
    // e.target.parentNode.insertBefore(placeholder, e.target);
    e.target.parentElement.parentElement.parentElement.insertBefore(placeholder, e.target.parentElement.parentElement);
  }

  render () {
    let { card } = this.props.listStore!;
    const { boardIndex, title, } = this.props;
    const { input } = this.state;

    return (
      <>
        <div className="board">
          <div className="list">
            <div className="title">
              {title}
            </div>
            <Input className="input" onKeyPress={this.addList} value={input} onChange={this.enterInput}/>
            <div onDragOver={this.dragOver.bind(this)}>
            {
              card.map((data: any, index: any) => (
                data.boardIndex === boardIndex
                  ?
                  <div
                    data-id={data.listIndex}
                    key={data.listIndex}
                    draggable='true'
                    onDragEnd={this.dragEnd.bind(this)}
                    onDragStart={this.dragStart.bind(this)}>
                  <ListItem
                    boardIndex={data.boardIndex}
                    listIndex={data.listIndex}
                    title={data.title}
                    checked={data.checked}
                    key={index}
                  />
                  </div>
                  : ""
              ))
            }
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default BoardList;
