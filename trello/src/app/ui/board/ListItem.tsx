import React from 'react';
import { Icon } from "semantic-ui-react";


interface Props {
  boardIndex:string,
  listIndex:string,
  title:string,
  checked:boolean,
}

interface State {
  checked:boolean,
}

class ListItem extends React.Component<Props, State>{
  constructor (props:any) {
    super(props);
    this.state = {
      checked: this.props.checked,
    };
  }

  checkItem = () => {
    const {boardIndex, listIndex, title, } = this.props;

    const list = JSON.parse(localStorage.getItem('list')!);

    let changeIndex = 0;
    for(let i=0; i<list.length; i++) {
      if(list[i].listIndex === listIndex) {
        changeIndex = i;
      }
    }

    let checked;
    list[changeIndex].checked ? checked = false : checked = true;

    const arr = { boardIndex: boardIndex, listIndex: listIndex, title: title, checked: checked };
    list.splice(changeIndex, 1, arr);
    localStorage.setItem("list", JSON.stringify(list));

    this.setState({
      checked:checked,
    })
  }

  render () {
    const { checked } = this.state;

    return (
      <>
        <div className="box">
          <div className={checked ? "item checked" : "item unchecked"}>
            {this.props.title}
            <span className="checkIcon" onClick={this.checkItem}>
              <Icon disabled name='check' />
            </span>
          </div>
        </div>
        {/*{this.props.title}*/}
      </>
    )
  }
}

export default ListItem;
