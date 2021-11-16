import { Switch, Route, BrowserRouter as Router, Link } from "react-router-dom";
import { TodoList } from "./components/todo-list/TodoList";
import "./App.css";

function App() {
  return (
    <Router basename="todos-editable">
      <div className="container">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/view">View</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/view">
            <TodoList readonly />
          </Route>
          <Route path="/">
            <TodoList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
