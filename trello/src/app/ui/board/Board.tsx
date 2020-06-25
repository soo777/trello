import React from "react";
import BoardStore from "~/app/service/BoardStore";
import { inject, observer } from "mobx-react";
import BoardItem from "~/app/ui/board/BoardItem";
import { Button, Icon, Input, Modal } from "semantic-ui-react";
import ListStore from "~/app/service/ListStore";

interface Props {
  boardStore?: BoardStore;
  listStore?: ListStore;
}

interface State {
  addBoardDisplay: string,
  createBoardDisplay: string,
  boardTitle: string,
  open: boolean,
}

@inject("boardStore", "listStore")
@observer
class Board extends React.Component<Props, State> {

  componentDidMount () {
    const boardStorage = JSON.parse(localStorage.getItem("board")!);

    if (boardStorage) {
      this.props.boardStore!.setBoardList(boardStorage);
    }

    this.props.listStore!.setCardNull();
  }

  constructor (props: any) {
    super(props);
    this.state = {
      addBoardDisplay: "block",
      createBoardDisplay: "none",
      boardTitle: "",
      open: false,
    };
  }

  openCreateBoard = () => {
    this.setState({
      addBoardDisplay: "none",
      createBoardDisplay: "block",
    });
  };

  closeCreateBoard = () => {
    this.setState({
      addBoardDisplay: "block",
      createBoardDisplay: "none",
      boardTitle: "",
    });
  };

  changeBoardInput = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      boardTitle: e.currentTarget.value,
    });
  };

  createBoard = () => {
    if (this.state.boardTitle !== "") {
      this.props.boardStore?.createBoard(this.state.boardTitle);
      this.setState({
        addBoardDisplay: "block",
        createBoardDisplay: "none",
        boardTitle: "",
      });
    }
  };

  handleInput = (e: any) => {
    if (e.key === "Enter") {
      this.createBoard();
    }
  };

  resetLocalStorage = () => {
    this.setState({ open: false });

    localStorage.clear();
    this.props.boardStore!.setBoardListNull();
    this.props.listStore!.setListNull();
  };

  closeTrashModal = () => {
    this.setState({ open: false });
  };

  openModal = () => {
    this.setState({ open: true });
  };

  render () {
    const { open } = this.state;

    let { boardList } = this.props.boardStore!;

    if (!boardList) {
      boardList = [];
      this.props.boardStore!.setBoardListNull();
    }

    return (
      <>
        <div className='project'>
          <div
            className='basic'
            style={{ display: this.state.addBoardDisplay }}
            onClick={this.openCreateBoard}
          >
            Create new Board
          </div>

          <div
            className='wrapper'
            style={{ display: this.state.createBoardDisplay }}
          >
            <div>
              <div className='box'>
                Create Board
                <span className='closeIcon' onClick={this.closeCreateBoard}>
                <Icon name='close'/>
              </span>
              </div>
              <Input className='box' focus placeholder='BoardCreate...' onChange={this.changeBoardInput}
                     value={this.state.boardTitle} onKeyPress={this.handleInput}/>
              <div className='text_right box'>
                <Button content='Create' onClick={this.createBoard}/>
                <Button content='Cancel' onClick={this.closeCreateBoard}/>
              </div>
            </div>
          </div>
        </div>

        {
          boardList.map((data: any, index: any) => (
            <BoardItem boardTitle={data.title} boardIndex={data.boardIndex} key={index}/>
          ))
        }

        {
          boardList.length !== 0
            ?
            <div className="project">
              <Icon
                className="trash alternate outline"
                size="big"
                onClick={this.openModal}
              />
            </div>
            :
            ""
        }

        <Modal size="mini" open={open} onClose={this.closeTrashModal}>
          <Modal.Header>Delete Your Data</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete all data?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button content="No" onClick={this.closeTrashModal}/>
            <Button
              positive
              icon='checkmark'
              labelPosition='right'
              content='Yes'
              onClick={this.resetLocalStorage}
            />
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}

export default Board;
