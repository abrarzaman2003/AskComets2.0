import uuid from "react-uuid";

export class Post {
    
    constructor(userId, postTitle, postBody, postId){
        this.userId = userId;
        this.postBody = postBody;
        this.postTitle = postTitle;

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
            postTitle : this.postTitle
        };
    }


}

export function fromMap(map){
    return new Post(
        map['userId'],
        map['postTitle'],
        map['postBody'],
        map['postId']
    );
}