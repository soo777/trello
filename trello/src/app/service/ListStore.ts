import { action, observable } from "mobx";

class ListStore {

  @observable
  list: { boardIndex: number, listIndex: number, title: string }[] = [];

  @observable
  listIndex: number = 0;

  @observable
  cards: { listIndex: number, cardIndex: number, title: string, checked: boolean }[] = [];

  @observable
  cardIndex: number = 0;

  @observable
  card: any = [];

  @observable
  currentBoardIndex: string = "";

  @action
  addList (title: string, boardIndex: number) {
    let index = parseInt(localStorage.getItem("listIndex")!);
    if (index >= 0) {
      index += 1;
      localStorage.setItem("listIndex", index.toString());
      this.listIndex = index;
    } else {
      index = 0;
      localStorage.setItem("listIndex", index.toString());
      this.listIndex = index;
    }

    const arr = { boardIndex: boardIndex, listIndex: this.listIndex, title: title, cards: [] };
    this.list = this.list.concat(arr);

    let listStorage = JSON.parse(localStorage.getItem("list")!);
    if (listStorage === null) {
      listStorage = [];
    }
    listStorage = listStorage.concat(arr);

    localStorage.setItem("list", JSON.stringify(listStorage));
  }

  @action
  addCard (title: string, listIndex: number) {
    let cardIndexStorage = parseInt(localStorage.getItem("cardIndex")!);
    if (cardIndexStorage >= 0) {
      cardIndexStorage += 1;
      localStorage.setItem("cardIndex", cardIndexStorage.toString());
      this.cardIndex = cardIndexStorage;
    } else {
      cardIndexStorage = 0;
      localStorage.setItem("cardIndex", cardIndexStorage.toString());
      this.cardIndex = cardIndexStorage;
    }

    const arr = { listIndex: listIndex, cardIndex: "card_" + this.cardIndex++, title: title, checked: false };
    this.card = this.card.concat(arr);

    let listStorage = JSON.parse(localStorage.getItem("list")!);

    let arr1;
    listStorage.map((data: any, index: any) => {
      if (data.listIndex === listIndex) {
        if (data.cards.length > 0) {
          arr1 = {
            boardIndex: data.boardIndex,
            listIndex: data.listIndex,
            title: data.title,
            cards: data.cards.concat(arr),
          };
        } else {
          let cardArr: any = [];
          cardArr.push(arr);
          arr1 = { boardIndex: data.boardIndex, listIndex: data.listIndex, title: data.title, cards: cardArr };
        }
        listStorage.splice(index, 1, arr1);
      }
    });

    localStorage.setItem("list", JSON.stringify(listStorage));

    return arr;
  }

  @action
  setListNull () {
    this.list = [];
  }

  @action
  setList (list: any) {
    this.list = list;
  }

  @action
  setCard (arr: any) {
    this.card = this.card.concat(arr);
  }

  @action
  setCardNull () {
    this.card = [];
  }

  @action
  setCardAfterDrag (arr: any) {
    this.card = arr;
  }

  @action
  setCurrentBoardIndex (currentBoardIndex: string) {
    this.currentBoardIndex = currentBoardIndex;
  }
}

export default ListStore;
