import Quiz from './quizCreate'
import QuizDisplay from './quizDisplay'
import "./quiz.css"
import { Container } from  'reactstrap'
import '@styles/react/apps/app-users.scss'

const quiz = () => {
  return (
    <div className='app-client-quiz'>
<Quiz/>
<QuizDisplay/>

     </div>
     )
   }
   
   export default quiz
   