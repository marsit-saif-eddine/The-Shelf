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
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



const addBook = () => {
    const history = useNavigate();
    const [inputs, setInputs] = useState({
        name: "",
        description: "",
        price: "",
        author: "",
        image: "",
    });

    //const cookies = new Cookies();
   /*
   // const [selectedFile, setSelectedFile] = useState(null);
   function handleFileInput(e) {
   setSelectedFile(e.target.files[0]);}
    function handleUpload() {
        // Upload logic goes here
        console.log(selectedFile);
        const data = new data();
        data.append('image', selectedFile);

        axios
            .post("http://localhost:5000/book/addbook", {
                name: String(inputs.name),
                author: String(inputs.author),
                description: String(inputs.description),
                price: Number(inputs.price),
                image: String(inputs.image),
                available: Boolean(checked),
            })
            .then((res) => res.data)
            .catch(error => console.error(error));
    }
*/

    const [checked, setChecked] = useState(false);
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
        // console.log(e.target.name, "Value", e.target.value);
    };

 const sendRequest = async () => {

     const dataToSend = {
         name: String(inputs.name),
         author: String(inputs.author),
         description: String(inputs.description),
         price: Number(inputs.price),
         image: String(inputs.image),
         available: Boolean(checked),
     }
        await axios
            .post("http://localhost:5000/book/addbook", dataToSend)
            .then((res) => res.data);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs, checked);
        sendRequest().then(() => history("/apps/books"));
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box
                display="flex"
                flexDirection="column"
                justifyContent={"center"}
                maxWidth={700}
                alignContent={"center"}
                alignSelf="center"
                marginLeft={"auto"}
                marginRight="auto"
                marginTop={10}
            >
                <FormLabel>Name</FormLabel>
                <TextField
                    value={inputs.name}
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    name="name"
                />
                <FormLabel>Author</FormLabel>
                <TextField
                    value={inputs.author}
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    name="author"
                />
                <FormLabel>Description</FormLabel>
                <TextField
                    value={inputs.description}
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    name="description"
                />
                <FormLabel>Price</FormLabel>
                <TextField
                    value={inputs.price}
                    onChange={handleChange}
                    type="number"
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    name="price"
                />
                <FormLabel>Image</FormLabel>
                <TextField
                    value={inputs.image}
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    name="image"
                />

                <FormControlLabel
                    control={
                        <Checkbox checked={checked} onChange={() => setChecked(!checked)} />
                    }
                    label="Available"
                />

                <Button variant="contained" type="submit">
                    Add Book
                </Button>
            </Box>
        </form>
    );
};

export default addBook;