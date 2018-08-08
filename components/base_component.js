import React, { Component } from 'react'

class BaseComp extends Component {
  static contextTypes = { store: React.PropTypes.object, actionSheet: React.PropTypes.func, }
}

export default BaseComp

