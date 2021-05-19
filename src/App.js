import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/">
            <Sidebar />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
