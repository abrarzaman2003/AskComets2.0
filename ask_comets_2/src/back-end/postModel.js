import uuid from "react-uuid";

export class Post {
    
    constructor(userId, postTitle, postBody, postId){
        this.userId = userId;
        this.postBody = postBody;
        this.postTitle = postTitle;
        this.timeStamp = new Date();

        if (postId == 0){
            this.postId = uuid();
        }else{
            this.postId = postId;
        }
        
    }
     
    toMap(){
        return {
            postId : this.postId,
            userId : this.userId,
            postBody : this.postBody,
            postTitle : this.postTitle,
            timeStamp : this.timeStamp
        };
    }


}

export function fromMap(map){
    return new Post(
        map['userId'],
        map['postTitle'],
        map['postBody'],
        map['postId'],
        map['timeStamp']
    );
}