import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export default class Connect extends React.PureComponent {
  render () {
    const style = {
      left: this.props.start,
      width: this.props.end - this.props.start
    }

    return (
      <div className='connector' style={style} />
    )
  }
}
