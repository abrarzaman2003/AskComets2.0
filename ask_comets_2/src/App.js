import { db, auth, provider } from "./back-end/firebase_config";
import { Post, fromMap } from "./back-end/postModel";
import { addPost } from "./back-end/service_functions";
import { HomePage } from "./front-end/homepage";
import { User } from "./back-end/userModel";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useSearchParams
} from "react-router-dom";
import { createTheme, Link } from "@mui/system";
import { ThemeProvider } from "@emotion/react";
import { PostPage } from "./front-end/postPage";
import { createContext, useCallback, useMemo, useState } from "react";



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

export const UserContext = createContext();

export  const UserProvider = (props) => {
  const [user, setUser] = useState(new User("Log In" , 0, 0)); // a dummy object to read the text from 
const value = useMemo(
 () => ({user, setUser}),[user])


  return (
      <UserContext.Provider
          value={value}
      >
          {props.children}
      </UserContext.Provider>
  );
}


function App() {
  return (
    <div className="App" >
    <UserProvider>
    
      <Router>
          <Routes>
            <Route path="/" element={<HomePage />}> </Route>
            <Route path="/post/:id" element={<PostPage />} />
          </Routes>
      </Router>
    </UserProvider>
    </div>
  );
}

export default App;
