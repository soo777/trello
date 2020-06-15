import React from 'react';

function Board (props:any) {
  const drop = (e:any) => {
    e.preventDefault();

    // console.log(e.target);
    //
    // const className = e.target.className;
    // console.log(className);
    //
    // const card_id = e.dataTransfer.getData('card_id');
    //
    // const card = document.getElementById(card_id);
    // console.log(card)
    // card!.style.display = 'block';
    //
    // console.log(e.target.parentElement)
    //
    // if(className === 'box'){
    //   e.target.parentElement.parentElement.appendChild(card);
    // } else {
    //   e.target.parentElement.parentElement.parentElement.appendChild(card);
    // }

    /* UI정 event 수정 */

    // 삽입하려는 card
    console.log(e.target);

    let cardId = '';
    let boardIndex = '';
    const className = e.target.className;

    // 삽입하려는 card html 가져오
    const card_id = e.dataTransfer.getData('card_id');
    const card = document.getElementById(card_id);
    card!.style.display = 'block';

    let node;

    // drag drop 위치에 따른 div 설정
    if(className === 'box'){
      cardId = e.target.parentElement.id;
      boardIndex = e.target.parentElement.parentElement.parentElement.parentElement.id;
      node= e.target.parentElement.parentElement;
    } else {
      cardId = e.target.parentElement.parentElement.id;
      boardIndex = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.id;
      node= e.target.parentElement.parentElement.parentElement;
    }

    // insert 하기 위해 해당 노드 위치 탐색후 insert
    node.childNodes.forEach((data:any)=>{
      if(data.id === cardId) {
        data.parentElement.insertBefore(card, data);
      }
    })

    /* localStorage 수정 */

    // insertArr 수정
    const board = JSON.parse(localStorage.getItem('board')!);

    // 수정할 board 찾기
    // 추후 삭제도 여기서 index 찾으면
    let insertArr:any = [];
    board.forEach((data:any)=> {
      if(data.boardIndex === Number.parseInt(boardIndex)) {
        insertArr = data;
      }
    })

    // 수정할 card index 찾기
    let insertIndex = '';
    insertArr.cards.map((data:any, index:any)=> {
      if(data.listIndex === cardId){
        insertIndex = index;
      }
    });

    // cards 에 수정할 card 삽입
    const insertCard = {
      boardIndex: Number.parseInt(boardIndex),
      listIndex: card!.getAttribute('id'),
      title: card!.getAttribute('title'),
      checked: card!.getAttribute('aria-required') === 'true'
    }
    insertArr.cards.splice(insertIndex, 0, insertCard);
    console.log(insertArr)

    // localStorage save
    localStorage.setItem("board", JSON.stringify(board));
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
