import React from 'react';

function Board (props:any) {
  const drop = (e:any) => {
    e.preventDefault();

    console.log(e.target);

    const className = e.target.className;
    console.log(className);

    const card_id = e.dataTransfer.getData('card_id');

    const card = document.getElementById(card_id);
    console.log(card)
    card!.style.display = 'block';

    console.log(e.target.parentElement)

    if(className === 'box'){
      e.target.parentElement.parentElement.appendChild(card);
    } else {
      e.target.parentElement.parentElement.parentElement.appendChild(card);
    }

  }

  const dragOver = (e:any) => {
    e.preventDefault();

  }

  return (
    <div
      id={props.id}
      className={props.className}
      onDrop={drop}
      onDragOver={dragOver}
    >
      {props.children}
    </div>
  )
}

export default Board;
