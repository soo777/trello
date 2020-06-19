import React from 'react';
import ListStore from "~/app/service/ListStore";
import { inject, observer } from "mobx-react";

interface Props {
  listStore?: ListStore;
  id:string,
  className:string,
}

@inject("listStore")
@observer
class Board extends React.Component<Props, any> {
  drop = (e:any) => {
    e.preventDefault();

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
    let deleteBoardIndex = e.dataTransfer.getData('deleteBoardIndex');
    let insertBoardIndex = '';
    const className = e.target.className;

    // 삽입하려는 card html 가져오
    const card_id = e.dataTransfer.getData('card_id');
    const card = document.getElementById(card_id);
    card!.style.display = 'block';

    console.log(className)

    // board 밖의 영역에 drop시 return 처리
    if(className.indexOf('box') === -1 && className.indexOf('item') === -1 && className.indexOf('input') === -1){
      return;
    }

    let node;

    // drag drop 위치에 따른 div 설정
    if(className === 'box'){
      cardId = e.target.parentElement.id;
      insertBoardIndex = e.target.parentElement.parentElement.parentElement.parentElement.id;
      node= e.target.parentElement.parentElement;
    } else if(className.indexOf('input') !== -1 ){          // 비어있는 list
      insertBoardIndex = e.target.parentElement.parentElement.parentElement.id;
      node= e.target.parentElement.parentElement.parentElement;
    } else {
      cardId = e.target.parentElement.parentElement.id;
      insertBoardIndex = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.id;
      node= e.target.parentElement.parentElement.parentElement;
    }
    console.log(className.indexOf('input'))
    console.log(className.indexOf('item'))
    console.log(node)
    // insert 하기 위해 해당 노드 위치 탐색후 insert
    // 비어있는 list
    if(className.indexOf('input') !== -1){
      node.childNodes[0].children[0].append(card)
    } else {
      node.childNodes.forEach((data:any)=>{
        if(data.id === cardId) {
          data.parentElement.insertBefore(card, data);
        }
      })
    }

    /* localStorage 수정 */

    // insertArr 수정
    const board = JSON.parse(localStorage.getItem('board')!);

    // 수정할 board 찾기
    // 추후 삭제도 여기서 index 찾으면
    let insertArr:any = [];
    let deleteArr:any = [];
    board.forEach((data:any)=> {
      if(data.boardIndex === Number.parseInt(insertBoardIndex)) {
        insertArr = data;
      }
      if(data.boardIndex === Number.parseInt(deleteBoardIndex)) {
        deleteArr = data;
      }
    });
    console.log(insertArr);

    // deleteBoard 에서 card 삭제
    let deleteIndex = e.dataTransfer.getData('deleteCardIndex');
    deleteArr.cards.map((data:any, index:any)=> {
      if(data.listIndex === deleteIndex){
        deleteArr.cards.splice(index, 1)
      }
    });

    // insertBoard 에 삽입할 card index 찾기
    let insertIndex = '';
    insertArr.cards.map((data:any, index:any)=> {
      if(data.listIndex === cardId){
        insertIndex = index;
      }
    });

    // insertBoard 에 수정할 card 삽입
    const insertCard = {
      boardIndex: Number.parseInt(insertBoardIndex),
      listIndex: card!.getAttribute('id'),
      title: card!.getAttribute('title'),
      checked: card!.getAttribute('aria-required') === 'true'
    }

    if(insertIndex !== ''){           // 비어있지 않은 list
      insertArr.cards.splice(insertIndex, 0, insertCard);
    } else {                          // 비어있는 list
      insertArr.cards.push(insertCard);
    }

    // localStorage save
    localStorage.setItem("board", JSON.stringify(board));

    // console.log(deleteArr.cards)
    // console.log(insertArr.cards)

    let cards:any = [];
    cards = cards.concat(deleteArr.cards).concat(insertArr.cards)
    this.props.listStore!.setListAfterDrag(cards);
  }

  dragOver = (e:any) => {
    e.preventDefault();
  }

  render () {
    return (
      <>
        <div
          id={this.props.id}
          className={this.props.className}
          onDrop={this.drop}
          onDragOver={this.dragOver}
        >
          {this.props.children}
        </div>
      </>
    );
  }
}

export default Board;
