import { observable } from "mobx";

class BoardStore {

  @observable
  boardDisplay:string = 'display'

  @observable
  createBoardDisplay:string = 'none';


}

export default  BoardStore;
