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

  render(){
    return(
      <>
        board
      </>
    )
  }

}

export default BoardContainer;
