import React from 'react';
import logo from './logo.svg';
import './App.css';
import {inject, observer} from "mobx-react";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

@inject("samplestore")
@observer
class App extends React.Component<any> {
  render() {
    return (
        <div>
          <div>value = {this.props.samplestore.yourStore}</div>
          <div>
            <button onClick={this.props.samplestore.changeToWorld}>
              Change to world
            </button>
          </div>
        </div>
    );
  }
}

export default App;
