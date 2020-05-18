import { action, observable } from "mobx";

class BoardStore {

  @observable
  boardDisplay:string = 'display'

  @observable
  createBoardDisplay:string = 'none';

  @observable
  boardList:string[] = ['aaa'];

  @action
  createBoard(boardTitle:string) {
    this.boardList = this.boardList.concat(boardTitle);
    console.log(this.boardList);
  }
}

export default  BoardStore;
