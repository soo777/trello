import React from 'react';
import {inject, observer} from "mobx-react";
import '~/style/index.scss';
import 'semantic-ui-css/semantic.min.css'
import {Button} from "semantic-ui-react";

function App() {
  return (
    <div className="index">
      header
    </div>
  );
}

// @inject("samplestore")
// @observer
// class App extends React.Component<any> {
//   render() {
//     return (
//         <div>
//           <div>value = {this.props.samplestore.yourStore}</div>
//           <div>
//             <button onClick={this.props.samplestore.changeToWorld}>
//               Change to world
//             </button>
//           </div>
//         </div>
//     );
//   }
// }

export default App;
