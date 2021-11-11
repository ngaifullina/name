import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import { Todos } from "./todos/Todos";
import { TodosList } from "./todo-list/TodosList";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route path="/list">
            <TodosList readonly={true} />
          </Route>
          <Route path="/">
            <Todos />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
