import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import VerifiedIcon from '../VerifiedIcon'
import { getDates } from '../../utils/date.js'
import styles from '../../../../style.js'

const Education = (props) => {
  const { education } = props
  var dates = getDates(education.start_date, education.end_date)
  const textStyle = date => date === 'Present' ?
    [styles.profileEntityDate, styles.profilePresentText] :
    styles.profileEntityDate

  return (
    <View style={styles.profileEntityContainer}>
      <VerifiedIcon type="education" entity={education} />
      <View style={styles.profileEntityContent}>
        <Text style={styles.profileEntityPrimaryText}>{education.studied}</Text>
        <Text>{education.institution}</Text>
      </View>
      <View style={styles.profileEntityRight}>
        <Text style={textStyle(dates.start_date)}>{ dates.start_date }</Text>
        <Text style={textStyle(dates.end_date)}>- { dates.end_date }</Text>
      </View>
    </View>
  )
}

Education.propTypes = {
  education: PropTypes.shape({
    start_date: PropTypes.string.isRequired,
    end_date: PropTypes.string.isRequired,
    institution: PropTypes.string.isRequired,
    studied: PropTypes.string.isRequired
  })
}

export default Education
