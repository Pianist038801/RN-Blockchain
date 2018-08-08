import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import styles from '../../../../style.js'

const DateBlock = (props) => {
  let { date } = props
  date = new Date(date)

  return (
    <View style={styles.profileEntityRight}>
      <Text style={styles.profileEntityDate}>{date.getFullYear()}</Text>
    </View>
  )
}

DateBlock.propTypes = {
  date: PropTypes.string.isRequired
}

export default DateBlock
