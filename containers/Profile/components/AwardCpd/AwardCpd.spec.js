import React from 'react'
import renderer from 'react-test-renderer'
import AwardCpd from './index'

describe('containers/Profile/components/AwardCpd', () => {
  it('renders correctly', () => {
    const props = {
      name: 'hello',
      line2: 'Lorem ipsum',
      award: {
        date_from: '2017-11-04',
        date_to: '2018-01-24'
      }
    }

    const tree = renderer.create(
      <AwardCpd {...props} />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
