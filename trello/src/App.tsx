import React from 'react';
import '~/style/index.scss';
import 'semantic-ui-css/semantic.min.css'
import ProjectPages from "~/app/pages";
import { Provider } from "mobx-react";
import BoardStore from "~/app/service/BoardStore";
import { AppLayout } from "~/app/ui";
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from "~/app/pages/Routes";

const boardStore = new BoardStore();

function App() {
  return (
  <Provider
    boardStore={boardStore}
  >
    <Router>
      <AppLayout>
        <Routes/>
        {/*<ProjectPages/>*/}
      </AppLayout>
    </Router>
  </Provider>
  );
}

export default App;
