import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import * as actionCreators from '../state/action-creators'

function Quiz(props) {

  const {quiz, fetchQuiz, selectAnswer, postAnswer, selectedAnswer} = props;

  useEffect(() => {
    fetchQuiz();
  }, [])

  const select = (id) => {
    selectAnswer(id)
  }

  const submit = (evt) => {
    evt.preventDefault();
    postAnswer({
      quiz_id: quiz.quiz_id,
      answer_id: selectedAnswer
    });
  };




  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              <div className={ selectedAnswer === quiz.answers[0].answer_id ? "answer selected" : 'answer'}>
                {quiz.answers[0].text}
                <button onClick = {() => {select(quiz.answers[0].answer_id)}}>
                  {selectedAnswer === quiz.answers[0].answer_id ? "SELECTED" : "Select"}
                </button>
              </div>

              <div className={ selectedAnswer === quiz.answers[1].answer_id ? "answer selected" : 'answer'}>
                {quiz.answers[1].text}
                <button onClick = {() => {select(quiz.answers[1].answer_id)}}>
                  {selectedAnswer === quiz.answers[1].answer_id ? "SELECTED" : "Select"}
                </button>
              </div>
           </div>

            <button id="submitAnswerBtn" disabled={!selectedAnswer} onClick={submit}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

export default connect((st) => st, actionCreators)(Quiz)