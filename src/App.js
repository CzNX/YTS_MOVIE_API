import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <div className="main_container">
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="*">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
