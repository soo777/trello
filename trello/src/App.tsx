import React from "react";
import "~/style/index.scss";
import "semantic-ui-css/semantic.min.css";
import { Provider } from "mobx-react";
import { AppLayout } from "~/app/ui";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "~/app/pages/Routes";
import ListStore from "~/app/service/ListStore";
import ProjectStore from "~/app/service/ProjectStore";

const projectStore = new ProjectStore();
const listStore = new ListStore();

function App () {
  return (
    <Provider
      projectStore={projectStore}
      listStore={listStore}
    >
      <Router>
        <AppLayout>
          <Routes/>
        </AppLayout>
      </Router>
    </Provider>
  );
}

export default App;
