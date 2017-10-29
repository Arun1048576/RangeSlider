import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Handle from './Handle'
import Pips from './Pips'
import Connect from './Connect'

import './RangeSlider.scss'

export default class RangeSlider extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      left: 0,
      right: 0,
      width: 0,
      start: 0,
      end: 0
    }
    this.setFirst = this.setFirst.bind(this)
    this.setSecond = this.setSecond.bind(this)
  }

  componentDidMount () {
    const stepRange = [this.props.steps[0], this.props.steps[this.props.steps.length - 1]]
    const [currentLeft, currentRight] = (this.props.current || stepRange)

    const left = this.refs.rangeSlider.offsetLeft
    const width = this.refs.rangeSlider.offsetWidth

    const pixelPerRange =  width / (stepRange[1] - stepRange[0])

    const start = (currentLeft - stepRange[0]) * pixelPerRange
    const end = (currentRight - stepRange[0]) * pixelPerRange

    this.setState({ start, end, left, width, pixelPerRange })
  }

  setFirst (start) {
    this.setState({ start })
  }

  setSecond (end) {
    this.setState({ end })
  }

  render () {
    return (
      <div className='range-slider-container' ref='rangeSlider'>
        <Pips 
          {...this.state}
          steps={this.props.steps}
          pipsFormatter={this.props.pipsFormatter}
        />
        <Connect 
          {...this.state} 
        />
        <Handle 
          {...this.state}
          onPosChange={this.setFirst}
          start={this.state.start}
          limits={[0, this.state.end]} 
        />
        <Handle
          {...this.state}
          onPosChange={this.setSecond}
          start={this.state.end}
          limits={[this.state.start, this.state.width]} 
        />
      </div>
    )
  }
}
