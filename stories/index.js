import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import RangeSlider from './RangeSlider/RangeSlider'

const pipsFormatter = (value) => {
  return getCostInWords(value, false, true)
}

// [0, 5000000, 12500000, 23000000, 30000000, 35000000, 45000000, 50000000]

storiesOf('RangeSlider', module)
  .add('Even Distribution', () => {
    return (
      <RangeSlider
        // current={[250, 550]}
        pipsFormatter={pipsFormatter}
        steps={[0, 5000000, 12500000, 23000000, 30000000, 35000000, 45000000, 50000000]}
      />
    )
  })
  .add('Uneven Distribution', () => {
    return (
      <RangeSlider
        current = {[200, 730]}
        steps = {[100, 300, 700, 800, 1000, 1500, 1600]}
      />
    )
  })



















export default function getCostInWords (value, fullName, smallName) {
  var crores, hundreds, lacs, remainig, thousands

  if (value || value === 0) {
    value = Math.round(value)
    crores = Math.floor(value / 10000000)
    remainig = Math.floor(value % 10000000)
    lacs = Math.floor(remainig / 100000) < 10 && crores ? '0' + Math.floor(remainig / 100000) : Math.floor(remainig / 100000)
    remainig = Math.floor(value % 100000)
    thousands = Math.floor(remainig / 1000) < 10 && lacs ? '0' + Math.floor(remainig / 1000) : Math.floor(remainig / 1000)
    remainig = Math.floor(value % 1000)
    hundreds = Math.floor(remainig / 100)

    if (crores) {
      const returnString = fullName ? ' Crore' : ' Cr'

      if (!lacs) {
        return crores + returnString
      } else if (lacs % 10 === 0) {
        lacs = lacs / 10
      }

      return crores + '.' + lacs + returnString
    } else if (lacs) {
      let returnString = (fullName && !smallName) ? ' Lakhs' : ' Lacs'
      if (smallName) {
        returnString = 'L'
      }
      if (!thousands) {
        return lacs + returnString
      } else if (thousands % 10 === 0) {
        thousands = thousands / 10
      }

      return lacs + '.' + thousands + returnString
    } else if (thousands) {
      if (!hundreds) {
        return thousands + ' K'
      }
      return thousands + '.' + hundreds + ' K'
    } else {
      return value
    }
  }
}
