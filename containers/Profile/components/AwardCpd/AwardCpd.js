import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import NameDateBlock from '../NameDateBlock'
import VerifiedIcon from '../VerifiedIcon'
import styles from '../../../../style.js'

const AwardCpd = (props) => {
  const {
    award,
    name,
    line2
  } = props

  const dateFrom = new Date(award.date_from)
  const dateTo = new Date(award.date_to)

  return (
    <View style={styles.profileEntityContainer}>
      <VerifiedIcon type="award" entity={award} />
      <NameDateBlock
        name={name}
        line2={line2}
        dateFrom={dateFrom.toLocaleDateString('en-GB')}
        dateTo={dateTo.toLocaleDateString('en-GB')}
      />
    </View>
  )
}

AwardCpd.propTypes = {
  name: PropTypes.string.isRequired,
  line2: PropTypes.string.isRequired,
  award: PropTypes.shape({
    date_from: PropTypes.string,
    date_to: PropTypes.string
  })
}

export default AwardCpd
