import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import VerifiedIcon from '../VerifiedIcon'
import { getDates } from '../../utils/date.js'
import styles from '../../../../style.js'

const Job = (props) => {
  const { job } = props
  const dates = getDates(job.start_date, job.end_date)
  const textStyle = date => date === 'Present' ?
    [styles.profileEntityDate, styles.profilePresentText] :
    styles.profileEntityDate

  return (
    <View style={styles.profileEntityContainer}>
      <VerifiedIcon type="job" entity={job} />
      <View style={styles.profileEntityContent}>
        <Text style={styles.profileEntityPrimaryText}>{job.position}</Text>
        <Text>{job.company}</Text>
      </View>
      <View style={styles.profileEntityRight}>
        <Text style={textStyle(dates.start_date)}>{ dates.start_date }</Text>
        <Text style={textStyle(dates.end_date)}>- { dates.end_date }</Text>
      </View>
    </View>
  )
}

Job.propTypes = {
  job: PropTypes.shape({
    start_date: PropTypes.string.isRequired,
    end_date: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired
  })
}

export default Job
