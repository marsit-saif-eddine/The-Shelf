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
import { formatDate } from '@utils';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const AddPostForm = () => {
    var user = JSON.parse(localStorage.getItem('userData'));
    const ownerId = user._id;
    //owner1 = user.email
    
    const {id} =useParams();

    const history = useNavigate();
    const [inputs, setInputs] = useState({
        content: "",
        image: "",
        is_accepted: Boolean("false"),
        owner: user.username,
        owner_Id: ownerId
        
    });
    const [postFeilds, setPostFeilds] = useState({});
    const [defaultValues, setDefaultValues] = useState({
      content: "",
      image: "",
      is_accepted: false,
      owner: user.username,
      owner_Id: ownerId,
      //date: formatDate(Date.now())
    });
    const SignupSchema = yup.object().shape({
      content: yup.string().required(),
  })
    const fetchHandler = async () => {
      console.log('iddd', id )
    return await axios.get(`http://localhost:5000/post/${id}`).then((res) =>res.data);
    };
    useEffect( () =>{
        if(id && id!== null )   
        {
            setTitleForm("Edit your post"); 
            setMode('edit')
            fetchHandler().then(async (data) => {
                //setPostFeilds(data)
                console.log('dataaid', data );
                reset(data);
            });
    } else {
        setTitleForm("Add New Post"); 
    }

    },[])


    const [checked, setChecked] = useState(false);
    const [shoPrice, setShoPrice] = useState(false);
    const [titleForm, setTitleForm] = useState('');
    const [mode, setMode] = useState();
    
    const [files, setFiles] = useState();
    const [selsctedType, setSelsctedType] = useState(false);
    const { register, getValues, setValue } = useForm();
    const refImg = useRef('image');
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
            .post("http://localhost:5000/post/addpost", data)
            .then((res) => console.log('data',res.data));
    };

    const {
        reset,
        control,
        setError,
        handleSubmit,
        formState: { errors }
      } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })
    
      const onSubmit = async data => {
          const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
          await sleep(1000)
          if (Object.values(data).every(field => field.length > 0)) {
            console.log('dataa list', data)
            data.owner= user.username;
            data.image=files
            data.owner_Id= ownerId;
            console.log('dataa list with modif', data)
            if(mode ==='edit') {
                await axios
                .put(`http://localhost:5000/post/${id}`, data)
                .then((res) =>history("/apps/posts"));
            }
            else {
                await axios
                .post(`http://localhost:5000/post/addpost`, data)
                .then((res) => history("/apps/posts"));
            }

          } else console.log('error')
      }
      const handleReset = () => {
        reset({
          content: "",
          image: ""
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
                        <Label sm='3' for='Price'>
                        Content
                        </Label>
                        <Col sm='9'>
                        <Controller
                        defaultValue={defaultValues.description}
                        control={control}
                        name='content'
                        id='content'
                        placeholder='Content'
                        render={({ field }) => <Input {...field} type='textarea' style={{ minHeight: '100px' }} invalid={errors.content && true}/>}
                        />
                        {errors.content && <FormFeedback>Please enter a content post</FormFeedback>}
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
                   

                <Row>
                    <Col className='d-flex' md={{ size: 9, offset: 3 }}>
                    <Button className='me-1' color='primary' type='submit'>
                    Add New Post
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
export default AddPostForm
