import { action, observable } from "mobx";

class BoardStore {

  @observable
  boardDisplay: string = "display";

  @observable
  createBoardDisplay: string = "none";

  @observable
    // boardList:string[] = [];
  boardList: { index: number, title: string }[] = [];

  @observable
  boardIndex: number = 0;

  @action
  createBoard (boardTitle: string) {
    let index = parseInt(localStorage.getItem("index")!);
    if (index >= 0) {
      index += 1;
      localStorage.setItem("index", index.toString());
      this.boardIndex = index;
    } else {
      localStorage.setItem('index', '0');
      index = 0;
      this.boardIndex = index;
    }

    const board = [{ "index": this.boardIndex, "title": boardTitle }];
    this.boardList = this.boardList.concat(board);

    let list = this.boardList;
    console.log(list);
    localStorage.setItem("board", JSON.stringify(list));
  }

  @action
  setBoardNull () {
    this.boardList = [];
  }

  @action
  setBoardList (boards: any) {
    this.boardList = boards;
  }
}

export default BoardStore;
