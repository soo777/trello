import { action, observable } from "mobx";

class BoardStore {

  @observable
  boardDisplay:string = 'display'

  @observable
  createBoardDisplay:string = 'none';

  @observable
  // boardList:string[] = ['aaa', 'bbb'];
  boardList:string[] = [];

  @observable
  projectIndex:number = 0;

  @action
  createBoard(boardTitle:string) {
    this.boardList = this.boardList.concat(boardTitle);

    let list = this.boardList;
    console.log(list);

    // localStorage

    let list1 = [{'name' : 'a'},{'name':'b'}];
    // localStorage.setItem('project'+this.projectIndex++, boardTitle);

    // @ts-ignore
    // localStorage.setItem('project', JSON.stringify(list1));
    localStorage.setItem('board', JSON.stringify(list));
  }
}

export default  BoardStore;
