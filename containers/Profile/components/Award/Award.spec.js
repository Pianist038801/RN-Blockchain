import React from 'react'
import renderer from 'react-test-renderer'
import Award from './index'

describe('containers/Profile/components/Award', () => {
  it('renders correctly', () => {
    const props = {
      award: {
        verified: true
      },
      name: 'hello',
      line2: 'Lorem ipsum',
      date: '2017-11-04'
    }

    const tree = renderer.create(
      <Award {...props} />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
