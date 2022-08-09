//a class to store user information as an object
import uuid from "react-uuid";

export class User{
    
    constructor(name, email , userId){
        if (userId === 0){
            this.userId = uuid(0);
        }else{
            this.userId = userId;
        }
        
        this.name = name;
        this.email = email;
    }

    // to map function calls are used in order to convert this object into JSON to store in the database
    toMap(){
        return {
            userId : this.userId,
            name : this.name,
            email : this.email,
        };
    }
}

//the from map function takes any json maps from the database and coverts them into user objects
export function fromUserMap(map){
    return new User(
        map['name'],
        map['email'],
        map['userId']
    );
}