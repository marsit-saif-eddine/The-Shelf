// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Col, Input, Form, Button, Label, Row, FormFeedback } from 'reactstrap'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import FileUploaderSingle from '../../../forms/form-elements/file-uploader/FileUploaderSingle'
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useForm, Controller } from 'react-hook-form'
import { useNavigate, useParams } from "react-router-dom";
import '@styles/react/libs/editor/editor.scss'
import toast from 'react-hot-toast'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const AddBookForm = () => {
    var user = JSON.parse(localStorage.getItem('userData'));
    const ownerId = user._id;
    //owner1 = user.email
    
    const {id} =useParams();

    const history = useNavigate();
    const [inputs, setInputs] = useState({
        name: "",
        description: "",
        price: "",
        genre: "",
        author: "",
        image: "",
        accepted: Boolean("false"),
        owner: user.username,
        owner_Id: ownerId,
        for_sale:null
        
    });
    const [bookFeilds, setBookFeilds] = useState({});
    const [defaultValues, setDefaultValues] = useState({
        name: "",
        description: "",
        price: "",
        genre: "",
        author: "",
        image: "",
        accepted: false,
        owner: user.username,
        owner_Id: ownerId,
        avilable: true,
        for_sale:null
    });
    const [checked, setChecked] = useState(false);
    const [shoPrice, setShoPrice] = useState(false);
    const [titleForm, setTitleForm] = useState('');
    const [mode, setMode] = useState();
    
    const [files, setFiles] = useState([]);
    const [selsctedType, setSelsctedType] = useState(false);
    const { register, getValues, setValue } = useForm();
    const refImg = useRef('image');
    const fetchHandler = async () => {
    return await axios.get(`http://localhost:5000/book/${id}`).then((res) => res.data.book);
    };
    useEffect( () =>{
        if(id && id!== null )   
        {
            setTitleForm("Edit your book"); 
            setMode('edit')
            fetchHandler().then(async (data) => {
                reset(data);
            });
    } else {
        setTitleForm("Add new book"); 
    }

    },[])

    const SignupSchema = yup.object().shape({
        name: yup.string().required(),
        author: yup.string().required(),
    })
   
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


   // const register =  useRef(null);
        const handleChange = (e) => {
            setInputs((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
            }));
        };
    const sendRequest = async (data) => {
            data.owner= user.username;
            data.owner_Id= ownerId;
            console.log('dataa list with modif', data)
            await axios
                .post("http://localhost:5000/book/addbook", data)
                .then((res) => console.log('data',res.data));
        };

    const {
        reset,
        control,
        setError,
        handleSubmit,
        formState: { errors },
      } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })
    
      const onSubmit = async data => {
        console.log('dataa list', data)
          const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
          await sleep(1000)
          if (Object.values(data)) {
            console.log('dataa list', data)
            data.owner= user.username;
            data.owner_Id= ownerId;
            console.log('dataa list with modif', data)
            if(mode ==='edit') {
                await axios
                .put(`http://localhost:5000/book/${id}`, data)
                .then((res) =>history("/apps/books"));
            }
            else {
                await axios
                .post(`http://localhost:5000/book/addbook`, data)
                .then((res) => history("/apps/books"));
            }

            // toast(
            //   <div className='d-flex'>
            //     <div className='d-flex flex-column'>
            //       <h6>Form Submitted!</h6>
            //       <div>
            //         <ul className='list-unstyled mb-0'>
            //           <li>
            //             <strong>firstName</strong>: {data.name}
            //           </li>
            //           <li>
            //             <strong>lastName</strong>: {data.author}
            //             <strong>for_sale</strong>: {data.for_sale}
            //             <strong>description</strong>: {data.description}
            //           </li>
            //         </ul>
            //       </div>
            //     </div>
            //   </div>
            // )
          } else console.log('error')
      }
      const handleReset = () => {
        reset({
          name: '',
          author: '',
          for_sale:'',
          description:'',
          genre: "",
          avilable: false
        })
      }
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>{titleForm}</CardTitle>
      </CardHeader>

      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className='mb-1'>
            <Label sm='3' for='name'>
                Name
            </Label>
            <Col sm='9'>
            <Controller
              defaultValue={defaultValues.name}
              control={control}
              id='name'
              name='name'
              render={({ field }) => <Input {...field} placeholder='Name' invalid={errors.name && true} />}
            />
            {errors.name && <FormFeedback>Please enter a book name</FormFeedback>}
            </Col>
          </Row>

          <Row className='mb-1'>
            <Label sm='3' for='author'>
            Author
            </Label>
            <Col sm='9'>
            <Controller
              defaultValue={defaultValues.author}
              control={control}
              id='author'
              name='author'
              type='text' 
              render={({ field }) => <Input  {...field} placeholder='Author' invalid={errors.author && true} />}
            />
            {errors.author && <FormFeedback>Please enter a book author</FormFeedback>}
            </Col>
          </Row>

    {shoPrice && (
        <>
        <Row className='mb-1'>
            <Label sm='3' for='Price'>
            Price
            </Label>
            <Col sm='9'>
            <Controller
            defaultValue={defaultValues.price}
            control={control}
            name='price'
            id='price'
            placeholder='Price'
            render={({ field }) => <Input {...field} type='number' id="price"  name='price'/>}
            />
            </Col>
        </Row>
        </>
    )}
          <Row className='mb-1'>
            <Label sm='3' for='for_sale'>
            Rent/ Sale
            </Label>
            <Col sm='9'>
            <Controller
                        defaultValue={defaultValues.for_sale}
                        control={control}
                        id="for_sale"
                        name="for_sale"
                        render={({ field }) => 
                        <Input {...field} 
                        id="for_sale"
                        name="for_sale"
                        type='select'
                         >
                            <option value="">Select</option>
                            <option value='true'>For sale</option>
                            <option value='false'>For rent</option>
                        
                        </Input>
                            }
                        />
            </Col>
          </Row>
                    
          <Row className='mb-1'>
            <Label sm='3' for='for_sale'>
            Genre
            </Label>
            <Col sm='9'>
            <Controller
                        defaultValue={defaultValues.genre}
                        control={control}
                        id="genre"
                        name="genre"
                        render={({ field }) => 
                        <Input {...field} 
                        id="genre"
                        name="genre"
                        type='select'
                         >
                            <option value="">Select</option>
                            <option value='Action'>Action</option>
                            <option value='Romance'>Romance</option>
                            <option value='Fantasy'>Fantasy</option>
                            <option value='Drama'>Drama</option>
                            <option value='Crime'>Crime</option>
                            <option value='Adventure'>Adventure</option>
                            <option value='Thriller'>Thriller</option>
                            <option value='Sci-fi'>Sci-fi</option>
                            <option value='Music'>Music</option>
                            <option value='Family'>Family</option>
                        
                        </Input>
                            }
                        />
            </Col>
          </Row>
                
                <Row className='mb-1'>
                        <Label sm='3' for='Price'>
                        Image
                        </Label>
                        <Col sm='9'>
                        <FileUploaderSingle files={files} setFiles={setFiles}/>
                        </Col>
                    </Row>

                    <Row className='mb-1'>
                        <Label sm='3'  for='avilable' className='form-check-label'>
                        Available
                        </Label>
                        <Col sm='9'>
                        <Controller
                        defaultValue={defaultValues.avilable}
                        control={control}
                        name='avilable'
                        id='avilable'
                        placeholder='avilable'
                        render={({ field }) => <Input {...field} type='checkbox' id="avilable"  name='avilable'/>}
                        />
                        </Col>
                    </Row>
                    <Row className='mb-1'>
                        <Label sm='3' for='Price'>
                        Description
                        </Label>
                        <Col sm='9'>
                        <Controller
                        defaultValue={defaultValues.description}
                        control={control}
                        name='description'
                        id='description'
                        placeholder='description'
                        render={({ field }) => <Input {...field} type='textarea' style={{ minHeight: '100px' }}/>}
                        />
                        </Col>
                    </Row>

                <Row>
                    <Col className='d-flex' md={{ size: 9, offset: 3 }}>
                    <Button className='me-1' color='primary' type='submit'>
                    Add Book
                    </Button>
                    <Button outline color='secondary' type='reset' onClick={handleReset}>
                        Reset
                    </Button>
                    </Col>
                </Row>


        </Form>
      </CardBody>
    </Card>
  )
}
export default AddBookForm
