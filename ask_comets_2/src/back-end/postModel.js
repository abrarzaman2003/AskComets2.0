//a class to store all of the post information as an object
import uuid from "react-uuid";

export class Post {
    //constructor to make the post object, if the timestamp is left out, then the current timestamp is assigned
    constructor(userId, postTitle, postBody, postId, resolved=false, timeStamp=new Date(), course="", professor="", semester=""){ 
        this.userId = userId;
        this.postBody = postBody;
        this.postTitle = postTitle;
        this.timeStamp = timeStamp;
        this.resolved = resolved;


        //if the postId is 0, then a new postId is generated using uuid 
        if (postId === 0){
            this.postId = uuid();
        }else{
            this.postId = postId;
        }

        // add some checkers to make sure these are legit classes (will do in future)
        this.course= course;
        this.professor = professor;
        this.semester = semester;
        
    }
    
    // to map function calls are used in order to convert this object into JSON to store in the database
    toMap(){
        return {
            postId : this.postId,
            userId : this.userId,
            postBody : this.postBody,
            postTitle : this.postTitle,
            resolved : this.resolved,
            timeStamp : this.timeStamp,
            course: this.course,
            professor: this.professor,
            semester: this.semester
        };
    }

    //this function makes the post "resolved" 
    resolvePost(){
        this.resolved = !this.resolved;
    }


}

//the from map function takes any json maps from the database and coverts them into post objects
export function fromMap(map){
    return new Post(
        map['userId'],
        map['postTitle'],
        map['postBody'],
        map['postId'],
        map['resolved'],
        map['timeStamp'],
        map['course'],
        map['professor'],
        map['semester'],
    );
}