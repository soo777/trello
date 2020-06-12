import React from 'react';
import '~/style/index.scss';
import 'semantic-ui-css/semantic.min.css'
import ProjectPages from "~/app/pages";
import { Provider } from "mobx-react";
import { AppLayout } from "~/app/ui";
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from "~/app/pages/Routes";
import ListStore from "~/app/service/ListStore";
import ProjectStore from "~/app/service/ProjectStore";
import Board from "~/components/Board";
import Card from "~/components/Card";
import List from "~/sample/List";

const projectStore = new ProjectStore();
const listStore = new ListStore();

function App() {
  return (
  <Provider
    projectStore={projectStore}
    listStore={listStore}
  >
    {/*<Router>*/}
    {/*  <AppLayout>*/}
    {/*    <Routes/>*/}
    {/*    /!*<ProjectPages/>*!/*/}
    {/*  </AppLayout>*/}
    {/*</Router>*/}

    {/*<List/>*/}

    <Board id={"board-1"} className="board">
      <Card id={"card-1"} className={"card"} draggable="true">
        <p>card one</p>
      </Card>
      <Card id={"card-3"} className={"card"} draggable="true">
        <p>card three</p>
      </Card>
    </Board>

    <Board id={"board-2"} className="board">
      <Card id={"card-2"} className={"card"} draggable="true">
        <p>card two</p>
      </Card>
    </Board>
  </Provider>
  );
}

export default App;
