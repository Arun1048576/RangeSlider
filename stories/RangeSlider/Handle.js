import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export default class Handle extends React.PureComponent {
  constructor (props) {
    super(props)
    this.isMouseDown = false
    this.needForRAF = true

    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
  }
  componentDidMount () {
    document.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mouseup', this.onMouseUp)
    this.setTransform()
  }
  componentWillReceiveProps () {
    this.setTransform()
  }
  setTransform () {
    const handleLength = this.refs.handle.offsetWidth
    const currentLeft = this.props.start - handleLength / 2
    this.refs.handle.style.transform = `translateX(${currentLeft}px)`    
  }
  onMouseDown () {
    this.isMouseDown = true
  }
  onMouseMove (e) {
    if (this.isMouseDown) {
      const handleLength = this.refs.handle.offsetWidth
      let currentLeft = e.clientX - this.props.left
      if (currentLeft < this.props.limits[0] - handleLength / 2) {
        currentLeft = this.props.limits[0] - handleLength / 2
      } else if (currentLeft > this.props.limits[1] - handleLength / 2) {
        currentLeft = this.props.limits[1] - handleLength / 2
      }
      this.refs.handle.style.transform = `translateX(${currentLeft}px)`
      if (typeof this.props.onPosChange === 'function') {
        this.props.onPosChange(currentLeft + handleLength / 2)
      }
    }
  }
  onMouseUp () {
    if (this.isMouseDown) {
      this.isMouseDown = false
    }
  }
  render () {
    return (
      <div className='handle' onMouseDown={this.onMouseDown} ref='handle' />
    )
  }
}
