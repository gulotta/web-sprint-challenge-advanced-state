import React from 'react'
import {connect} from 'react-redux'


const Message = (props) => {
  const {infoMessage, successMessage} = props

  return <div id='message'>{successMessage}</div>,
         <div id='message'>{infoMessage}</div>

}

const mapStateToProps = (state) => {
  return {
    ...state,
    successMessage: state.successMessage,
    infoMessage: state.infoMessage
    
  }
}

export default connect(mapStateToProps)(Message)