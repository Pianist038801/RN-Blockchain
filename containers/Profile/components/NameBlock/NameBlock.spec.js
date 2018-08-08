import React from 'react'
import renderer from 'react-test-renderer'
import NameBlock from './index'

describe('containers/Profile/components/NameBlock', () => {
  describe('when props are good', () => {
    it('renders correctly', () => {
      const props = {
        name: 'hello',
        line2: 'lorem ipsum'
      }

      const tree = renderer.create(
        <NameBlock {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when props.line2 is null', () => {
    it('renders correctly', () => {
      const props = {
        name: 'hello',
        line2: null
      }

      const tree = renderer.create(
        <NameBlock {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when props.line2 is "null"', () => {
    it('renders correctly', () => {
      const props = {
        name: 'hello',
        line2: 'null'
      }

      const tree = renderer.create(
        <NameBlock {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when props.line2 contains "null"', () => {
    it('renders correctly', () => {
      const props = {
        name: 'hello',
        line2: 'Applied Blockchain - null'
      }

      const tree = renderer.create(
        <NameBlock {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
