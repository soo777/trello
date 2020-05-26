import React from 'react';
import { Button, Icon, Input } from "semantic-ui-react";
import autobind from "~/app/service/autobindDecorator";

interface Props {
  match:any
}

interface State {
  addOn:boolean;
}

@autobind
class BoardContainer extends React.Component<Props, State>{
  constructor (props:Props) {
    super(props);
    this.state = {
      addOn : true,
    }
  }

  componentDidMount () {
    let {match} = this.props;
    console.log(match.params.name);

    // store로 collection 만들어서 관리
    // const name = localStorage.getItem('name');
    // console.log(name);
  }

  addList = (e:any) => {
    if(e.key === 'Enter'){
      console.log('enter');
    }
  }

  addOn = () => {
    this.setState({addOn : false});
  }

  addOff = () => {
    this.setState({addOn: true});
  }

  render(){
    const { addOn } = this.state;

    return(
      <>
        <div className="flex_overflow">

          <div className="board">
            {
              addOn
              ? <div className="basic">
                  <span onClick={this.addOn}>
                    <Icon name="plus" className="plus"/>
                  </span>
                </div>
              : <div className="addWrapper">
                  <Input className="input" onKeyPress={this.addList} />
                  <span className="close" onClick={this.addOff}>
                    <Icon name="plus" className="close"/>
                  </span>
                </div>
            }
          </div>

          <div className="board">
            <div className="wrapper">
              <Input className="input" onKeyPress={this.addList} />
              {/*<span className="close">*/}
              {/*  <Icon name="plus" className="close"/>*/}
              {/*</span>*/}
            </div>
          </div>

          {/*<div className="board">*/}
          {/*  <div className="basic">*/}
          {/*    <Icon name="plus" className="plus"/>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>

      </>
    )
  }

}

export default BoardContainer;
