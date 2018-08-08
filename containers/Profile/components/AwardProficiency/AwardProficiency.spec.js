import React from 'react'
import renderer from 'react-test-renderer'
import AwardProficiency from './index'

describe('containers/Profile/components/AwardProficiency', () => {
  describe('when range use defaultProps value', () => {
    it('renders correctly', () => {
      const props = {
        award: {
          name: 'Skill1',
          proficiency: 3
        },
        type: 'skill'
      }

      const tree = renderer.create(
        <AwardProficiency {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when props.range = 11', () => {
    it('renders correctly', () => {
      const props = {
        award: {
          name: 'English',
          proficiency: 6,
        },
        type: 'language',
        range: 11
      }

      const tree = renderer.create(
        <AwardProficiency {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
