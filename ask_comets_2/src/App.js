import { db, auth, provider } from "./back-end/firebase_config";
import { Post, fromMap } from "./back-end/postModel";
import { addPost } from "./back-end/service_functions";
import { HomePage } from "./front-end/homepage";
import { LoginPage } from "./front-end/loginpage";import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { createTheme } from "@mui/system";
import { ThemeProvider } from "@emotion/react";
import { PostPage } from "./front-end/postPage";


export const theme = createTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
})




function App() {
  return (

    <div className="App" >
      
      <Router>
      <div>
      
        

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/" element={<HomePage />}> </Route>
          <Route path="/post/:id" element={<PostPage />} />
        </Routes>
      </div>
    </Router>
    
    </div>
  );
}

export default App;
