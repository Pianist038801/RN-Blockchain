import { connect } from 'react-redux'
import Component from './SettingsIcon.js'

export const mapState = (state) => ({
  profile: state.profile
})

export default connect(mapState, {})(Component)
