import * as actionTypes from "./action-types"
import axios from 'axios';

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() { 
  return ({type: actionTypes.MOVE_CLOCKWISE})
}

export function moveCounterClockwise() { 
  return ({type: actionTypes.MOVE_COUNTERCLOCKWISE})
}

export function selectAnswer(obj) { 
  return ({type: actionTypes.SET_SELECTED_ANSWER, payload: obj})
}

export function setMessage() {
  return ({type: actionTypes.SET_INFO_MESSAGE})
 }

export function setQuiz() { }

export function changeTrue(text) {
  return ({type: actionTypes.CHANGE_TRUE, payload: text})
 }

 export function changeFalse(text) {
  return ({type: actionTypes.CHANGE_FALSE, payload: text})
 }

export function changeQuestion(text) {
  return ({type: actionTypes.CHANGE_QUESTION, payload: text})
}

export function resetForm() {
  return { type: actionTypes.RESET_FORM}
 }

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    axios.get('http://localhost:9000/api/quiz/next')
    .then(res => {
      dispatch({type: actionTypes.SET_QUIZ_INTO_STATE, payload: res.data})
    })
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  }
}
export function postAnswer(obj) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/answer', obj)
    .then(res => {
      dispatch({type: actionTypes.SET_INFO_MESSAGE, payload: res.data.message})
      dispatch(fetchQuiz());
      console.log(res.data)
    })
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz(obj) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/new', obj)
    .then(res => {
      dispatch({type: actionTypes.SET_SUCCESS_MESSAGE, payload: obj.question_text})
      console.log(res)
    })
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
