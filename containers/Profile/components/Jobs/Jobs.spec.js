import React from 'react'
import renderer from 'react-test-renderer'
import Jobs from './index'

describe('containers/Profile/components/Jobs', () => {
  describe('when prop.jobs is null', () => {
    it('renders correctly', () => {
      const props = {
        jobs: null
      }

      const tree = renderer.create(
        <Jobs {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when prop.jobs is empty', () => {
    it('renders correctly', () => {
      const props = {
        jobs: []
      }

      const tree = renderer.create(
        <Jobs {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when prop.jobs is not empty', () => {
    it('renders correctly', () => {
      const props = {
        jobs: [
          {
            id: 11,
            company: 'Awesome company',
            start_date: '2016-11-04',
            end_date: '2017-01-24',
            position: 'developer',
            verified: true
          },
          {
            id: 12,
            company: 'Applied Blockchain',
            start_date: '2017-11-04',
            end_date: '2018-01-24',
            position: 'developer',
            verified: true
          }
        ]
      }

      const tree = renderer.create(
        <Jobs {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
