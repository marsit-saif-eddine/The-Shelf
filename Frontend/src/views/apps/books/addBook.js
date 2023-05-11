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
import { useNavigate, useParams } from "react-router-dom";
import {Input, Select} from "reactstrap";
import AddBookForm from "./form/addBookForm";



const addBook = () => {

    var user = JSON.parse(localStorage.getItem('userData'));
    const ownerId = user._id;
    //owner1 = user.email
    
    const {id} =useParams();

    const history = useNavigate();
    const [inputs, setInputs] = useState({
        name: "",
        description: "",
        price: "",
        author: "",
        image: "",
        accepted: Boolean("false"),
        owner: user.username,
        owner_Id: ownerId,
        for_sale:null        
    });
    //useEffect(()=>{},[inputs.for_sale])
   
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
    const [selsctedType, setSelsctedType] = useState(false);

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

 const sendRequest = async () => {

     const dataToSend = {
         name: String(inputs.name),
         author: String(inputs.author),
         description: String(inputs.description),
         price: Number(inputs.price),
         image: String(inputs.image),
         available: Boolean(checked),
         //for_sale: Boolean(inputs.for_sale),
         //accepted: Boolean("false"),
         owner: user.username,
         owner_Id: ownerId

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
        <AddBookForm />

        // <form onSubmit={handleSubmit}>
        //     <Box
        //         display="flex"
        //         flexDirection="column"
        //         justifyContent={"center"}
        //         maxWidth={700}
        //         alignContent={"center"}
        //         alignSelf="center"
        //         marginLeft={"auto"}
        //         marginRight="auto"
        //         marginTop={10}
        //     >
        //         <FormLabel>Name</FormLabel>
        //         <Input
        //             value={inputs.name}
        //             onChange={handleChange}
        //             margin="normal"
        //             variant="outlined"
        //             name="name"
        //         />
        //         <FormLabel>Author</FormLabel>
        //         <Input
        //             value={inputs.author}
        //             onChange={handleChange}
        //             margin="normal"
        //             variant="outlined"
        //             name="author"
        //         />

        //         <FormLabel>Rent/ Sale</FormLabel>
        //         <Input
        //         id="for_sale"
        //         name="for_sale"
        //         type="select"
        //         value={inputs.for_sale} onChange={handleChange} 
        //         >
        //                 <option value=''>Select</option>
        //                 <option value='true'>For sale</option>
        //                 <option value='false'>For rent</option>
        //         </Input>
                
        //         {inputs.for_sale === 'true' && 
        //             <>
        //             <FormLabel>Price</FormLabel>
        //             <Input
        //                 value={inputs.price}
        //                 onChange={handleChange}
        //                 type="number"
        //                 margin="normal"
        //                 variant="outlined"
        //                 name="price"
        //             />
        //             </>
                
        //         }
                
        //         <FormLabel>Image</FormLabel>
        //         <Input
        //             value={inputs.image}
        //             onChange={handleChange}
        //             margin="normal"
        //             variant="outlined"
        //             name="image"
        //         />
        //         <FormLabel>Description</FormLabel>
        //         <Input
        //         type='textarea'
        //         rows="5"
        //         value={inputs.description}
        //         onChange={handleChange}
        //         margin="normal"
        //         variant="outlined"
        //         name="description"
        //         />
        //         <FormControlLabel
        //             control={
        //                 <Checkbox checked={checked} onChange={() => setChecked(!checked)} />
        //             }
        //             label="Available"
        //         />

        //         <Button variant="contained" type="submit">
        //             Add Book
        //         </Button>
        //     </Box>
        // </form>
    );
};

export default addBook;