import { db } from "./firebase_config";
import { collection, doc, getDoc, getDocs, orderBy, query, setDoc } from "firebase/firestore";
import { fromMap } from "./postModel";
import { Comment, fromCommentMap } from "./commentObject";

export async function getAllPosts () {
    const collectionRef = await collection(db, 'posts');
    const q = query(collectionRef, orderBy("timeStamp", "desc"));
    const snapShot = await getDocs(q);
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

export async function addComment(commentObject){
    const collectionRef = await collection(db, 'posts' , commentObject.postId, 'comments');
    const commentRef = await doc(collectionRef, commentObject.commentId);
    await setDoc(commentRef, commentObject.toMap(), { merge: true });
    return commentObject;
}

export async function getComments(postId){
    const collectionRef = await collection(db, 'posts' , postId, 'comments');
    const snapShot = await getDocs(collectionRef);
    const commentArray = await snapShot.docs.map((doc) => (fromCommentMap(doc.data())));
    return commentArray;

}

// export async function upsertComment(commentObject){

// }



