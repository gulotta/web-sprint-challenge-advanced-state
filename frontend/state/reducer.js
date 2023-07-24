// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'
import {MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER, SET_INFO_MESSAGE, SET_SUCCESS_MESSAGE, CHANGE_QUESTION, CHANGE_FALSE, CHANGE_TRUE} from "./action-types"

const initialWheelState = 0
function wheel(state = initialWheelState, action) {
  switch(action.type){
    case(MOVE_CLOCKWISE):{
      if (state===5) {
        return state - 5
      }
      return state + 1
    } 
    case(MOVE_COUNTERCLOCKWISE):{
      if(state===0) {
        return state + 5
      }
      return state - 1
    }
  }
  return state
}

const initialQuizState = null
function quiz(state = initialQuizState, action) {
  switch(action.type){
    case(SET_QUIZ_INTO_STATE): {
      const newQuiz = {
        question: action.payload.question,
        answers: action.payload.answers,
        quiz_id: action.payload.quiz_id,
        answer_ids: [action.payload.answers[0].answer_id, action.payload.answers[1].answer_id]
      }
      return {
        ...state,
        quiz: newQuiz
      }
    }
  }
  return state
}

const initialSelectedAnswerState = null
function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch(action.type){
    case(SET_SELECTED_ANSWER): {
      const selectedAnswer = {
        quiz_id: action.payload.quiz_id,
        answer_id: action.payload.answer_id
      }
      return selectedAnswer;
    }
  }
  return state
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  switch(action.type){
    case(SET_INFO_MESSAGE): {
      const newMessage = `${action.payload}`;
      return newMessage
    }
    case(SET_SELECTED_ANSWER): {
      const defaultMessage = '';
      return defaultMessage;
    }
  }
  return state
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  switch(action.type){
    case(CHANGE_QUESTION):{
      return {
        ...state,
        newQuestion: action.payload,
      }
    }
    case(CHANGE_TRUE):{
      return {
        ...state,
        newTrueAnswer: action.payload
      }
    }
    case(CHANGE_FALSE):{
      return {
        ...state,
        newFalseAnswer: action.payload
      }
    }
    case(SET_SUCCESS_MESSAGE): {
      return {
        ...state,
        newQuestion: '',
        newTrueAnswer: '',
        newFalseAnswer: '',
        successMessage: `Congrats: "${action.payload}" is a great question!`
      }
    }
  }
  return state
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
