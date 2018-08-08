import React from 'react'
import renderer from 'react-test-renderer'
import Job from './index'

describe('containers/Profile/components/Job', () => {
  it('renders correctly', () => {
    const props = {
      job: {
        company: 'Applied Blockchain',
        start_date: '2017-11-04',
        end_date: '2018-01-24',
        position: 'developer',
        verified: true
      }
    }

    const tree = renderer.create(
      <Job {...props} />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
