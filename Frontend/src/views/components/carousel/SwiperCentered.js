// ** MUI Imports
import Box from '@mui/material/Box'
import '@styles/base/pages/home.scss'
import { Link, useNavigate } from 'react-router-dom'
import { AlertCircle , X } from 'react-feather'
import toast from 'react-hot-toast'
import { isUserLoggedIn } from '@utils'
import Avatar from '@components/avatar'

// ** Third Party Components
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

const SwiperCentered = ({ direction, books }) => {

  const ToastContent = () => {
    return (
      <div className='d-flex'>
        <div className='me-1'>
          <Avatar size='sm' color='danger' icon={<AlertCircle size={12} />} />
        </div>
        <div className='d-flex flex-column'>
          <div className='d-flex justify-content-between'>
            <X
              size={12}
              className='cursor-pointer'
              onClick={() => toast.dismiss()}
            />
          </div>
          <span>You need to authenticate to explore TheShelf !</span>
        </div>
      </div>
    )
  }

  const [ref] = useKeenSlider({
    rtl: direction === 'rtl',
    slides: {
      perView: 4,
      spacing: 24,
      center: true // changed from 'origin: center'
    }
  })

  // Add a check for the books array
  if (!books.length) return null

  return (
    <Box ref={ref} className='keen-slider'>
      {books.map((book, index) => (
        // Add a key attribute to the img tag
        <Box key={index} className='keen-slider__slide'>
          <Link to={`/bookdetail/${book._id}`} className='card_link'>
            {isUserLoggedIn() !== null ? (
              <img src={book.image} alt={book.title} />
            ) : (
              <div
                onClick={() => {
                  toast(t => <ToastContent />)
                }}
              >
                <img src={book.image} alt={book.title} />
              </div>
            )}
          </Link>
        </Box>
      ))}
    </Box>
  )
}

export default SwiperCentered
