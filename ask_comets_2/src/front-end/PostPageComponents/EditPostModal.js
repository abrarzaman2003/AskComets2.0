import { useContext , useState} from "react";
import { PostContext } from "../postPage";
import { Post } from "../../back-end/postModel";
import { Box, Button, Modal, Stack, Typography, TextField } from "@mui/material";
import { addPost } from "../../back-end/service_functions";



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#8FB8ED',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    borderRadius: "21px",
};

export function EditPostModal(props){
    const [postTitleText, setPostTitleText] = useState("");
    const [postBodyText, setPostBodyText] = useState("");

    const {post , setPost} = useContext(PostContext);


    const handleTitleChange = (event)=>{
        setPostTitleText(event.target.value);
        
    }

    const handleBodyChange = (event)=>{
        setPostBodyText(event.target.value);

    }

    const submit = ()=> {
        const newPost = new Post(post.userId, postTitleText, postBodyText, post.postId, post.resolved);
        setPost(newPost);
        addPost(newPost);
        props.setOpen(false);
    }
    const handleClose = () => {
        props.setOpen(false);
    };

    return(
        <div>
          <Modal
            open={props.open}
            onClose={handleClose}
          >
            <Box sx={{...style, width: 400 }}>
                <Stack spacing={3}>
    
                    <Typography> Edit Post! </Typography>
                    <TextField id="outlined-basic" label="Post Title" variant="outlined" onChange={handleTitleChange} defaultValue={post.postTitle} />
                    <TextField id="outlined-basic" label="Post Body" variant="outlined" multiline onChange={handleBodyChange} defaultValue={post.postBody}/>
                    <Button onClick={submit} sx={{
                backgroundColor: '#bAb86c',
                borderRadius: '10px',
                color: '#000000'
            }}> Submit! </Button>
    
                </Stack>
            </Box>
          </Modal>
        </div>
        );
}