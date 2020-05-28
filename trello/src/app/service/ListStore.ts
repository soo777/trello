import { action, observable } from "mobx";

class ListStore {

  @observable
  list: { index: number, title: string }[] = [];

  @observable
  listIndex:number = 0;

  @action
  addList (title: string) {
    const arr = { index: this.listIndex++, title: title};
    this.list = this.list.concat(arr);
  }

}

export default ListStore;
