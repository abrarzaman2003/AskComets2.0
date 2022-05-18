import { db } from "./firebase_config";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { fromMap } from "./postModel";
import uuid from 'react-uuid';

export async function getAllPosts () {
    const collectionRef = await collection(db, 'posts');
    const snapShot = await getDocs(collectionRef);
    const x = await snapShot.docs.map((doc) => (fromMap(doc.data())));
    return x;
    
}

export async function getUserPosts(userId){
    //implement

}

export async function getPost(postId){
    const docRef = await doc(db, 'posts', postId);
    const docSnapShot = await getDoc(docRef);
    const x = await docSnapShot.data();
    return fromMap(x);
}

export async function addPost(postObject){
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



