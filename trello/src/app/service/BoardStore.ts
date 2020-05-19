import { action, observable } from "mobx";

class BoardStore {

  @observable
  boardDisplay:string = 'display'

  @observable
  createBoardDisplay:string = 'none';

  @observable
  boardList:string[] = ['aaa', 'bbb'];

  @action
  createBoard(boardTitle:string) {
    this.boardList = this.boardList.concat(boardTitle);
  }
}

export default  BoardStore;
