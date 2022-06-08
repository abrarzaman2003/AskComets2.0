import uuid from "react-uuid";

export class Comment {
    
    constructor(userId, commentBody, postId, commentId, upvotes = 0){
        this.userId = userId;
        this.commentBody = commentBody;
        this.postId = postId;
        this.upvotes = upvotes;

        if (commentId == 0){
            this.commentId = uuid();
        }else{
            this.commentId = commentId;
        }
        
    }
     
    toMap(){
        return {
            postId : this.postId,
            userId : this.userId,
            commentBody : this.commentBody,
            commentId : this.commentId,
            upvotes : this.upvotes
        };
    }

    incrementUpvote(){
        this.upvotes = this.upvotes + 1; 
    }


}

export function fromCommentMap(map){
    return new Comment(
        map['userId'],
        map['commentBody'],
        map['postId'],
        map['commentId'],
        map['upvotes']
    );
}