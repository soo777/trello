import React from 'react';
import { Button, Icon, Input } from "semantic-ui-react";

class BoardContainer extends React.Component<{match:any}>{

  componentDidMount () {
    let {match} = this.props;
    console.log(match.params.name);

    // store로 collection 만들어서 관리
    // const name = localStorage.getItem('name');
    // console.log(name);
  }

  onKeyPress = () => {
    console.log('enter');
  }

  render(){
    return(
      <>
        <div className="flex_overflow">

          <div className="board">

            <div className="basic">
              <Icon name="plus" className="plus"/>
            </div>

          </div>

          <div className="board">

            <div className="wrapper">
              <Input className="input" onKeyPress={this.onKeyPress} />
            </div>

          </div>

        </div>

      </>
    )
  }

}

export default BoardContainer;
