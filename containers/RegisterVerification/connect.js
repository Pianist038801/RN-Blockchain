import { connect } from 'react-redux'
import Component from './RegisterVerification.js'

export const mapState = (state) => ({
  loading: state.loading
})

export default connect(mapState, {})(Component)
