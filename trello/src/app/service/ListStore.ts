import { action, observable } from "mobx";

class ListStore {

  @observable
  list: { index: number, title: string }[] = [];

  

  @action
  addList (title: string) {
    const arr = { index: 1, title: title};
    this.list = this.list.concat(arr);
  }

}

export default ListStore;
