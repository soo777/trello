import { action, observable } from "mobx";

class ListStore {

  @observable
  boardList: { projectIndex: number, boardIndex: number, title: string }[] = [];

  @observable
  boardIndex: number = 0;

  @observable
  list: { boardIndex: number, listIndex: number, title: string }[] = [];

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

    const arr = { boardIndex: boardIndex, listIndex: this.listIndex++, title: title };
    this.list = this.list.concat(arr);

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
  setListNull () {
    this.boardList = [];
  }

  @action
  setList(list:any) {
    this.list = list;
  }

  @action
  addCard(arr:any, boardIndex:number){
    this.card = this.card.concat(arr);

    console.log(this.card[0].title)
    // this.card = this.card.filter(this.card.boardIndex !== boardIndex);
    console.log(this.card)
  }

  @action
  setCardNull(){
    this.card = [];
    console.log('card null')
  }

}

export default ListStore;
