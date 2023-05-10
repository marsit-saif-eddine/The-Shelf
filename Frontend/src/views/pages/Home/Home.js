import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import axios from "axios";

import { Row, Col, Form, Input, Label, Alert, Button, CardText, CardTitle, UncontrolledTooltip } from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'
import SwiperCentered from '../../components/carousel/SwiperCentered';
import '@styles/base/pages/home.scss'
import InputPasswordToggle from '@components/input-password-toggle'
import image from '../../../assets/images/pages/contact.png'
const defaultValues = {
  password: 'admin',
  loginEmail: 'admin@demo.com'
}
function Home() {
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const [books, setBooks] = useState([]);
  const fetchHandler = async () => {
    try {
      const books = await axios.get('/book/someBooks').then((res) => res.data);
      
      setBooks(books)
      return books;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {

    books.length == 0 ?
      fetchHandler()
      : null
  }, [books])
  return (
    <div className="sections">
      <div className="welcome-section">
        <h1>Welcome to our Book Lovers Dashboard!</h1>
        <p>This is a place where book lovers can find and share their favorite books.</p>
      </div>
      <div className="view-books-section">
        <div className="description-section">
          <div className="big-description-section">
            <h2>Welcome <br /> to our Book <span style={{ color: "#f5821f", fontWeight: "bold" }}>Library</span> Dashboard!</h2>
          </div>

          <div className="small-description-section">
            {/* <p>I love Books !</p> */}
          </div>

        </div>
        <div className="slider-section">
          <SwiperCentered className='SwiperCentered' direction='rtl' books={books} />
        </div>
      </div>
      <div className='fourth-section'>
  <iframe
    width='100%'
    height='400'
    src='https://www.youtube.com/embed/N5DG0x0OxYY'
    title='YouTube video player'
    frameBorder='0'
    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
    allowFullScreen
  ></iframe>
</div>

      <div className='Third-section'>
        <div className="contact-us-section">
          <h2>Contact Us</h2>
          <Form className='contact-form mt-2'>
           
            <div className='mb-1'>
              <Label className='form-label' for='contact-email'>
                Email
              </Label>
              <Controller
                id='contactEmail'
                name='contactEmail'
                control={control}
                render={({ field }) => (
                  <Input
                    type='email'
                    placeholder='john@example.com'
                    invalid={errors.contactEmail && true}
                    {...field}
                  />
                )}
              />
            </div>
            <div className='mb-1'>
              <Label className='form-label' for='contact-subject'>
                Subject
              </Label>
              <Controller
                id='contactSubject'
                name='contactSubject'
                control={control}
                render={({ field }) => (
                  <Input
                    type='text'
                    placeholder='Subject'
                    invalid={errors.contactSubject && true}
                    {...field}
                  />
                )}
              />
            </div>
            <div className='mb-1'>
              <Label className='form-label' for='contact-message'>
                Message
              </Label>
              <Controller
                id='contactMessage'
                name='contactMessage'
                control={control}
                render={({ field }) => (
                  <Input
                    type='textarea'
                    placeholder='Your message'
                    invalid={errors.contactMessage && true}
                    {...field}
                  />
                )}
              />
            </div>
            <Button type='submit' color='primary' block>
              Send Message
            </Button>
          </Form>
        </div>
        <div className="image-section">
        <img src={image} alt="description" />
        </div>

      </div>
    </div>
  )
}

export default Home