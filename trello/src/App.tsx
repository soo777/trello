import React from 'react';
import '~/style/index.scss';
import 'semantic-ui-css/semantic.min.css'
import ProjectPages from "~/app/pages";

function App() {
  return (
    <div>
      <ProjectPages/>
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
