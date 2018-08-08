import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, Dimensions } from 'react-native'
import { Progress } from 'nachos-ui'
import _find from 'lodash/find'
import proficiencyOptions from '../../utils/languagesProficiency.js'
import styles from '../../../../style.js'

const AwardProficiency = (props) => {
  const { award, range, type } = props
  let proficiency = parseInt(award.proficiency, 10)
  proficiency = (proficiency > range) ? range : proficiency
  let secondaryLabel = proficiency
  if (type === 'language') {
    secondaryLabel = _find(proficiencyOptions, {value: proficiency}).label
  }
  const { width } = Dimensions.get('window')

  return (
    <View style={styles.profileEntityContainer}>
      <View style={styles.profileEntityContent}>
        <Text style={styles.profileEntityPrimaryText}>
          {award.name}
        </Text>
        <Text style={styles.profileEntitySecondaryText}>
          {secondaryLabel}
        </Text>
        <Progress
          progress={(1 / range) * parseInt(proficiency, 10)}
          width={width * 0.65}
        />
      </View>
    </View>
  )
}

AwardProficiency.defaultProps = {
  range: 5
}

AwardProficiency.propTypes = {
  award: PropTypes.shape({
    name: PropTypes.string,
    proficiency: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired
    ]),
  }).isRequired,
  range: PropTypes.number,
  type: PropTypes.string.isRequired
}

export default AwardProficiency
