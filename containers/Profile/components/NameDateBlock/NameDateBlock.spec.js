import React from 'react'
import renderer from 'react-test-renderer'
import NameDateBlock from './index'

describe('containers/Profile/components/NameDateBlock', () => {
  it('renders correctly', () => {
    const props = {
      name: 'hello',
      line2: 'Lorem ipsum',
      dateFrom: '2017-11-04',
      dateTo: '2018-01-24'
    }

    const tree = renderer.create(
      <NameDateBlock {...props} />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
