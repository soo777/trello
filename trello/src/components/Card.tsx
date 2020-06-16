import React from 'react';

function Card(props:any) {

  const dragStart = (e:any) => {
    const target = e.target;
    // console.log(target)

    const deleteBoardIndex = target.parentElement.parentElement.parentElement.id;

    e.dataTransfer.setData('deleteBoardIndex', deleteBoardIndex);
    e.dataTransfer.setData('deleteCardIndex', target.id);
    e.dataTransfer.setData('card_id', target.id);

    setTimeout(() => {
      target.style.display = 'none';
    }, 0)
  }

  const dragOver = (e:any) => {
    // e.stopPropagation();
  }

  return (
    <div
      id={props.id}
      className={props.className}
      draggable={props.draggable}
      onDragStart={dragStart}
      onDragOver={dragOver}
      title={props.title}
      aria-required={props.checked}
    >
      {props.children}
    </div>
  )
}

export default Card;
