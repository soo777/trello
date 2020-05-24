import React from 'react';
import '~/style/index.scss';
import 'semantic-ui-css/semantic.min.css'
import ProjectPages from "~/app/pages";
import { Provider } from "mobx-react";
import ProjectStore from "~/app/service/ProjectStore";
import { AppLayout } from "~/app/ui";
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from "~/app/pages/Routes";

const projectStore = new ProjectStore();

function App() {
  return (
  <Provider
    projectStore={projectStore}
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
