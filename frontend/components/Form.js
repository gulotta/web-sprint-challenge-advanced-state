import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {

  const {inputChange, postQuiz, form} = props

  const onChange = evt => {
    const {value, id} = evt.target;
    inputChange({...form, [id]: value})
  }

  const onSubmit = evt => {
    evt.preventDefault()
    postQuiz({question_text: form.newQuestion, true_answer_text: form.newTrueAnswer, false_answer_text: form.newFalseAnswer})
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} value= {form.newQuestion} onChange={onChange} id="newQuestion" placeholder="Enter question" />
      <input maxLength={50} value= {form.newTrueAnswer}  onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" />
      <input maxLength={50} value= {form.newFalseAnswer} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" />
      <button id="submitNewQuizBtn" disabled= {
        form.newQuestion.trim('').length < 1 ||
        form.newTrueAnswer.trim('').length < 1 ||
        form.newFalseAnswer.trim('').length < 1 

      }>Submit new quiz</button>
    </form>
  )
}

export default connect(st => st, actionCreators)(Form)
