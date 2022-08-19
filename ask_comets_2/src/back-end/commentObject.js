//a class to store user information as an object
import { useId } from "react";
import uuid from "react-uuid";

export class Comment {
    // the default upvote value should be 0;
    userId;
    commentBody;
    postId;
    commentId;
    upvotes = 0;
    timeStamp;

    constructor(commentMap){
        this.userId = commentMap['userId'];
        this.commentBody = commentMap['commentBody'];
        this.postId = commentMap['postId'];
        this.upvotes = commentMap['upvotes'];

        // if the commentId is 0, then a new commentId is generated using uid
        if ('commentId' in commentMap){
            console.log('found')
            this.commentId = commentMap['commentId']
        }else{
            console.log('not found')
            this.commentId = uuid();
        }

        this.timeStamp = commentMap['timeStamp'] || new Date();

        console.log(commentMap);
        console.log(this);
        
    }
     
    // to map function calls are used in order to convert this object into JSON to store in the database
    toMap(){
        return {
            postId : this.postId,
            userId : this.userId,
            commentBody : this.commentBody,
            commentId : this.commentId,
            upvotes : this.upvotes,
            timeStamp : this.timeStamp
        };
    }
    //these functions explicately increments and decrements the upvote count
    incrementUpvote(){
        this.upvotes = this.upvotes + 1; 
    }
    decrementUpvote(){
        this.upvotes = this.upvotes - 1; 
    }


}

//the from map function takes any json maps from the database and coverts them into comment objects
export function fromCommentMap(map){
    console.log(map)
    return new Comment(map);
}