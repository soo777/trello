import React from "react";
import { Route, Switch } from "react-router-dom";
import BoardContainer from "~/app/ui/board/BoardContainer";
import ProjectPages from "~/app/pages/ProjectPages";

const Routes = () => (
  <>
    <Switch>
      <Route exact path="/" component={ProjectPages}/>
      <Route path="/project/:name/:projectIndex" component={BoardContainer}/>
    </Switch>

  </>
);

export default Routes;
