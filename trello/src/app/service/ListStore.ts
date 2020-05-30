import { action, observable } from "mobx";

class ListStore {

  @observable
  // boardList: { index: number, title: string }[] = [];
  boardList: { index: number, title: string }[] = [
    { index: 0, title: "aaa" },
    { index: 1, title: "bbb" }
    ];

  @observable
  boardListIndex: number = 0;

  @observable
  list: {boardIndex:number, index: number, title: string }[] = [];

  @observable
  listIndex: number = 0;

  @action
  addBoard (title:string){
    const arr = { index: this.boardListIndex++, title: title};
    this.boardList = this.boardList.concat(arr);
  }

  @action
  addList (title: string, boardIndex: number) {
    console.log(boardIndex);
    const arr = { boardIndex:boardIndex, index: this.listIndex++, title: title };
    this.list = this.list.concat(arr);
  }

  @action
  setBoardListNull() {
    this.boardList = [];
  }

}

export default ListStore;
