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

  @observable
  projectIndex: string = '';

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

    const arr = { projectIndex: projectIndex, boardIndex: this.boardIndex, title: title, cards: [] };
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

    const arr = { boardIndex: boardIndex, listIndex: 'card_' + this.listIndex++, title: title, checked: false };
    // this.list = this.list.concat(arr);
    this.card = this.card.concat(arr);

    // let listStorage = JSON.parse(localStorage.getItem('list')!);
    // if(listStorage === null) {
    //   listStorage = [];
    // }
    // listStorage = listStorage.concat(arr);
    //
    // localStorage.setItem("list", JSON.stringify(listStorage));

    let boardStorage = JSON.parse(localStorage.getItem('board')!);

    let arr1;
    boardStorage.map((data:any, index:any) => {
      if(data.boardIndex === boardIndex){
        if(data.cards.length > 0){
          arr1 = {projectIndex: data.projectIndex, boardIndex: data.boardIndex, title: data.title, cards: data.cards.concat(arr)};
        } else {
        let cardArr:any = [];
          cardArr.push(arr);
          arr1 = {projectIndex: data.projectIndex, boardIndex: data.boardIndex, title: data.title, cards: cardArr};
        }
        boardStorage.splice(index, 1, arr1);
      }
    });

    localStorage.setItem("board", JSON.stringify(boardStorage));

    return arr;
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

  @action
  setListAfterDrag(arr: any){
    this.card = arr;
  }

  @action
  setProjectIndex(projectIndex: string){
    this.projectIndex = projectIndex;
  }
}

export default ListStore;
