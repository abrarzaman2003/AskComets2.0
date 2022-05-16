import { db } from "./firebase_config";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { fromMap } from "./postModel";
import uuid from 'react-uuid';

export async function getAllPosts () {
    const collectionRef = collection(db, 'posts');
    const snapShot = await getDocs(collectionRef);
    return snapShot.docs.map((doc) => (fromMap(doc.data)));
    
}

export async function getUserPosts(userId){
    //implement

}

export async function addPosts(postObject){
    const collectionRef = collection(db, 'posts');
    const postRef = doc(collectionRef, postObject.postId);
    await setDoc(postRef, postObject.toMap() );
}

export async function addUser(userObject){
    const collectionRef = collection(db, 'users');
    const userRef = doc(collectionRef, userObject.userId);
    await setDoc(userRef, userObject.toMap());
    return userObject;
}



