import {
    Button,
    Checkbox,
    FormControlLabel,
    FormLabel,
    TextField,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Input, Select} from "reactstrap";
import AddPostForm from "./form/addPostForm";



const addPost = () => {

    var user = JSON.parse(localStorage.getItem('userData'));
    console.log("your user is :"+user.username);
    const ownerId = user.id;
    //owner1 = user.email
    

    const history = useNavigate();
    const [inputs, setInputs] = useState({
        content: "",
        image: "",
        is_accepted: Boolean("true"),
        owner: user.username,
        owner_Id: ownerId
       
    });
   
    const [checked, setChecked] = useState(false);
    

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

 const sendRequest = async () => {

     const dataToSend = {
         content: String(inputs.content),
         image: String(inputs.image),
         owner: user.username,
         owner_Id: ownerId

     }
        await axios
            .post("http://localhost:5000/post/addpost", dataToSend)
            .then((res) => res.data);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs, checked);
        sendRequest().then(() => history("/apps/posts"));
    };

    return (
        <AddPostForm></AddPostForm>
    );
};

export default addPost;