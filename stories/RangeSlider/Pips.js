import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export default class Pips extends React.PureComponent {
  render () {
    const totalStepLength = this.props.steps[this.props.steps.length - 1] - this.props.steps[0]
    const singleStepLength = this.props.width / totalStepLength

    let currentLeft = 0
    const pipsContent = this.props.steps.map((step, i) => {
      if (i !== 0) {
        const stepDiff = this.props.steps[i] - this.props.steps[i - 1]
        currentLeft += stepDiff * singleStepLength
      }
      const text = typeof this.props.pipsFormatter === 'function' ? this.props.pipsFormatter(step) : step
      return (
        <div className='pip' style={{left: currentLeft}}>
          <div className='pip-content'>
            <div className='pip-marker' />
            <div className='pip-text'>{text}</div>
          </div>
        </div>
      )
    })
    return (
      <div className='pip-container'>
        {pipsContent}
      </div>
    )
  }
}
