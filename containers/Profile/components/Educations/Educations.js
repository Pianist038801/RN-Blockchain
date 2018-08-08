import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import _ from 'underscore'
import Education from '../Education'
import styles from '../../../../style.js'

const Educations = (props) => {
  const educationData = props.educations

  if (!educationData) {
    return (
      <Text>Loading...</Text>
    )
  }

  if (educationData.length == 0) {
    return (
      <View>
        <Text style={styles.entityEmptyText}></Text>
      </View>
    )
  }

  const educations = []
  _.each(educationData, (education) => {
    educations.push(<Education key={education.id} education={education} />)
  })

  return (
    <View>
      {educations}
    </View>
  )
}

Educations.propTypes = {
  educations: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ])
}

export default Educations
