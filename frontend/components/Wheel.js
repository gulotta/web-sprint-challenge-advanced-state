import React from 'react'
import {connect} from 'react-redux'
import {moveClockwise, moveCounterClockwise} from '../state/action-creators'




const Wheel = (props) => {

  const {wheel, moveClockwise, moveCounterClockwise} = props;

  const cogs = [0, 1, 2, 3, 4, 5];

  const handleClockwise = () => {
    props.moveClockwise(wheel)
  }

  const handleCounterClockwise = () => {
    props.moveCounterClockwise(wheel)
  }


  return (
    <div id="wrapper">
      <div id="wheel">
        {cogs.map((val, idx) => {
          if (val === wheel) {
            return (<div value={val} key={idx} className='cog active' style={{ '--i': val }}>B</div>)
          } else {
            return (<div value = {val} key={idx} className='cog' style={{'--i': val}} ></div>)
          }
        })}

        {/* <div className="cog active" style={{ "--i": 0 }}>B</div>
        <div className="cog " style={{ "--i": 1 }}></div>
        <div className="cog " style={{ "--i": 2 }}></div>
        <div className="cog " style={{ "--i": 3 }}></div>
        <div className="cog " style={{ "--i": 4 }}></div>
        <div className="cog " style={{ "--i": 5 }}></div>--i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button onClick={handleCounterClockwise} id="counterClockwiseBtn" >Counter clockwise</button>
        <button onClick={handleClockwise} id="clockwiseBtn">Clockwise</button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    wheel: state.wheel
  }
}

export default connect(mapStateToProps, {moveClockwise, moveCounterClockwise})(Wheel);