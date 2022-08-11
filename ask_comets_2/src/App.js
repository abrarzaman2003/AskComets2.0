import { HomePage } from "./front-end/homepage";
import { User } from "./back-end/userModel";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { createTheme} from "@mui/system";
import { PostPage } from "./front-end/postPage";
import { createContext, useMemo, useState } from "react";




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
      <UserContext.Provider value={value}>
          {props.children}
      </UserContext.Provider>
  );
}

export const PostArrayContext = createContext([]);

export const PostArrayProvider = (props) =>{
  const [postArray, setPostArray] = useState([]);
  const value = useMemo(
    () => ({postArray, setPostArray}),[postArray])
   
   
     return ( 
         <PostArrayContext.Provider value={value}>
             {props.children}
         </PostArrayContext.Provider>
     );
}


function App() {
  return (
    <div className="App" >
    <UserProvider>
    <PostArrayProvider>
      <Router>
          <Routes>
            <Route path="/" element={<HomePage />}> </Route>
            <Route path="/post/:id" element={<PostPage />} />
          </Routes>
      </Router>
    </PostArrayProvider>
    </UserProvider>
    </div>
  );
}

export default App;

