import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import _ from 'underscore'
import Job from '../Job'
import styles from '../../../../style.js'

const Jobs = (props) => {
  const jobData = props.jobs

  if (!jobData) {
    return (
      <Text>Loading...</Text>
    )
  } else if (jobData.length == 0) {
    return (
      <View>
        <Text style={styles.entityEmptyText}>Yet to be catalogued</Text>
      </View>
    )
  } else {
    const jobs = []
    _.each(jobData, (job) => {
      jobs.push(<Job key={job.id} job={job} />)
    })

    return (
      <View>
        {jobs}
      </View>
    )
  }
}

Jobs.propTypes = {
  jobs: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ])
}

export default Jobs
