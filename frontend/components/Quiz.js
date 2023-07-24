import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux';
import { fetchQuiz, selectAnswer, postAnswer, setMessage} from '../state/action-creators'

const Quiz = (props) => {
  const {quiz, selectedAnswer, fetchQuiz, selectAnswer, postAnswer} = props;

  useEffect(() => {
    if (quiz === null){
    fetchQuiz();
  }
}, [])

const [selectedButton, setSelectedButton] = useState('c')

const handleSubmit = () => {
  postAnswer(selectedAnswer);
  
  setSelectedButton('c')
}

const handleChoiceA = () => {
  selectAnswer({quiz_id: `${quiz.quiz.quiz_id}`, answer_id: `${quiz.quiz.answer_ids[0]}`});
  setSelectedButton('a')
}

const handleChoiceB = () => {
  selectAnswer({quiz_id: `${quiz.quiz.quiz_id}`, answer_id: `${quiz.quiz.answer_ids[1]}`})
  setSelectedButton('b')

}

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz !== null ? (
          <>
            <h2>{quiz.quiz.question}</h2>

            <div id="quizAnswers">
              <div onClick={handleChoiceA} className={selectedButton !== 'a' ? 'answer' : 'answer selected'}>
                {quiz.quiz.answers[0].text}
                <button>
                  {selectedButton !== 'a' ? 'Select' : 'SELECTED'}
                </button>
              </div>

              <div onClick={handleChoiceB} className={selectedButton !== 'b' ? 'answer' : 'answer selected'}>
                {quiz.quiz.answers[1].text}
                <button>
                  {selectedButton !== 'b' ? 'Select' : 'SELECTED'}
                </button>
              </div>
              
            </div>

            <button id="submitAnswerBtn" disabled={selectedButton === 'a' || selectedButton === 'b' ? false: true} onClick={handleSubmit}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    ...state,
    quiz: state.quiz,
    selectedAnswer: state.selectedAnswer
  }
}

export default connect(mapStateToProps, {fetchQuiz, selectAnswer, postAnswer, setMessage})(Quiz);