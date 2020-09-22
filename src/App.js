import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import SearchForm from "./SearchForm";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={SearchForm} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
