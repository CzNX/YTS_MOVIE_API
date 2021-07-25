import { Route, Switch } from "react-router-dom";
import Header from "./comps/Header";
import Home from "./pages/Home";
import React, { useEffect } from "react";

function App() {
  const [value, setValue] = React.useState();

  return (
    <div className="main_container">
      <Header value={value} setValue={setValue} />
      <Switch>
        <Route path="/" exact>
          <Home value={value} setValue={setValue} />
        </Route>
        <Route path="*">
          <Home value={value} setValue={setValue} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
