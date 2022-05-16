import { db, auth, provider } from "./back-end/firebase_config";
import { Post, fromMap } from "./back-end/postModel";
import { addPosts } from "./back-end/service_functions";
import { HomePage } from "./front-end/homepage";
import { LoginPage } from "./front-end/loginpage";import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";





function App() {
  return (
    <div className="App">
      <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">login</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/login" element={<LoginPage />}>
            
          </Route>
          <Route path="/" element={<HomePage />}>
            
          </Route>
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
