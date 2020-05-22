import React from 'react';
import { Button, Icon, Input } from "semantic-ui-react";
import BoardStore from "~/app/service/BoardStore";
import { inject, observer } from "mobx-react";

interface Props {
  boardStore?:BoardStore;
}

@inject('boardStore')
@observer
class Board extends React.Component<Props> {

  componentDidMount () {
    const a = JSON.parse(localStorage.getItem('board')!);
    console.log(localStorage.getItem('board'));

    if(a){
      for(let i=0; i<a.length; i++){
        console.log(a[i].name);
      }
    }

  }

  state = {
    boardDisplay: 'block',
    createBoardDisplay: 'none',
    boardTitle: '',
  };

  openCreateBoard = () =>{
    this.setState({
      boardDisplay: 'none',
      createBoardDisplay: 'block'
    });
  };

  closeCreateBoard = () => {
    this.setState({
      boardDisplay: 'block',
      createBoardDisplay: 'none',
      boardTitle: ''
    });
  }

  changeBoardInput = (e:React.FormEvent<HTMLInputElement>) => {
    this.setState({
      boardTitle:e.currentTarget.value
    })
  }

  createBoard = () => {
    this.props.boardStore?.createBoard(this.state.boardTitle);
    this.setState({
      boardDisplay: 'block',
      createBoardDisplay: 'none',
      boardTitle: '',
    });
  }

  render(){

    return(
      <div className='board'>

        <div
          className='basic'
          style={{display:this.state.boardDisplay}}
          onClick={this.openCreateBoard}
        >
          Creating a new Board
        </div>

        <div
          className='wrapper'
          style={{display:this.state.createBoardDisplay}}
        >
          <div>
            <div className='box'>
              Creating Board
              <span className='closeIcon' onClick={this.closeCreateBoard}>
                <Icon name='close'  />
              </span>
            </div>
            <Input className='box' focus placeholder='Board...' onChange={this.changeBoardInput} value={this.state.boardTitle}></Input>
            <div className='text_right box'>
              <Button content='Create' onClick={this.createBoard}/>
              <Button content='Cancel' onClick={this.closeCreateBoard}/>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default  Board;
