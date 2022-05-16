import { auth, provider } from "./firebase_config";
import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { User } from "./userModel";
import { addUser } from "./service_functions";


export async function signIn(){
    const result = await signInWithPopup(auth, provider);
    const credential = await GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = await result.user;
    const newUser = new User(user['displayName'], user['email'], user['uid']);
    addUser(newUser);
    return newUser;

    
    // await signInWithPopup(auth, provider)
    // .then((result) => {
    //   // This gives you a Google Access Token. You can use it to access the Google API.
    //   const credential = GoogleAuthProvider.credentialFromResult(result);
    //   const token = credential.accessToken;
    //   // The signed-in user info.
    //   const user = result.user;
      
    //   const newUser = new User(user['displayName'], user['email'], user['uid']);
    //   return newUser;
    //   addUser(newUser);
     
      

    //   // ...
    // })
    
}

