import React from 'react';
import { Link } from "react-router-dom";

class AppLayout extends React.Component{

  render () {
    return(
      <>
        <Link to="/">
          <div className='title'>
            <img src='/images/light_64.png' alt=''/>
          </div>
        </Link>
        { this.props.children }
      </>

    )
  }

}

export default AppLayout;
