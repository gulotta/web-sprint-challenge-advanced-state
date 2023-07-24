import React from 'react'
import { connect } from 'react-redux'
import {changeQuestion, changeTrue, changeFalse, postQuiz} from '../state/action-creators'

export function Form(props) {
  const {newQuestion, newTrueAnswer, newFalseAnswer, changeQuestion, changeTrue, changeFalse, postQuiz} = props

  const onChangeQuestion = evt => {
    evt.preventDefault();
    changeQuestion(evt.target.value);
  }

  const onChangeTrue = evt => {
    evt.preventDefault();
    changeTrue(evt.target.value)
  }

  const onChangeFalse = evt => {
    evt.preventDefault();
    changeFalse(evt.target.value)
  }

  const onSubmit = evt => {
    evt.preventDefault();
    // const newQuestion = props.form.newQuestion
    // const newTrueAnswer = props.form.newTrueAnswer
    // const newFalseAnswer = props.form.newFalseAnswer
    props.postQuiz(props.form.newQuestion, props.form.newTrueAnswer, props.form.newFalseAnswer)
    // postQuiz({question_text: newQuestion, true_answer_text: newTrueAnswer, false_answer_text: newFalseAnswer});

  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChangeQuestion} id="newQuestion" placeholder="Enter question" value={props.form.newQuestion} />
      <input maxLength={50} onChange={onChangeTrue} id="newTrueAnswer" placeholder="Enter true answer" value={props.form.newTrueAnswer} />
      <input maxLength={50} onChange={onChangeFalse} id="newFalseAnswer" placeholder="Enter false answer" value={props.form.newFalseAnswer} />
      <button id="submitNewQuizBtn" disabled={newQuestion.trim().length > 0 && newTrueAnswer.trim().length > 0 && newFalseAnswer.trim().length > 0 ? false : true} >Submit new quiz</button>
    </form>
  )
}

const mapStateToProps = (state) => {
  
  if(state.form !== '') {
    console.log(state.form)
    if(state.form !== "") {
    return {
      ...state,
      newQuestion: state.form.newQuestion,
      newTrueAnswer: state.form.newTrueAnswer,
      newFalseAnswer: state.form.newFalseAnswer,
      successMessage: state.form.successMessage,
      infoMessage: state.infoMessage.infoMessage
    }
  }
  return state
}
}
export default connect(mapStateToProps, {changeQuestion, changeTrue, changeFalse, postQuiz})(Form)
