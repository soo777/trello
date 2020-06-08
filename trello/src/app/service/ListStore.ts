import { action, observable } from "mobx";

class ListStore {

  @observable
  boardList: { projectIndex: number, boardIndex: number, title: string }[] = [];

  @observable
  boardIndex: number = 0;

  @observable
  list: { boardIndex: number, listIndex: number, title: string, checked: boolean }[] = [];

  @observable
  listIndex: number = 0;

  @observable
  card: any = [];

  @action
  addBoard (title: string, projectIndex: number) {
    let index = parseInt(localStorage.getItem("boardIndex")!);
    if (index >= 0) {
      index += 1;
      localStorage.setItem("boardIndex", index.toString());
      this.boardIndex = index;
    } else {
      index = 0;
      localStorage.setItem('boardIndex', index.toString());
      this.boardIndex = index;
    }

    const arr = { projectIndex: projectIndex, boardIndex: this.boardIndex, title: title };
    this.boardList = this.boardList.concat(arr);

    let boardListStorage = JSON.parse(localStorage.getItem('board')!);
    if(boardListStorage === null) {
      boardListStorage = [];
    }
    boardListStorage = boardListStorage.concat(arr);

    // const boardList = this.boardList;
    // localStorage.setItem("board", JSON.stringify(boardList));
    localStorage.setItem("board", JSON.stringify(boardListStorage));
  }

  @action
  addList (title: string, boardIndex: number) {
    let listIndex = parseInt(localStorage.getItem("listIndex")!);
    if (listIndex >= 0) {
      listIndex += 1;
      localStorage.setItem("listIndex", listIndex.toString());
      this.listIndex = listIndex;
    } else {
      listIndex = 0;
      localStorage.setItem('listIndex', listIndex.toString());
      this.listIndex = listIndex;
    }

    const arr = { boardIndex: boardIndex, listIndex: this.listIndex++, title: title, checked: false };
    this.list = this.list.concat(arr);
    this.card = this.card.concat(arr);

    let listStorage = JSON.parse(localStorage.getItem('list')!);
    if(listStorage === null) {
      listStorage = [];
    }
    listStorage = listStorage.concat(arr);

    localStorage.setItem("list", JSON.stringify(listStorage));
  }

  @action
  setBoardListNull () {
    this.boardList = [];
  }

  @action
  setBoardList(boardList:any) {
    this.boardList = boardList;
  }

  @action
  setList(arr:any){
    this.card = this.card.concat(arr);
  }

  @action
  setListNull(){
    this.card = [];
  }

}

export default ListStore;
