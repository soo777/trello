import React from "react";
import { Input } from "semantic-ui-react";
import Card from "~/app/ui/list/Card";
import ListStore from "~/app/service/ListStore";
import { inject, observer } from "mobx-react";
import autobind from "~/app/service/autobindDecorator";
import CardComponent from "~/components/CardComponent";

interface Props {
  listStore?: ListStore;
  title: string;
  listIndex: number;
}

interface State {
  input: string;
  cards: any;
}

@inject("listStore")
@observer
@autobind
class List extends React.Component<Props, State> {
  constructor (props: any) {
    super(props);
    this.state = {
      input: "",
      cards: [],
    };
  }

  componentDidMount () {
    // localStorage board에서 listItem 가져오기
    const listStorage = JSON.parse(localStorage.getItem("list")!);
    const listIndex = this.props.listIndex;

    if (listStorage !== null) {
      let cards: any = [];
      listStorage.forEach((data: any) => {
        if (data.listIndex === listIndex) {
          cards = data.cards;
        }
      });
      if (cards !== null) {
        const arr: any = [];
        cards.forEach(function (element: any) {
          if (element.listIndex === listIndex) {
            arr.push(element);
          }
        });
        this.props.listStore!.setCard(arr);
      }
    }
    this.setState({ cards: this.props.listStore!.card });
  }

  enterInput = (e: any) => {
    this.setState({ input: e.currentTarget.value });
  };

  addCard = (e: any) => {
    if (e.key === "Enter" && e.currentTarget.value !== "") {
      const item = e.currentTarget.value;
      const newCard = this.props.listStore!.addCard(item, this.props.listIndex);

      this.setState({
        input: "",
        cards: this.state.cards.concat(newCard),
      });
    }
  };

  render () {
    const { listIndex, title } = this.props;
    const { input, cards } = this.state;

    return (
      <>
        <div>
          <div className="list">
            <div className="title">
              {title}
            </div>
            <Input className="input" onKeyPress={this.addCard} value={input} onChange={this.enterInput}/>
            {
              cards.map((data: any, index: any) => (
                data.listIndex === listIndex
                  ?
                  <CardComponent id={data.cardIndex} className={"card"} draggable="true" key={index} checked={data.checked}
                                 title={data.title}>
                    <Card
                      cardIndex={data.cardIndex}
                      title={data.title}
                      checked={data.checked}
                      key={index}
                    />
                  </CardComponent>
                  : ""
              ))
            }
          </div>
        </div>
      </>
    );
  }
}

export default List;
