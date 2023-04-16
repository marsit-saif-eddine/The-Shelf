export const initialState={
questions:[{
    questionText:"question",
    questionType:"radio",
    options:[
    
           
                    {optionText:""},
                    {optionText:""}
                
            ],
            
            answer:false,
            answerkey:"",
            points:0,
            open:true,
            required: false}],
      quizName:"quiz name",
      quizdesc:"quizdesc",
      book_id:"",
      user_id:""
}



export const actionTypes={
    SET_QUESTIONS:"setques",
    CHANGE_Type:"",
    SET_Quiz_Name:"",
    SET_QUIZ_Desc:""
}


const reducer =(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.SET_QUESTIONS:
            return{
                ...state,questions:action.questions,
            };
            case actionTypes.CHANGE_Type:
                return{
                    ...state,questionType:action.questionType,
                };
                case actionTypes.SET_Quiz_Name:
                    return{
                        ...state, quizName:action.quizName
                    };
            case actionTypes.SET_QUIZ_Desc:
                        return{
                            ...state,quizdesc:action.quizdesc
                        };    
                        default:
                            return state;
    }
    
}