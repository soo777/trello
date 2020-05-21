import React from 'react';

class BoardContainer extends React.Component<{match:any}>{

  componentDidMount () {
    let {match} = this.props;
    console.log(match.params.name);


    // store로 collection 만들어서 관리
    localStorage.setItem('name', 'aaaaa');
    const name = localStorage.getItem('name');
    console.log(name);
  }

  render(){
    return(
      <>
        aaa
      </>
    )
  }

}

export default BoardContainer;
