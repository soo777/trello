import React from "react";
import { Route, Switch } from "react-router-dom";
import ListContainer from "~/app/ui/list/ListContainer";
import BoardContainer from "~/app/ui";

const Routes = () => (
  <>
    <Switch>
      <Route exact path="/" component={BoardContainer}/>
      <Route path="/board/:name/:boardIndex" component={ListContainer}/>
    </Switch>

  </>
);

export default Routes;
