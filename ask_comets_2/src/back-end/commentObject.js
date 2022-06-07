import uuid from "react-uuid";

export class Comment {
    
    constructor(userId, commentBody, postId, commentId){
        this.userId = userId;
        this.commentBody = commentBody;
        this.postId = postId;

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
            commentId : this.commentId
        };
    }


}

export function fromCommentMap(map){
    return new Comment(
        map['userId'],
        map['commentBody'],
        map['postId'],
        map['commentId']
    );
}