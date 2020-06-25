import React from "react";
import "~/style/index.scss";
import "semantic-ui-css/semantic.min.css";
import { Provider } from "mobx-react";
import { AppLayout } from "~/app/ui";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "~/app/pages/Routes";
import ListStore from "~/app/service/ListStore";
import BoardStore from "~/app/service/BoardStore";

const boardStore = new BoardStore();
const listStore = new ListStore();

function App () {
  return (
    <Provider
      boardStore={boardStore}
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
