import React from 'react'
import renderer from 'react-test-renderer'
import DateBlock from './index'

describe('containers/Profile/components/DateBlock', () => {
  it('renders correctly', () => {
    const props = {
      date: '2017-11-04'
    }

    const tree = renderer.create(
      <DateBlock {...props} />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
