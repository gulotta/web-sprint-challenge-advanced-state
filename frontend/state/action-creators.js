// ❗ You don't need to add extra action creators to achieve MVP
import * as actionTypes from './action-types'
import axios from 'axios'

export function moveClockwise(value) {
  return {type: actionTypes.MOVE_CLOCKWISE, payload: value}
 }

export function moveCounterClockwise(value) { 
  return {type: actionTypes.MOVE_COUNTERCLOCKWISE, payload: value}
}

export function selectAnswer(value) { 
  return {type: actionTypes.SET_SELECTED_ANSWER, payload: value}
}

export function setMessage(value) { 
  return {type: actionTypes.SET_INFO_MESSAGE, payload: value}
}

export function setQuiz(value) { 
  return {type: actionTypes.SET_QUIZ_INTO_STATE, payload: value}
}

export function inputChange(value) {
  return {type: actionTypes.INPUT_CHANGE, payload: value}
 }

export function resetForm() {
  return {type: actionTypes.RESET_FORM}
 }

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    const URL="http://localhost:9000/api/quiz/next"
    axios.get(URL)
    .then(res => {
      dispatch(setQuiz(res.data))
    })
    .catch(err => {
      console.error(err)
    })
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  }
}
export function postAnswer(obj) {
  return function (dispatch) {
    const URL="http://localhost:9000/api/quiz/answer"
    axios.post(URL, {
      quiz_id: obj.quiz_id, 
      answer_id: obj.answer_id
    })
    .then(res => {
      dispatch(setQuiz(null))
      dispatch(fetchQuiz())
      dispatch(selectAnswer(null))
      dispatch(setMessage(res.data.message))
    })
    .catch(err => {
      console.error(err)
    })
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz(obj) {
  return function (dispatch) {
    const URL="http://localhost:9000/api/quiz/new"
    axios.post(
      URL,  {
        question_text: obj.question_text,
        true_answer_text: obj.true_answer_text,
        false_answer_text: obj.false_answer_text
      })
      .then(res => {
        dispatch(setMessage(`Congrats: "${res.data.question}" is a great question!`));
        dispatch(resetForm());
      })
      .catch(err => {
        console.error(err);
      })

    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
