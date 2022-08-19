import { Button, Modal, Box, Stack, Typography,TextField, FormControl, MenuItem, InputLabel, Select, Grid  } from "@mui/material";
import { useState, useContext } from "react"
import { getFilteredPosts } from "../../back-end/service_functions";
import { addPostModal_button_style, addPostModal_submitButton_style } from "../Styling/ButtonStyling";
import { addPostModal_style } from "../Styling/ModalStyling";
import { PostCard } from "./PostCard";
import { PostArrayContext } from "../../App";
import { button_text_style, postCard_postTitle_style } from "../Styling/TypographyStyling";
import { inputField_styling } from "../Styling/TextFieldStyling";


export  function SearchModal(props){
    const {postArray , setPostArray} = useContext(PostArrayContext);
    const [open, setOpen] = useState(false);

    const [postCourse, setPostCourse] = useState("");
    const [postProf, setPostProf] = useState("");
    const [postSem, setPostSem] = useState("");

    
    const handleCourseChange = (event)=>{
        setPostCourse(event.target.value);

    }

    const handleProfChange = (event)=>{
        setPostProf(event.target.value);

    }

    const handleSemChange = (event)=>{
        setPostSem(event.target.value);

    }

    const handleOpen = () => {
        
        
            setOpen(true);
    
        
    };
    const handleClose = () => {
        setPostCourse("");
        setPostProf("");
        setPostSem("");
        setOpen(false);
    };

    const submit = ()=> {
       
        const gettingFilteredPosts = async () =>{
            const arr = await getFilteredPosts(postCourse, postProf, postSem);
            const pArray = await arr.map((p) => <PostCard key={p.postId} postTitle={p.postTitle} postBody={p.postBody} postId={p.postId}> </PostCard>  );
            console.log(postArray.length);
            setPostArray(pArray);
            console.log(postArray.length);
        }

        gettingFilteredPosts();
        handleClose();

        
        // implement:
        // take to a new search result page that queries the database for the filters provided
        // in the future, implement a better text search using a specialized api
        // for right now, users would have to exactly match the course names + prof names
        // in the future, can use univ database to grab these things and make it a drop down
    }

    const clear =  () =>{
        
        setPostCourse("");
        setPostProf("");
        setPostSem("");
        submit();
        
        
        
    }

    return (
        <div>
            <Button onClick={handleOpen} sx={addPostModal_button_style}> <Typography sx = {button_text_style} > Search </Typography> </Button>
            <Modal open = {open} onClose={handleClose}>
                <Box sx={addPostModal_style}>
                    <Stack spacing={3}>
                        <Typography sx = {postCard_postTitle_style}> Search! </Typography>
                        <TextField id="outlined-basic" label="Course" variant="outlined"  onChange={handleCourseChange} sx={inputField_styling}/>
                        <TextField id="outlined-basic" label="Professor" variant="outlined"  onChange={handleProfChange} sx={inputField_styling}/>


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
                        <Grid>
                            <Button onClick={submit} sx={addPostModal_submitButton_style}> Submit! </Button>
                            <Button onClick={clear} sx={addPostModal_submitButton_style}> Clear Filters </Button>
                        </Grid>
                        </Stack>
                </Box>
            </Modal>
        </div>
    )

}