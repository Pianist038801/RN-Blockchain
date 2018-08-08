import React from 'react'
import PropTypes from 'prop-types'
import { Image, TouchableOpacity } from 'react-native'
import ActionSheet from 'react-native-actionsheet-native'
import BaseComp from '../../../../components/base_component.js'
import Assets from './assets'
import style from './style'

class VerifiedIcon extends BaseComp {
  verifyContext = () => {
    const BUTTONS = [
      'Request verification',
      'Cancel'
    ]

    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
    }, (idx) => {
      if (idx === 0) {
        const { entity, type } = this.props
        let searchField;
        switch (type) {
          case 'job':
            searchField = entity.company
            break;
          case 'education':
            searchField = entity.institution
            break;
          case 'award':
            searchField = entity.organisation
            break;
        }

        this.context.store.dispatch({
          type: 'START_VERIFICATION_REQUEST',
          payload: {
            searchField,
            type,
            id: entity.id
          }
        })
      }
    })
  }

  getEntityStatus(entity) {
    if (!entity.pending_verification && !entity.verified) {
      return 0
    }

    if (entity.verified) {
      return 2
    }

    if (entity.pending_verification && !entity.verified) {
      return 1
    }

    return 0
  }

  render() {
    const entity = this.props.entity
    const status = this.getEntityStatus(entity)
    let source
    let requestable = false

    switch (status) {
      case 1:
        source = Assets.logoYellow
        break
      case 2:
        source = Assets.logoGreen
        break
      default:
        requestable = true
        source = Assets.logoGrey
    }

    const image = (
      <Image
        style={style.profileEntityVerification}
        source={source}
      />
    )

    if (requestable) {
      return (
        <TouchableOpacity
          onPress={this.verifyContext}
        >
          {image}
        </TouchableOpacity>
      )
    }

    return image
  }
}

VerifiedIcon.propTypes = {
  type: PropTypes.string,
  entity: PropTypes.shape({
    pending_verification: PropTypes.bool,
    verified: PropTypes.bool
  })
}

export default VerifiedIcon
