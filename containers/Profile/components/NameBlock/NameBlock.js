import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import styles from '../../../../style.js'

const NameBlock = (props) => {
  const { name, line2 } = props

  let line2Value = line2
  if (line2 === null || line2 === 'null') {
    line2Value = ''
  } else if (line2.indexOf(' - null') !== -1) {
    line2Value = line2.split(' - null')[0]
  }

  return (
    <View style={styles.profileEntityContent}>
      <Text style={styles.profileEntityPrimaryText}>{name}</Text>
      {line2Value !== '' &&
        <Text>{line2Value}</Text>
      }
    </View>
  )
}

NameBlock.propTypes = {
  name: PropTypes.string.isRequired,
  line2: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
}

export default NameBlock
