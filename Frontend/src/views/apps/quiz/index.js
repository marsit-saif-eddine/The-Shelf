import QuizCreate from './quizCreate'
import QuizDisplay from './quizDisplay'
import "./quiz.css"
import { Container } from  'reactstrap'
import '@styles/react/apps/app-users.scss'
// import { Provider } from 'react-redux'

const quiz = () => {
  return (
    <div className='app-client-quiz'>
<QuizCreate/>
<QuizDisplay/>

     </div>
     )
   }
   
   export default quiz
   