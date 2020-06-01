import { action, observable } from "mobx";

class ListStore {

  @observable
  boardList: { index: number, title: string }[] = [];

  @observable
  boardIndex: number = 0;

  @observable
  list: { boardIndex: number, index: number, title: string }[] = [];

  @observable
  listIndex: number = 0;

  @action
  addBoard (title: string, projectIndex: number) {
    let index = parseInt(localStorage.getItem("boardIndex")!);
    if (index >= 0) {
      index += 1;
      localStorage.setItem("boardIndex", index.toString());
      this.boardIndex = index;
    } else {
      localStorage.setItem('boardIndex', '0');
      index = 0;
      this.boardIndex = index;
    }

    const arr = { index: this.boardIndex++, title: title };
    this.boardList = this.boardList.concat(arr);

    let boardList = this.boardList;
    localStorage.setItem("project"+projectIndex, JSON.stringify(boardList));
  }

  @action
  addList (title: string, boardIndex: number) {
    console.log(boardIndex);
    const arr = { boardIndex: boardIndex, index: this.listIndex++, title: title };
    this.list = this.list.concat(arr);
  }

  @action
  setBoardListNull () {
    this.boardList = [];
  }

  @action
  setBoardList(boardList:any) {
    this.boardList = boardList;
  }

}

export default ListStore;
