//a class to store all of the post information as an object
import uuid from "react-uuid";

export class Post {
    userId;
    postBody;
    postId;
    resolved = false;
    timeStamp;
    course="";
    professor="";
    semester="";
    //constructor to make the post object, if the timestamp is left out, then the current timestamp is assigned
    constructor(postMap){ 
        this.userId = postMap['userId']
        this.postBody = postMap['postBody'];
        this.postTitle = postMap['postTitle'];
        this.timeStamp = postMap['timeStamp'];
        this.resolved = postMap['resolved'];


        //if the postId is 0, then a new postId is generated using uuid 
        if ('postId' in postMap){
            this.postId = postMap['postId'];
        }else{
            this.postId = uuid();
        }

        
        this.timeStamp = postMap['timeStamp'] || new Date();
        
        this.resolved = postMap['resolved'] || false;//??

        // add some checkers to make sure these are legit classes (will do in future)
        if ('course' in postMap){
            this.course= postMap['course'];
        }
        if ('professor' in postMap){
            this.professor= postMap['professor'];
        }
        if ('semester' in postMap){
            this.semester= postMap['semester'];
        }
        
        
        
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
    return new Post( map );
}