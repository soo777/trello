import React from 'react';

interface Props {
  title:string
}

class ListItem extends React.Component<Props, any>{
  render () {
    return (
      <>
        <div className="box">
          <div className="item">
            {this.props.title}
          </div>
        </div>
      </>
    )
  }
}

export default ListItem;
