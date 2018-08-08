import React from 'react'
import renderer from 'react-test-renderer'
import Education from './index'

describe('containers/Profile/components/Education', () => {
  it('renders correctly', () => {
    const props = {
      education: {
        institution: 'Westminter Uni',
        start_date: '2003-09-04',
        end_date: '2004-08-31',
        studied: 'MSc in Computer Science',
        verified: true
      }
    }

    const tree = renderer.create(
      <Education {...props} />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
