import { db } from "./firebase_config";
import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc} from "firebase/firestore";
import { fromMap } from "./postModel";
import { Comment, fromCommentMap } from "./commentObject";
import { fromUserMap } from "./userModel";

// these functions serve as the main CRUD operations with the firestore database


// this function is used by the home page to get all of the posts
export async function getAllPosts () {
    const collectionRef = await collection(db, 'posts'); //makes a reference to the collection
    const q = query(collectionRef, orderBy("timeStamp", "desc")); //this query orders the posts by time created
    const snapShot = await getDocs(q); //gets all the docs according to the query
    const x = await snapShot.docs.map((doc) => (fromMap(doc.data()))); //maps the docs data into an array which is then returned
    return x;
    
}

//this will be eventually updated when a profile page is made
export async function getUserPosts(userId){
    //implement

}

//this function gets a singular post for the 'post page'
export async function getPost(postId){
    const docRef = await doc(db, 'posts', postId); // a doc ref is created using the postId to get the document
    const docSnapShot = await getDoc(docRef); // the snapshot is retrived and then the data is returned
    const x = await docSnapShot.data();
    return fromMap(x);
}

// will add a post to the data base + will be able to edit existing posts
export async function addPost(postObject){
    console.log('service function: ', postObject);
    const collectionRef = collection(db, 'posts'); // retrieves the collection 
    const postRef = doc(collectionRef, postObject.postId); //creates a new doc reference with the ID of the post
    await setDoc(postRef, postObject.toMap(), { merge: true } ); //calls the set doc function with the doc reference, the post object (which gets turned into JSON)
}   // merge: true is used so that if a document with the same postId exists, then its contents are updated instead of creating a new document, will use this feature for edit post

// function simply deletes posts
export async function deletePost(postObject){
    const docRef = await doc(db, 'posts', postObject.postId);
    await deleteDoc(docRef);
}

// this function adds users, works exactly like addPost, but the merge attribute isint set because editing users is not a feature yet
export async function addUser(userObject){
    const collectionRef = collection(db, 'users');
    const userRef = doc(collectionRef, userObject.userId);
    await setDoc(userRef, userObject.toMap());
    return userObject;
}

// adds comments, works exactly like addPost
export async function addComment(commentObject){
    console.log(commentObject);
    const collectionRef = await collection(db, 'posts' , commentObject.postId, 'comments');
    const commentRef = await doc(collectionRef, commentObject.commentId);
    await setDoc(commentRef, commentObject.toMap(), { merge: true });
    return commentObject;
}

// gets all comments for a certain post
export async function getComments(postId){
    const collectionRef = await collection(db, 'posts' , postId, 'comments'); // the collection is selected using the postId from the argument
    const snapShot = await getDocs(collectionRef); //rest of the function is identical to getPosts
    const commentArray = await snapShot.docs.map((doc) => (fromCommentMap(doc.data())));
    return commentArray;
}

// this function enables upvotes for a certain comment, it makes sure that the same person did not upvote the same comment twice 
export async function upvoteComment (commentObject , userObject, upvoted){
    //comment object is passed in because the upvotes are stored in each comment object
    // the user object of the current user is passed in to compare with the 'upvoted collection'
    // the upvoted argument is to tell the function whether or not the comment should be upvoted or not

    // each comment has a collection called 'upvoted' which stores all the users who upvoted the comment
    const collectionRef = await collection(db, 'posts' , commentObject.postId, 'comments' , commentObject.commentId, 'upvoted');
    //checkUserUpvotes simply checks if the user is present within the 'upvoted' collection
    const a = await checkUserUpvote(commentObject, userObject);

    if (upvoted){ // if the comment clientside is upvoted...
        //console.log("it is upvoted");
        if (!a){ //but if its not in the upvoted collection, then it gets added
            //console.log("adding...");
            const userRef = doc(collectionRef, userObject.userId);
            await setDoc(userRef, userObject.toMap(), {merge: true});
        }
        // if upvoted, and the thing is not there, then put it there
        //if not upvoted, and the the thing is there, then delete it
    }else{
        if (a){ //if the comment is not upvoted client side, but the user is in the upvoted collection, then the user document gets removed
            //console.log("deleteing", userObject.userId);
            const docRef = await doc(db, 'posts' , commentObject.postId, 'comments' , commentObject.commentId, 'upvoted', userObject.userId);
            await deleteDoc(docRef);
        }
    }
    
}

//checkUserUpvotes simply checks if the user is present within the 'upvoted' collection
export async function checkUserUpvote(commentObject , userObject){
    const docRef = await doc(db, 'posts' , commentObject.postId, 'comments' , commentObject.commentId, 'upvoted', userObject.userId);
    const docSnap  = await getDoc(docRef); //simply tries to search the user object within the upvoted collection, and then returns if it exists
    //console.log(userObject.userId, "?" , docSnap.exists().toString());
    return docSnap.exists(); 
}

//gets the current user, works exactly like getPost
export async function getUser(userId){
    const docRef = await doc(db, 'users', userId);
    const docSnapShot = await getDoc(docRef);
    const x = await docSnapShot.data();
    //console.log(x);
    return fromUserMap(x);
}




