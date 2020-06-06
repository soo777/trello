import React from 'react';
import { Link } from "react-router-dom";

class AppLayout extends React.Component{

  render () {
    return(
      <>
        <div className='title'>
          <Link to={"/"}>
          <img src='/images/light_64.png' alt=''/>
          </Link>
        </div>
        { this.props.children }
      </>

    )
  }

}

export default AppLayout;
