import React from 'react'
import renderer from 'react-test-renderer'
import Educations from './index'

describe('containers/Profile/components/Educations', () => {
  describe('when prop.educations is null', () => {
    it('renders correctly', () => {
      const props = {
        educations: null
      }

      const tree = renderer.create(
        <Educations {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when prop.educations is empty', () => {
    it('renders correctly', () => {
      const props = {
        educations: []
      }

      const tree = renderer.create(
        <Educations {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when prop.educations is not empty', () => {
    it('renders correctly', () => {
      const props = {
        educations: [
          {
            id: 11,
            institution: 'Awesome Uni',
            start_date: '2016-11-04',
            end_date: '2017-01-24',
            studied: 'BSc in something',
            verified: true
          },
          {
            id: 12,
            institution: 'Westminster Uni',
            start_date: '2017-11-04',
            end_date: '2018-01-24',
            studied: 'MSc in something',
            verified: true
          }
        ]
      }

      const tree = renderer.create(
        <Educations {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
