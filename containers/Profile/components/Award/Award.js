import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import VerifiedIcon from '../VerifiedIcon'
import NameBlock from '../NameBlock'
import DateBlock from '../DateBlock'
import styles from '../../../../style.js'

const Award = (props) => {
  const {
    name,
    line2,
    date,
    award
  } = props

  return (
    <View style={styles.profileEntityContainer}>
      <VerifiedIcon type="award" entity={award} />
      <NameBlock name={name} line2={line2} />
      <DateBlock date={date} />
    </View>
  )
}

Award.propTypes = {
  name: PropTypes.string.isRequired,
  line2: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  award: PropTypes.shape({
    pending_verification: PropTypes.bool,
    verified: PropTypes.bool
  }),
  date: PropTypes.string.isRequired
}

export default Award
