import { Box, Button, Modal, Stack, Typography, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { useState, useContext } from "react";
import { addPost } from "../../back-end/service_functions";
import { UserContext } from "../../App";
import { Post } from "../../back-end/postModel";
import { addPostModal_style } from "../Styling/ModalStyling";
import { addPostModal_button_style, addPostModal_submitButton_style } from "../Styling/ButtonStyling";

import { useTransition, animated } from "react-spring";




export function AddPostModal(props){
    const [open, setOpen] = useState(false);
    const [eOpen, seteOpen] = useState(false);

    const transition1 = useTransition(open, {
        from: { opacity: 0, transform: "translateY(-40px)" },
        enter: { opacity: 1, transform: "translateY(0px)" },
        leave: { opacity: 0, transform: "translateY(-40px)" }
    })
    const transition2 = useTransition(eOpen, {
        from: { opacity: 0, transform: "translateY(-40px)" },
        enter: { opacity: 1, transform: "translateY(0px)" },
        leave: { opacity: 0, transform: "translateY(-40px)" }
    })

    const AnimatedModal = animated(Modal);

    const [postTitleText, setPostTitleText] = useState("");
    const [postBodyText, setPostBodyText] = useState("");

    const [postCourse, setPostCourse] = useState("");
    const [postProf, setPostProf] = useState("");
    const [postSem, setPostSem] = useState("");

    const { user } = useContext(UserContext);


    const handleTitleChange = (event)=>{
        setPostTitleText(event.target.value);
        
    }

    const handleBodyChange = (event)=>{
        setPostBodyText(event.target.value);

    }

    const handleCourseChange = (event)=>{
        setPostCourse(event.target.value);

    }

    const handleProfChange = (event)=>{
        setPostProf(event.target.value);

    }

    const handleSemChange = (event)=>{
        setPostSem(event.target.value);

    }

    const submit = ()=> {
       
        const newPost = new Post({
            userId : props.userId,
            postTitle: postTitleText,
            postBody: postBodyText,
            course: postCourse,
            professor: postProf,
            semester: postSem
        });
        console.log(newPost);
        addPost(newPost);
        setOpen(false);
        const x = props.count + 1;
        props.func(x);
    }


    const handleOpen = () => {
        
        console.log(user.name);
        if (user.name==="Log In"){
            seteOpen(true);
        }else{
            setOpen(true);
        }
        
    };
    const handleClose = () => {
        setOpen(false);
    };

    const eClose = () =>{
        seteOpen(false);
    }

    
    return(
    <div>
      <Button onClick={handleOpen} sx={addPostModal_button_style}>Add Post</Button>
      {transition1((style,open)=>
        <AnimatedModal open={open} onClose={handleClose} style={style} BackdropProps={{style: {height: '120%'}}}>
            <Box sx={{...addPostModal_style }}>
                <Stack spacing={3}>

                    <Typography> New Post! </Typography>
                    <TextField id="outlined-basic" label="Post Title" variant="outlined" onChange={handleTitleChange} />
                    <TextField id="outlined-basic" label="Post Body" variant="outlined" multiline onChange={handleBodyChange}/>
                    <TextField id="outlined-basic" label="Course" variant="outlined"  onChange={handleCourseChange}/>
                    <TextField id="outlined-basic" label="Professor" variant="outlined"  onChange={handleProfChange}/>


                    {/* <TextField id="outlined-basic" label="Semester" variant="outlined" onChange={handleSemChange}/> */}
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Semester</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={postSem}
                            label="Semester"
                            onChange={handleSemChange}
                        >
                            <MenuItem value={'Fall 2022'}>Fall 2022</MenuItem>
                            <MenuItem value={'Spring 2023'}>Spring 2023</MenuItem>
                            <MenuItem value={'Summer 2023'}>Summer 2023</MenuItem>
                            <MenuItem value={'Fall 2023'}>Fall 2023</MenuItem>
                        </Select>
                    </FormControl>
                    
                    <Button onClick={submit} sx={addPostModal_submitButton_style}> Submit! </Button>

                </Stack>
            </Box>
        </AnimatedModal>
      )}
      
        {transition2((style, eOpen)=>
            <AnimatedModal open={eOpen} onClose={eClose} style={style} BackdropProps={{style: {height: '120%'}}}>
                <Box sx={{...addPostModal_style }}>
                    <Stack spacing={3}>
                        <Typography> Please Log In To Post! </Typography>
                        <Button onClick={eClose} sx={addPostModal_button_style}> Ok </Button>
                    </Stack>          
                </Box>
            </AnimatedModal>
        )}
      
    </div>
    );
}