import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import styles from '../../../../style.js'

const NameDateBlock = (props) => {
  const {name, line2, dateFrom, dateTo} = props

  return (
    <View style={styles.profileEntityContent}>
      <Text style={styles.profileEntityPrimaryText}>{name}</Text>
      <Text>{line2}</Text>
      <Text>{dateFrom} - {dateTo}</Text>
    </View>
  )
}

NameDateBlock.propTypes = {
  name: PropTypes.string.isRequired,
  line2: PropTypes.string.isRequired,
  dateFrom: PropTypes.string.isRequired,
  dateTo: PropTypes.string.isRequired
}

export default NameDateBlock
