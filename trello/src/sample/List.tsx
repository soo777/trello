import React from 'react';
import ListItem from "~/app/ui/board/ListItem";

interface State {
  colors: any;
}

let placeholder = document.createElement("li");
placeholder.className = "placeholder";

class List extends React.Component<any, State> {
  private dragged: any;
  private over: any;
  constructor (props:any) {
    super(props);
    this.state = {
      colors : ['Red', 'Green', 'Blue', 'Yellow', 'Black', 'White', 'Orange']
    }
  }

  dragStart = (e:any) => {
    this.dragged = e.currentTarget;
    console.log(this.dragged);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html',this.dragged);
  }

  dragEnd = (e:any) => {
    this.dragged.style.display = 'block';
    console.log(this.dragged.parentNode);
    console.log(this.dragged);
    this.dragged.parentNode.removeChild(placeholder);

    const data = this.state.colors;
    const from = Number(this.dragged.dataset.id);
    let to = Number(this.over.dataset.id);
    if(from < to) to--;
    data.splice(to, 0, data.splice(from, 1)[0]);
    this.setState({colors:data})
  }

  dragOver = (e:any) => {
    e.preventDefault();
    this.dragged.style.display = 'none';
    if(e.target.className === 'placeholder') return;
    this.over = e.target;
    e.target.parentNode.insertBefore(placeholder, e.target);
  }

  render(){
    const listItem = this.state.colors.map((item:any, i:any) => {
      return (
        <li
          data-id={i}
          key={i}
          draggable='true'
          onDragEnd={this.dragEnd.bind(this)}
          onDragStart={this.dragStart.bind(this)}>
          {item}
        </li>

        // <li
        //   data-id={i}
        //   key={i}
        //   draggable='true'
        //   onDragEnd={this.dragEnd.bind(this)}
        //   onDragStart={this.dragStart.bind(this)}>
        //   {
        //     <ListItem
        //       boardIndex={i}
        //       listIndex={i}
        //       title={i}
        //       checked={i}
        //       key={i}
        //     />
        //   }
        // </li>
      )
    });

    return(
      <ul onDragOver={this.dragOver.bind(this)}>
        {listItem}
      </ul>
    )
  }
}

export default List;
