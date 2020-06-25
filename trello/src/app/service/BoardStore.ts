import { action, observable } from "mobx";

class BoardStore {

  @observable
  boardList: { boardIndex: number, title: string }[] = [];

  @observable
  boardIndex: number = 0;

  @action
  createBoard (boardTitle: string) {
    let index = parseInt(localStorage.getItem("boardIndex")!);
    if (index >= 0) {
      index += 1;
      localStorage.setItem("boardIndex", index.toString());
      this.boardIndex = index;
    } else {
      index = 0;
      localStorage.setItem("boardIndex", "0");
      this.boardIndex = index;
    }

    const board = [{ "boardIndex": this.boardIndex, "title": boardTitle }];
    this.boardList = this.boardList.concat(board);

    let boardList = this.boardList;
    localStorage.setItem("board", JSON.stringify(boardList));
  }

  @action
  setBoardListNull () {
    this.boardList = [];
  }

  @action
  setBoardList (boardList: any) {
    this.boardList = boardList;
  }
}

export default BoardStore;
