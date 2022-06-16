import uuid from "react-uuid";

export class Post {
    
    constructor(userId, postTitle, postBody, postId, resolved=false, timeStamp=new Date()){
        this.userId = userId;
        this.postBody = postBody;
        this.postTitle = postTitle;
        this.timeStamp = timeStamp;
        this.resolved = resolved;

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
            resolved : this.resolved,
            timeStamp : this.timeStamp
        };
    }

    resolvePost(){
        this.resolved = !this.resolved;
    }


}

export function fromMap(map){
    return new Post(
        map['userId'],
        map['postTitle'],
        map['postBody'],
        map['postId'],
        map['resolved'],
        map['timeStamp'],
    );
}