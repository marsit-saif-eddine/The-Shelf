// ** Reactstrap Imports
import { Card, CardBody, Button } from 'reactstrap'

// ** Third Party Components
import toast from 'react-hot-toast'
import { CheckCircle } from 'react-feather'

const ToastSuccess = (title, msg) => {
  return (
    <Card>
      <CardBody>
        <div className='d-flex text-center align-items-center flex-column'>
          <CheckCircle size='32' className='mb-1' />
          <h5 className='mb-1 fw-bolder'>{title  ? title :'Success'}</h5>
          <p className='mb-50'>{msg  ? msg :'Your action has been traited'}</p>
          <Button color='success' onClick={() => toast.success('Successfully toasted!')}>
            Success
          </Button>
        </div>
      </CardBody>
    </Card>
  )
}

export default ToastSuccess
